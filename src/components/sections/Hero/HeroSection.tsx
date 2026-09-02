import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import PageSideRails from "@/components/layout/PageSideRails";

import { homeHeroRowClassName, homeHeroSectionClassName } from "./homeHero.styles";

import "./homeHero.css";

export default function HeroSection() {
  return (
    <section
      data-hero-section
      data-page-rail-section="hero"
      data-gradient-section
      aria-labelledby="hero-title"
      className={homeHeroSectionClassName}
    >
      <PageSideRails
        scope="hero"
        className="mx-auto max-w-[1728px] px-4 md:px-8 2xl:max-w-none 2xl:px-0"
      >
        <div data-hero-row className={homeHeroRowClassName}>
          <HeroContent />
          <HeroVisual />
        </div>
      </PageSideRails>
    </section>
  );
}
