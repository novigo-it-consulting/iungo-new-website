import PageContainer from "@/components/layout/PageContainer";
import ConciergeJourneyStudioContent from "./ConciergeJourneyStudioContent";
import ConciergeJourneyStudioVisual from "./ConciergeJourneyStudioVisual";

export default function ConciergeJourneyStudioSection() {
  return (
    <section
      data-concierge-studio-section
      aria-labelledby="concierge-studio-title"
      className="w-full min-w-0 bg-[rgba(244,244,245,0.40)] py-16 xl:min-h-[503.8px] xl:py-[96px]"
    >
      <PageContainer
        size="content1280"
        className="min-w-0 xl:min-h-[311.8px]"
      >
        <div
          data-concierge-studio-container
          className="grid min-h-[220px] min-w-0 grid-cols-1 gap-y-12 xl:min-h-[311.8px] xl:grid-cols-[minmax(0,559fr)_minmax(0,673fr)] xl:gap-x-12"
        >
          <div
            data-concierge-studio-copy
            className="min-w-0 xl:min-h-[311.8px] xl:pl-8"
          >
            <ConciergeJourneyStudioContent />
          </div>

          <ConciergeJourneyStudioVisual />
        </div>
      </PageContainer>
    </section>
  );
}
