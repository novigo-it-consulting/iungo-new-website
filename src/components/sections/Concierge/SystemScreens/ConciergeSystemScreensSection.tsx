import PageContainer from "@/components/layout/PageContainer";
import ConciergeSystemScreensCards from "./ConciergeSystemScreensCards";
import ConciergeSystemScreensFilters from "./ConciergeSystemScreensFilters";
import ConciergeSystemScreensVisual from "./ConciergeSystemScreensVisual";

export default function ConciergeSystemScreensSection() {
  return (
    <section
      data-concierge-system-screens-section
      aria-labelledby="concierge-system-screens-title"
      className="w-full min-w-0 bg-white py-16 xl:min-h-[1158.8px] xl:py-[96px]"
    >
      <PageContainer
        size="content1280"
        className="min-w-0 xl:min-h-[966.8px]"
      >
        <div
          data-concierge-system-screens-container
          className="min-w-0 xl:min-h-[966.8px]"
        >
          <div
            data-concierge-system-screens-header
            className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-3 pb-6 xl:min-h-[80px]"
          >
            <div
              data-concierge-system-screens-title-frame
              className="flex w-full items-start justify-center xl:h-[40px]"
            >
              <h2
                id="concierge-system-screens-title"
                data-concierge-system-screens-title
                className="w-full max-w-[621px] text-center font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] sm:text-[32px] sm:leading-[38px] sm:tracking-[-0.64px] xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]"
              >
                O canvas que marketing opera sozinho.
              </h2>
            </div>

            <p
              data-concierge-system-screens-description
              className="w-full max-w-[604px] text-center font-reddit text-[14px] font-normal leading-[22px] tracking-normal text-[#71717A] sm:text-[15px] sm:leading-[23px] xl:text-[16px] xl:leading-[24px]"
            >
              Jornadas visuais, splits inteligentes, A/B test embarcado e
              métricas ao vivo por etapa.
            </p>
          </div>

          <div
            data-concierge-system-screens-content
            className="px-6 sm:px-8"
          >
            <ConciergeSystemScreensFilters />

            <ConciergeSystemScreensVisual />

            <ConciergeSystemScreensCards />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
