import Link from "next/link";
import { getFeaturedProject } from "@/lib/api";
import type { Project } from "@/lib/types";
import FeaturedProject from "./featured-project";
import Button from "./ui/button";

export default async function Projects() {
  let featuredProject: Project | null = null;

  try {
    featuredProject = await getFeaturedProject();
  } catch (error) {
    console.error("[Projects] Failed to load featured project", error);
  }

  return (
    <section className="px-4 pt-20 sm:pt-24 lg:pt-30">
      <div className="mx-auto flex min-h-screen max-w-352 flex-col items-center justify-center gap-8 sm:gap-10">
        <h2 className="bg-[linear-gradient(90deg,#00cbf4_0%,#e45dff_78%)] bg-clip-text text-center text-[clamp(2.25rem,7vw,4.5rem)] font-bold uppercase leading-none text-transparent [text-shadow:-3px_-3px_10px_rgba(255,255,255,0.25),4px_4px_6px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.1)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          Featured Project
        </h2>
        <FeaturedProject project={featuredProject} />
        <div className="mb-24 flex w-full max-w-5xl flex-col items-center justify-center gap-5 sm:mb-32 sm:flex-row sm:gap-8 lg:mb-40 lg:gap-10">
          <Button
            variant="outline"
            size="xxl"
            className="w-full px-6 py-4 text-base sm:w-auto sm:px-12 sm:py-5 sm:text-xl md:px-20 lg:px-30 lg:py-6 lg:text-2xl"
          >
            <Link href="/projects">VIEW ALL PROJECTS</Link>
          </Button>
          <Button
            variant="primary"
            size="xxl"
            className="w-full px-6 py-4 text-base sm:w-auto sm:px-12 sm:py-5 sm:text-xl md:px-20 lg:px-30 lg:py-6 lg:text-2xl"
          >
            <Link href="/contact">GET IN TOUCH</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
