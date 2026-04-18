import Image from "next/image";
import Button from "./ui/button";
import { SITE_CONFIG } from "@/lib/site-config";
import { ServicesCard } from "./ui/services-card";

export default function Hero() {
  const { hero, media, services } = SITE_CONFIG;

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
            {hero.title.text.split(" ").map((word, i) => {
              const highlight = hero.title.highlighted.find((h) =>
                h.text.toUpperCase().split(" ").includes(word.toUpperCase()),
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

      <div>
        <div className="flex flex-col items-center justify-center py-16 px-4 gap-10 max-w-350 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient-hero">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServicesCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                cardClassName={`bg-services-gradient-card w-full sm:basis-1/2 h-24 sm:h-auto`}
                cardStyle={{
                  border: `1px solid ${service.cardColor}`,
                  boxShadow: `14px 14px 18px 1px #000, 0px 0px 18px 1px ${service.cardColor}`,
                }}
                iconClassName={`w-24 sm:w-30 h-full sm:h-auto flex-shrink-0`}
                iconWrapperStyle={{
                  background: `linear-gradient(to top, ${service.iconGradientStart}, ${service.iconGradientEnd})`,
                  boxShadow: `0px 0px 12px ${service.cardColor}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
