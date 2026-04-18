"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="absolute top-0 w-full z-50 flex items-center pt-20">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Dockyard Design logo"
          width={2274}
          height={485}
          className="w-[320px] h-20 mx-90 object-fill"
          loading="eager"
          priority
        />
      </Link>

      <div className="flex gap-16">
        {SITE_CONFIG.navigation.main.map((nav) => {
          const isActive = pathname === nav.url;

          return (
            <div key={nav.label} className="relative">
              <Link href={nav.url}>
                <span
                  className={`text-xl font-regular bg-linear-to-r from-white to-transparent bg-no-repeat transition-all duration-300 ${
                    isActive
                      ? "font-bold bg-size-[0%_0px]"
                      : "bg-size-[0%_1px] bg-position-[0%_100%] hover:bg-position-[0_100%] hover:bg-size-[100%_1px]"
                  }`}
                >
                  {nav.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
