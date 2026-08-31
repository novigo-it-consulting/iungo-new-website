import PageContainer from "@/components/layout/PageContainer";
import OrganizerHeroContent from "./OrganizerHeroContent";
import OrganizerHeroVisual from "./OrganizerHeroVisual";

export default function OrganizerHero() {
  return (
    <section
      data-organizer-hero-section
      aria-label="Iungo Organizer"
      className="w-full min-w-0 bg-[linear-gradient(180deg,#FFFFFF_29%,#E9F5F0_100%)] py-12 md:py-14 xl:min-h-[558px] xl:py-[54px]"
    >
      <PageContainer
        data-organizer-hero-container
        size="organizer"
        className="grid min-w-0 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12"
      >
        <OrganizerHeroContent />

        <OrganizerHeroVisual />
      </PageContainer>
    </section>
  );
}
