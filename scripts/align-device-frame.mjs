#!/usr/bin/env node

// Note for later Vercel Blob integration:
// This script can generate lightweight linked SVGs anywhere, but its WebP export
// path uses a local Google Chrome binary. For Vercel/serverless upload flows,
// move the composition logic into a shared function and use `sharp` to render
// the final WebP before uploading it to Vercel Blob.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { execFile } from "node:child_process";
import { dirname, extname, relative, resolve, sep } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const PRESETS = {
  laptop: {
    x: 82.5,
    y: 55.5,
    width: 683,
    height: 449,
    radius: 4,
  },
  phone: {
    x: 108.5,
    y: 223.5,
    width: 223,
    height: 485,
    radius: 18,
  },
};

const MIME_BY_EXT = new Map([
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
]);

function usage() {
  console.log(`Usage:
  node scripts/align-device-frame.mjs --frame <frame.svg> --image <image> --out <output.svg> [options]

Options:
  --device <laptop|phone>    Preset screen geometry. Default: laptop
  --x <number>               Screen x coordinate in frame SVG units
  --y <number>               Screen y coordinate in frame SVG units
  --width <number>           Screen width in frame SVG units
  --height <number>          Screen height in frame SVG units
  --radius <number>          Clip radius in frame SVG units
  --fit <cover|contain>      Image fit inside screen. Default: cover
  --embed <true|false>       Embed images as base64. Default: false
  --quality <0-1>            WebP quality when --out ends in .webp. Default: 0.82
  --scale <number>           WebP render scale. Default: 2

Examples:
  node scripts/align-device-frame.mjs \\
    --frame public/images/laptop.svg \\
    --image public/placeholders/josh-desktop.svg \\
    --out public/placeholders/josh-laptop-aligned.svg

  node scripts/align-device-frame.mjs \\
    --device phone \\
    --frame public/images/phone.svg \\
    --image public/placeholders/josh-phone.svg \\
    --out public/placeholders/josh-phone-aligned.svg

  node scripts/align-device-frame.mjs \\
    --frame public/images/laptop.svg \\
    --image public/placeholders/josh-desktop.svg \\
    --out public/placeholders/josh-laptop-aligned.webp`);
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[index + 1];

    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    index += 1;
  }

  return args;
}

function parseNumber(value, fallback, label) {
  if (value === undefined) {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`Expected --${label} to be a number, got: ${value}`);
  }

  return parsed;
}

function getMimeType(filePath) {
  const extension = extname(filePath).toLowerCase();
  const mimeType = MIME_BY_EXT.get(extension);

  if (!mimeType) {
    throw new Error(`Unsupported image extension: ${extension}`);
  }

  return mimeType;
}

