import PageContainer from "@/components/layout/PageContainer";

import BehaviorHeroContent from "./BehaviorHeroContent";
import BehaviorHeroVisual from "./BehaviorHeroVisual";

export default function BehaviorHeroSection() {
  return (
    <section
      data-behavior-hero-section
      aria-labelledby="behavior-hero-title"
      className="w-full min-w-0 bg-white bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_29%,rgba(91,108,124,0.10)_100%)] py-12 md:py-14 xl:min-h-[558px] xl:py-[54px]"
    >
      <PageContainer
        data-behavior-hero-container
        size="organizer"
        className="min-w-0"
      >
        <div className="grid min-w-0 grid-cols-1 xl:grid-cols-[minmax(0,1fr)_450px] xl:items-start">
          <BehaviorHeroContent />

          <BehaviorHeroVisual />
        </div>
      </PageContainer>
    </section>
  );
}
