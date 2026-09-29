import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { homeSectionTitleMobileClassName } from "@/components/ui/sectionTitle.styles";

export default function ConciergeTriggersHeader() {
  return (
    <header
      data-concierge-triggers-header
      className="w-full px-4 sm:px-6 xl:px-8"
    >
      <div className="flex w-full flex-col items-center gap-4">
        <SectionEyebrow variant="compact">
          RÉGUAS INTELIGENTES PRONTAS
        </SectionEyebrow>

        <div
          data-concierge-triggers-title-frame
          className="flex w-full justify-center xl:h-[48px]"
        >
          <h2
            id="concierge-triggers-title"
            data-concierge-triggers-title
            className={[
              "m-0 w-full max-w-[894px] text-center font-reddit font-bold text-[#27272A]",
              homeSectionTitleMobileClassName,
              "lg:text-[42px] lg:leading-[46px] lg:tracking-[-0.84px] xl:text-[48px] xl:leading-[48px] xl:tracking-[-0.96px]",
            ].join(" ")}
          >
            Triggers que convertem em produção real.
          </h2>
        </div>
      </div>
    </header>
  );
}
