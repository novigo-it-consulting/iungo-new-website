import PageContainer from "@/components/layout/PageContainer";
import ConciergeHeroContent from "./ConciergeHeroContent";
import ConciergeHeroVisual from "./ConciergeHeroVisual";

export default function ConciergeHeroSection() {
  return (
    <section
      data-concierge-hero-section
      aria-labelledby="concierge-hero-title"
      className="w-full min-w-0 bg-white bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(167,33,33,0.10)_100%)] py-12 md:py-14 xl:min-h-[558px] xl:py-[54px]"
    >
      <PageContainer
        data-concierge-hero-container
        size="organizer"
        className="min-w-0"
      >
        <div className="grid min-w-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_450px] xl:items-start">
          <ConciergeHeroContent />

          <ConciergeHeroVisual />
        </div>
      </PageContainer>
    </section>
  );
}
