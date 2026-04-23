import { SITE_CONFIG } from "@/lib/site-config";
import { ServicesCard } from "./ui/services-card";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  const { services } = SITE_CONFIG;

  return (
    <>
      <div className="relative z-50 mx-auto -mt-32 sm:-mt-56 lg:-mt-230">
        <div className="relative">
          <Image
            src="/images/services-bg.svg"
            alt="Services Hero"
            width={1728}
            height={512}
            className="h-96 w-full object-cover object-center sm:h-120 lg:h-auto"
          />
          <h1 className="absolute left-1/2 top-[30%] w-[min(92%,72rem)] -translate-x-1/2 text-center text-[clamp(1.7rem,5.6vw,3.75rem)] font-bold uppercase leading-tight [text-shadow:-3px_-3px_10px_rgba(255,255,255,0.25),4px_4px_6px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.1)]">
            Our <span className="text-[#00cdf4]">products</span> &{" "}
            <span className="text-[#e45dff]">services</span>
          </h1>
          <article className="absolute left-1/2 top-[40%] z-2 w-[min(92%,34rem)] -translate-x-1/2 overflow-hidden rounded-[20px] border-[1.5px] border-transparent [background:linear-gradient(105deg,rgba(8,23,34,0.92),rgba(21,21,38,0.94)_46%,rgba(38,16,47,0.92))_padding-box,linear-gradient(100deg,#00cdf4_0%,#00cdf4_11%,#e45dff_90%,#e45dff_100%)_border-box] shadow-[-10px_-10px_26px_rgba(0,205,244,0.28),12px_12px_28px_rgba(228,93,255,0.4),0_0_24px_rgba(0,205,244,0.2),inset_0_1px_0_rgba(255,255,255,0.08)] before:pointer-events-none before:absolute before:inset-[-38%_40%_74%_12%] before:content-[''] before:[background:radial-gradient(ellipse_at_center,rgba(0,205,244,0.34),transparent_68%)] after:pointer-events-none after:absolute after:inset-0 after:content-[''] after:[background:linear-gradient(90deg,rgba(0,205,244,0.05),transparent_28%),linear-gradient(270deg,rgba(228,93,255,0.12),transparent_30%)] sm:top-[39%] sm:w-[min(90%,48rem)] lg:top-[12%] lg:mt-70 lg:w-[min(96%,72rem)] lg:rounded-3xl lg:shadow-[-16px_-16px_36px_rgba(0,205,244,0.32),18px_18px_34px_rgba(228,93,255,0.48),0_0_28px_rgba(0,205,244,0.24),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="relative z-1 flex flex-col items-center px-[0.9rem] pb-[0.85rem] pt-4 text-center sm:px-5 sm:pb-5 sm:pt-6 lg:px-6 lg:pb-[1.35rem] lg:pt-[1.55rem]">
              <h3 className="m-0 text-[clamp(1.45rem,6vw,2.75rem)] font-bold leading-[1.05] tracking-normal text-[#f2eee1] shadow-none [text-shadow:-3px_-3px_10px_rgba(255,255,255,0.22),4px_4px_14px_rgba(0,0,0,0.42),0_0_24px_rgba(0,205,244,0.16)] sm:text-[clamp(1.75rem,4vw,2.75rem)]">
                Quick-Launch Websites
              </h3>
              <p className="mt-3 max-w-312 text-[clamp(1rem,4.4vw,2.1rem)] font-bold leading-[1.18] tracking-normal text-[#f2eee1] [text-shadow:-2px_-2px_8px_rgba(255,255,255,0.18),4px_4px_14px_rgba(0,0,0,0.44)] sm:text-[clamp(1.25rem,2.8vw,2.1rem)] lg:mt-[1.35rem]">
                We will design <em>your</em> website, to <em>your</em> needs,
                from start to finish
              </p>
              <div className="my-[0.9rem] mb-3 h-0.5 w-full bg-[linear-gradient(90deg,rgba(200,220,230,0.28),rgba(242,238,225,0.48)_45%,rgba(190,170,205,0.36))] shadow-[0_1px_0_rgba(255,255,255,0.16),0_-1px_0_rgba(0,0,0,0.46)] lg:my-[1.45rem] lg:mb-[1.1rem]" />
              <Link
                href="/contact"
                className="bg-linear-to-r from-current to-transparent bg-no-repeat bg-size-[0%_1px] bg-position-[0%_100%] text-[clamp(0.9rem,4vw,1.5rem)] font-bold uppercase leading-[1.2] tracking-normal text-[#6bc4e7] no-underline transition-all duration-300 [text-shadow:-1px_-1px_4px_rgba(255,255,255,0.16),2px_2px_8px_rgba(0,0,0,0.55),0_0_18px_rgba(0,205,244,0.18)] hover:bg-position-[0_100%] hover:bg-size-[100%_1px] hover:text-[#8fdcff] hover:[text-shadow:0_0_16px_rgba(0,205,244,0.42),2px_2px_8px_rgba(0,0,0,0.55)] sm:text-[clamp(1rem,2vw,1.5rem)]"
              >
                Get in Touch for a Quote
              </Link>
            </div>
          </article>
        </div>

        <div className="mx-auto flex max-w-350 flex-col items-center justify-center gap-8 px-4 pb-16 pt-10 sm:gap-10 sm:pt-12 lg:pt-6">
          <h2 className="mb-8 bg-[linear-gradient(90deg,#00cbf4_0%,#e45dff_78%)] bg-clip-text text-center text-3xl font-bold text-transparent [text-shadow:-3px_-3px_10px_rgba(255,255,255,0.25),4px_4px_6px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            Additional Services
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {services.map((service, index) => (
              <ServicesCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                cardClassName="h-24 w-full bg-[linear-gradient(to_right,oklch(0.2165_0.0497_22.1)_0%,oklch(0.1541_0.026_260.23)_100%)] opacity-90 sm:h-auto sm:basis-1/2"
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
    </>
  );
}
