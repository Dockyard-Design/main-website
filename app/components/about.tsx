"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "./ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { TypewriterProps } from "@/lib/types";

function Typewriter({ text, speed = 40, className }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const iRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(spanRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView) return;
    iRef.current = 0;

    function type() {
      if (iRef.current < text.length) {
        setDisplayed(text.slice(0, iRef.current + 1));
        iRef.current++;
        timeoutRef.current = setTimeout(type, speed);
      }
    }

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, inView]);

  return (
    <span ref={spanRef} className={className}>
      {displayed}
    </span>
  );
}

const TEAM_MEMBERS = SITE_CONFIG.about.team;
const BACKGROUND_IMAGE = SITE_CONFIG.media.aboutBackground;
const CTA_SECTION = {
  headline: SITE_CONFIG.about.cta.headline,
  email: SITE_CONFIG.general.email,
  buttonText: SITE_CONFIG.about.cta.buttonText,
  buttonLink: SITE_CONFIG.about.cta.buttonLink,
};
const SECTION_CONTENT = SITE_CONFIG.about.content;

export default function About() {
  const getImageUrl = (image: string) => {
    return image;
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
      {BACKGROUND_IMAGE && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <Image
            src={getImageUrl(BACKGROUND_IMAGE)}
            alt="Dockyard background"
            fill
            className="object-cover opacity-20"
            loading="lazy"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight white-text-shadow-hero">
          {SECTION_CONTENT.title}
        </h1>
        <div className="text-lg md:text-xl font-semibold text-center white-text-shadow-no-bg bg-[#018FCC] mb-6">
          {SECTION_CONTENT.subtitle}
        </div>

        <div className="flex lg:hidden flex-row items-start justify-center gap-6 w-full mb-6 flex-wrap">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
                duration: 0.9,
                delay: member.animationDelay,
              }}
              className="relative flex flex-col items-center w-36 h-48 sm:w-44 sm:h-56"
            >
              <div className="rounded-2xl overflow-hidden w-full h-full">
                {member.photo && (
                  <Image
                    src={getImageUrl(member.photo)}
                    alt={member.name}
                    width={180}
                    height={240}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex flex-col items-center mt-4 w-full">
                <motion.span
                  className="text-base font-bold tracking-wide text-white whitespace-nowrap"
                  initial={{ opacity: 0, x: index === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: member.animationDelay }}
                >
                  <Typewriter text={member.role.toUpperCase()} speed={50} />
                </motion.span>
                <motion.span
                  className="text-sm font-bold tracking-wide text-gradient-hero whitespace-nowrap"
                  initial={{ opacity: 0, x: index === 0 ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: member.animationDelay + 0.2,
                  }}
                >
                  <Typewriter text={member.name.toUpperCase()} speed={50} />
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex lg:hidden flex-col items-center justify-center px-8 mb-6">
          <p className="text-base md:text-lg off-white-text-shadow-hero text-center font-medium mb-2">
            {SECTION_CONTENT.description}
          </p>
        </div>

        <div className="hidden lg:flex flex-row items-center justify-center gap-10 w-full mb-6">
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              duration: 0.9,
              delay: TEAM_MEMBERS[0].animationDelay,
            }}
            className="relative flex flex-col items-center w-50 lg:h-70"
          >
            <div
              className={`rounded-2xl overflow-hidden w-full h-full ${
                TEAM_MEMBERS[0].rotation === "-10"
                  ? "-rotate-10"
                  : TEAM_MEMBERS[0].rotation === "10"
                    ? "rotate-10"
                    : ""
              }`}
            >
              {TEAM_MEMBERS[0].photo && (
                <Image
                  src={getImageUrl(TEAM_MEMBERS[0].photo)}
                  alt={TEAM_MEMBERS[0].name}
                  width={180}
                  height={240}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
            <div className="hidden lg:flex absolute mt-78 flex-col items-start min-w-xs">
              <motion.span
                className={`text-lg font-bold tracking-widest text-white pl-24 ${
                  TEAM_MEMBERS[0].rotation === "-10"
                    ? "-rotate-10"
                    : "rotate-10"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: TEAM_MEMBERS[0].animationDelay,
                }}
              >
                <Typewriter
                  text={TEAM_MEMBERS[0].role.toUpperCase()}
                  speed={50}
                />
              </motion.span>
              <motion.span
                className={`text-md font-bold tracking-widest text-gradient-hero pl-25 ${
                  TEAM_MEMBERS[0].rotation === "-10"
                    ? "-rotate-10"
                    : "rotate-10"
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: TEAM_MEMBERS[0].animationDelay + 0.2,
                }}
              >
                <Typewriter
                  text={TEAM_MEMBERS[0].name.toUpperCase()}
                  speed={50}
                />
              </motion.span>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col items-center justify-center min-w-md px-2">
            <p className="text-base md:text-lg off-white-text-shadow-hero text-center font-medium mb-2">
              {SECTION_CONTENT.description}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 18,
              duration: 0.9,
              delay: TEAM_MEMBERS[1].animationDelay,
            }}
            className="relative flex flex-col items-center w-50 lg:h-70"
          >
            <div
              className={`rounded-2xl overflow-hidden w-full h-full ${
                TEAM_MEMBERS[1].rotation === "-10"
                  ? "-rotate-10"
                  : TEAM_MEMBERS[1].rotation === "10"
                    ? "rotate-10"
                    : ""
              }`}
            >
              {TEAM_MEMBERS[1].photo && (
                <Image
                  src={getImageUrl(TEAM_MEMBERS[1].photo)}
                  alt={TEAM_MEMBERS[1].name}
                  width={180}
                  height={240}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
            <div className="hidden lg:flex absolute mt-72 flex-col items-start min-w-xs">
              <motion.span
                className={`text-lg font-bold tracking-widest text-white pb-2 pl-23 pt-2 ${
                  TEAM_MEMBERS[1].rotation === "-10"
                    ? "-rotate-10"
                    : "rotate-10"
                }`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: TEAM_MEMBERS[1].animationDelay,
                }}
              >
                <Typewriter
                  text={TEAM_MEMBERS[1].role.toUpperCase()}
                  speed={50}
                />
              </motion.span>
              <motion.span
                className={`text-md font-bold tracking-widest text-gradient-hero pl-6 ${
                  TEAM_MEMBERS[1].rotation === "-10"
                    ? "-rotate-10"
                    : "rotate-10"
                }`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: TEAM_MEMBERS[1].animationDelay + 0.2,
                }}
              >
                <Typewriter
                  text={TEAM_MEMBERS[1].name.toUpperCase()}
                  speed={50}
                />
              </motion.span>
            </div>
          </motion.div>
        </div>

        {CTA_SECTION && (
          <div className="relative flex flex-col items-center mt-8 md:mt-16 lg:mt-60 z-50">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 off-white-text-shadow-hero max-w-90">
              {CTA_SECTION.headline}
            </h2>
            <Button variant="primary" size="xxl" className=" mb-6 mt-20">
              <Link href={CTA_SECTION.buttonLink}>
                {CTA_SECTION.buttonText}
              </Link>
            </Button>
            <Link
              href={`mailto:${CTA_SECTION.email}`}
              className="text-white text-xl group inline-flex hover:text-[#00CDF4] transition-colors duration-300 mt-5"
            >
              {CTA_SECTION.email.split("").map((char, index) => (
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
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
