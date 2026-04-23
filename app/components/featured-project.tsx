"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import Button from "./ui/button";

const projectButtonVariants = {
  rest: {
    opacity: 0,
    y: 14,
    scale: 0.96,
    filter: "blur(2px)",
    pointerEvents: "none" as const,
    transition: {
      duration: 0.16,
      ease: "easeOut" as const,
    },
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    pointerEvents: "auto" as const,
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 32,
      mass: 0.55,
    },
  },
};

interface FeaturedProjectProps {
  project: Project | null;
}

const fallbackProjectHref = "/projects";
const fallbackDesktopImage = "/images/laptop.svg";
const fallbackPhoneImage = "/images/phone.svg";

function versionImageUrl(src: string, version?: string) {
  if (!version || src.startsWith("/")) return src;

  const url = new URL(src);
  url.searchParams.set("v", version);

  return url.toString();
}

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  const projectHref = project ? `/projects/${project.slug}` : fallbackProjectHref;
  const projectTitle = project?.title ?? "Featured project";
  const desktopImage =
    project?.featured_desktop_image_url ||
    project?.featured_image_url ||
    fallbackDesktopImage;
  const phoneImage =
    project?.featured_phone_image_url ||
    project?.featured_image_url ||
    fallbackPhoneImage;

  return (
    <div className="flex w-full max-w-280 items-center justify-center gap-[clamp(0.75rem,3vw,2.5rem)]">
      <motion.div
        className="relative w-[min(68vw,53rem)] max-sm:w-[70vw]"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
      >
        <Image
          src={versionImageUrl(desktopImage, project?.updated_at)}
          alt={`${projectTitle} desktop preview`}
          width={848}
          height={560}
          sizes="(max-width: 640px) 70vw, min(68vw, 53rem)"
          className="block h-auto w-full"
        />
        <div className="absolute bottom-[11%] left-1/2 z-40 -translate-x-1/2">
          <motion.div variants={projectButtonVariants}>
            <Button
              variant="outline"
              size="lg"
              className="whitespace-nowrap px-5 py-2 text-sm sm:px-8 sm:py-4 sm:text-lg"
            >
              <Link href={projectHref}>VIEW PROJECT</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <Image
        src={versionImageUrl(phoneImage, project?.updated_at)}
        alt={`${projectTitle} phone preview`}
        width={440}
        height={956}
        sizes="(max-width: 640px) 24vw, min(23vw, 17.5rem)"
        className="block h-auto w-[min(23vw,17.5rem)] max-sm:w-[24vw]"
      />
    </div>
  );
}
