"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="relative w-full z-50 shrink-0 h-93 footer-top-glow pt-7 bg-primary-gradient overflow-hidden">
      {SITE_CONFIG.media.footerBackground && (
        <Image
          src={SITE_CONFIG.media.footerBackground}
          alt="Anchor"
          width={375}
          height={500}
          className="absolute bottom-0 left-0 opacity-30 z-0 object-cover w-50 md:w-93.75"
          loading="lazy"
        />
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mx-auto w-full max-w-450 min-h-87.5">
        <div className="hidden md:flex flex-col gap-2 text-lg justify-center">
          {SITE_CONFIG.navigation.main.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-col items-center gap-4 md:gap-8 pt-8 md:pt-0">
          {SITE_CONFIG.general.logoUrl && (
            <Link href="/">
              <Image
                src={SITE_CONFIG.general.logoUrl}
                alt="Dockyard Design Logo"
                width={250}
                height={100}
                className="object-contain pt-20 w-37.5 md:w-75 lg:w-62.5"
                priority
              />
            </Link>
          )}

          <a
            href={`mailto:${SITE_CONFIG.general.email}`}
            className="text-white text-xl group inline-flex hover:text-[#00CDF4] transition-colors duration-300"
          >
            {SITE_CONFIG.general.email.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block transition-transform duration-300 ease-in-out group-hover:animate-wave"
                style={{
                  animationDelay: `${index * 50}ms`,
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </a>

          <div className="flex gap-4 text-white">
            {SITE_CONFIG.footer.socialLinks?.facebook && (
              <a
                href={SITE_CONFIG.footer.socialLinks.facebook}
                aria-label="Facebook"
                className="text-white hover:text-[#00CDF4] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={26} />
              </a>
            )}
            {SITE_CONFIG.footer.socialLinks?.instagram && (
              <a
                href={SITE_CONFIG.footer.socialLinks.instagram}
                aria-label="Instagram"
                className="text-white hover:text-[#00CDF4] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={26} />
              </a>
            )}
            {SITE_CONFIG.footer.socialLinks?.youtube && (
              <a
                href={SITE_CONFIG.footer.socialLinks.youtube}
                aria-label="YouTube"
                className="text-white hover:text-[#00CDF4] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={26} />
              </a>
            )}
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 text-lg justify-center">
          {SITE_CONFIG.navigation.other.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex md:hidden items-start justify-center gap-12 pt-12 pb-16 w-full">
          <div className="flex flex-col gap-2 text-lg text-center">
            {SITE_CONFIG.navigation.main.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-lg text-center">
            {SITE_CONFIG.navigation.other.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-white hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
