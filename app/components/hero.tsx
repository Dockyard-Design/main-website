import Image from "next/image";
import Button from "./ui/button";
import { SITE_CONFIG } from "@/lib/site-config";

export default function Hero() {
  const { hero, media } = SITE_CONFIG;

  return (
    <div className="relative min-h-screen grid">
      <Image
        src={media.heroBackground}
        alt="Hero background image"
        width={1920}
        height={1080}
        className="col-start-1 row-start-1 object-cover w-full h-full"
        loading="eager"
        priority
      />
      <div className="col-start-1 row-start-1 bg-linear-to-t from-[#0A1323]/0 to-[#0B1323]/80 h-91.5" />

      <div className="col-start-1 row-start-1 flex items-start justify-start text-center px-4 z-10 pt-[30vh] pl-60">
        <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-6">
          <h1 className="text-[88px] font-bold leading-tight text-glow">
            {hero.title.text.split(' ').map((word, i) => {
              const highlight = hero.title.highlighted.find(h =>
                h.text.toUpperCase().split(' ').includes(word.toUpperCase())
              );
              return (
                <span key={i} className={highlight?.color || ""}>
                  {word}{" "}
                </span>
              );
            })}
          </h1>
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mt-4 text-glow">
              {hero.subtitle}
            </h2>
          </div>
          <div className="flex flex-col justify-center items-center gap-8">
            <Button
              variant="primary"
              size="xxl"
              className="text-3xl mt-8 font-semibold"
            >
              {hero.cta.primary.text}
            </Button>
            <Button variant="link" size="sm" className="text-md">
              {hero.cta.secondary.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