function extractSvgBox(svg, filePath) {
  const svgTag = svg.match(/<svg\b[^>]*>/i)?.[0];

  if (!svgTag) {
    throw new Error(`Could not find <svg> tag in ${filePath}`);
  }

  const viewBoxMatch = svgTag.match(/\bviewBox=["']([^"']+)["']/i);

  if (viewBoxMatch) {
    const parts = viewBoxMatch[1].trim().split(/\s+/).map(Number);

    if (parts.length === 4 && parts.every(Number.isFinite)) {
      return {
        minX: parts[0],
        minY: parts[1],
        width: parts[2],
        height: parts[3],
      };
    }
  }

  const width = Number(svgTag.match(/\bwidth=["']([\d.]+)/i)?.[1]);
  const height = Number(svgTag.match(/\bheight=["']([\d.]+)/i)?.[1]);

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`Could not read width/height or viewBox from ${filePath}`);
  }

  return {
    minX: 0,
    minY: 0,
    width,
    height,
  };
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function composeSvg({ frameBox, screen, imageHref, frameHref, clipId, preserveAspectRatio }) {
  return `<svg width="${frameBox.width}" height="${frameBox.height}" viewBox="${frameBox.minX} ${frameBox.minY} ${frameBox.width} ${frameBox.height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="${clipId}">
      <rect x="${screen.x}" y="${screen.y}" width="${screen.width}" height="${screen.height}" rx="${screen.radius}" />
    </clipPath>
  </defs>
  <rect x="${screen.x}" y="${screen.y}" width="${screen.width}" height="${screen.height}" rx="${screen.radius}" fill="#050914" />
  <image href="${escapeXml(imageHref)}" x="${screen.x}" y="${screen.y}" width="${screen.width}" height="${screen.height}" preserveAspectRatio="${preserveAspectRatio}" clip-path="url(#${clipId})" />
  <image href="${escapeXml(frameHref)}" x="${frameBox.minX}" y="${frameBox.minY}" width="${frameBox.width}" height="${frameBox.height}" preserveAspectRatio="none" />
</svg>
`;
}

async function renderSvgToWebp({ svg, width, height, quality, scale }) {
  const html = `<!doctype html>
<meta charset="utf-8" />
<body>
<script>
const svg = ${JSON.stringify(svg)};
const width = ${JSON.stringify(width)};
const height = ${JSON.stringify(height)};
const scale = ${JSON.stringify(scale)};
const quality = ${JSON.stringify(quality)};
const image = new Image();
image.onload = () => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  document.body.textContent = canvas.toDataURL("image/webp", quality);
};
image.onerror = () => {
  document.body.textContent = "ERROR: failed to render SVG";
};
image.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)));
</script>
</body>`;
  const htmlPath = resolve(tmpdir(), `align-device-frame-${process.pid}.html`);

  await writeFile(htmlPath, html, "utf8");

  const { stdout } = await execFileAsync(
    "google-chrome",
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--virtual-time-budget=5000",
      "--dump-dom",
      `file://${htmlPath}`,
    ],
    {
      maxBuffer: 50 * 1024 * 1024,
    },
  );

  const match = stdout.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);

  if (!match) {
    throw new Error("Chrome did not return a WebP data URL");
  }

  return Buffer.from(match[1], "base64");
}

async function toDataUrl(filePath) {
  const absolutePath = resolve(filePath);
  const bytes = await readFile(absolutePath);
  const mimeType = getMimeType(absolutePath);

  return `data:${mimeType};base64,${bytes.toString("base64")}`;
}

function toSvgHref(fromFilePath, targetFilePath) {
  const fromDir = dirname(resolve(fromFilePath));
  const target = resolve(targetFilePath);
  const href = relative(fromDir, target).split(sep).join("/");

  return href.startsWith(".") ? href : `./${href}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    usage();
    return;
  }

  if (!args.frame || !args.image || !args.out) {
    usage();
    throw new Error("Missing required --frame, --image, or --out argument");
  }

  const device = args.device ?? "laptop";
  const preset = PRESETS[device];

  if (!preset) {
    throw new Error(`Unknown --device "${device}". Use laptop or phone.`);
  }

  const fit = args.fit ?? "cover";

  if (fit !== "cover" && fit !== "contain") {
    throw new Error(`Expected --fit to be cover or contain, got: ${fit}`);
  }

  const screen = {
    x: parseNumber(args.x, preset.x, "x"),
    y: parseNumber(args.y, preset.y, "y"),
    width: parseNumber(args.width, preset.width, "width"),
    height: parseNumber(args.height, preset.height, "height"),
    radius: parseNumber(args.radius, preset.radius, "radius"),
  };

  const frameSvg = await readFile(resolve(args.frame), "utf8");
  const frameBox = extractSvgBox(frameSvg, args.frame);
  const outputFormat = (args.format ?? (extname(args.out).slice(1) || "svg")).toLowerCase();
  const embed = args.embed === "true" || outputFormat === "webp";
  const frameHref = embed ? await toDataUrl(args.frame) : toSvgHref(args.out, args.frame);
  const imageHref = embed ? await toDataUrl(args.image) : toSvgHref(args.out, args.image);
  const clipId = `${device}-screen-clip`;
  const preserveAspectRatio = fit === "cover" ? "xMidYMid slice" : "xMidYMid meet";
  const quality = parseNumber(args.quality, 0.82, "quality");
  const scale = parseNumber(args.scale, 2, "scale");

  const output = composeSvg({
    frameBox,
    screen,
    imageHref,
    frameHref,
    clipId,
    preserveAspectRatio,
  });

  const outPath = resolve(args.out);
  await mkdir(dirname(outPath), { recursive: true });

  if (outputFormat === "webp") {
    const webp = await renderSvgToWebp({
      svg: output,
      width: frameBox.width,
      height: frameBox.height,
      quality,
      scale,
    });

    await writeFile(outPath, webp);
  } else if (outputFormat === "svg") {
    await writeFile(outPath, output, "utf8");
  } else {
    throw new Error(`Unsupported output format: ${outputFormat}`);
  }

  console.log(`Wrote ${outPath}`);
  console.log(
    `Screen: x=${screen.x}, y=${screen.y}, width=${screen.width}, height=${screen.height}, radius=${screen.radius}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
