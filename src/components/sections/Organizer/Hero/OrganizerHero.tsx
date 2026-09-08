import PageContainer from "@/components/layout/PageContainer";
import {
  productHeroSectionBaseClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import OrganizerHeroContent from "./OrganizerHeroContent";
import OrganizerHeroVisual from "./OrganizerHeroVisual";

export default function OrganizerHero() {
  return (
    <section
      data-organizer-hero-section
      aria-label="Iungo Organizer"
      className={`${productHeroSectionBaseClassName} bg-[linear-gradient(180deg,#FFFFFF_29%,#E9F5F0_100%)]`}
    >
      <PageContainer
        data-organizer-hero-container
        size="content1264"
        className="grid min-w-0 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)] lg:gap-x-6 lg:gap-y-10 xl:gap-x-8 2xl:gap-x-10"
      >
        <OrganizerHeroContent />

        <OrganizerHeroVisual />
      </PageContainer>
    </section>
  );
}
