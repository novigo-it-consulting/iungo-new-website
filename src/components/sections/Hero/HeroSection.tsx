import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";
import PageContainer from "@/components/layout/PageContainer";

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
      <PageContainer size="content1264" data-page-main-content="hero">
        <div data-hero-row className={homeHeroRowClassName}>
          <HeroContent />
          <HeroVisual />
        </div>
      </PageContainer>
    </section>
  );
}
