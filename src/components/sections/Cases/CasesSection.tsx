import { solidButtonHoverClassName } from "@/components/ui/buttonInteraction.styles";
import CaseCard from "./CaseCard";
import CaseCardContent from "./CaseCardContent";
import CaseCardDescription from "./CaseCardDescription";
import CaseCardMetrics from "./CaseCardMetrics";
import CaseCardTitle from "./CaseCardTitle";
import CaseTag from "./CaseTag";
import { CASES } from "./cases.constants";
import {
  caseCardTagsClassName,
  casesSectionCardsGridClassName,
  casesSectionClassName,
  casesSectionContainerClassName,
} from "./casesSection.styles";

export default function CasesSection() {
  return (
    <section
      id="casos-de-sucesso"
      aria-labelledby="cases-title"
      className={casesSectionClassName}
    >
      <div
        data-section="cases-container"
        className={casesSectionContainerClassName}
      >
        <div
          data-cases="header"
          className="flex w-full flex-col items-start gap-6 lg:min-h-[95.8px] lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <div
            data-cases="heading-group"
            className="flex min-w-0 flex-col items-start gap-4"
          >
            <span
              data-cases="badge"
              className="box-border inline-flex h-[31.8px] w-[145.8px] shrink-0 items-center justify-center overflow-visible rounded-[399px] border border-[#0024AE]/25 bg-[#0024AE]/5 px-[14.4px] py-[6.4px] backdrop-blur-sm"
            >
              <span
                data-cases="badge-text"
                className="flex h-[17px] w-[115px] items-center justify-center whitespace-nowrap text-center font-reddit text-[11.2px] font-medium leading-[16.8px] text-[#0024AE]"
              >
                CASOS DE SUCESSO
              </span>
            </span>

            <h2
              id="cases-title"
              data-cases="title"
              className="m-0 w-fit max-w-full font-reddit text-[30px] font-semibold leading-[48px] tracking-[-0.96px] text-[#041527]"
            >
              Resultados em produção. Não em pitch deck.
            </h2>
          </div>

          <button
            type="button"
            data-cases="all-cases-button"
            className={`box-border inline-flex h-[41px] w-[157px] shrink-0 items-center justify-center gap-[8.67px] self-start whitespace-nowrap rounded-[43.36px] border-0 bg-[#0024AE] px-[13.88px] py-[6.94px] shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 lg:self-auto ${solidButtonHoverClassName}`}
          >
            <span
              data-cases="all-cases-button-text"
              className="w-fit whitespace-nowrap font-reddit text-[13.63px] font-bold leading-[20.8px] tracking-[0] text-white"
            >
              Ver todos os casos
            </span>
          </button>
        </div>

        <div
          data-cases="cards-grid"
          className={casesSectionCardsGridClassName}
        >
          {CASES.map((successCase) => (
            <CaseCard
              key={successCase.id}
              caseId={successCase.id}
              accessibleName={successCase.accessibleName}
              image={successCase.image}
            >
              <CaseCardContent>
                <div
                  data-case-tags={successCase.id}
                  className={caseCardTagsClassName}
                >
                  {successCase.tags.map((tag) => (
                    <CaseTag key={tag.label} tone={tag.tone}>
                      {tag.label}
                    </CaseTag>
                  ))}
                </div>
                <CaseCardTitle caseId={successCase.id}>
                  {successCase.title}
                </CaseCardTitle>
                <CaseCardDescription caseId={successCase.id}>
                  {successCase.description}
                </CaseCardDescription>
                <div
                  data-case-divider={successCase.id}
                  className="h-px w-full bg-[#E4E4E7]"
                  role="separator"
                  aria-hidden="true"
                />
                <CaseCardMetrics
                  caseId={successCase.id}
                  metrics={successCase.metrics}
                  valueClassName={successCase.metricsValueClassName}
                />
              </CaseCardContent>
            </CaseCard>
          ))}
        </div>
      </div>
    </section>
  );
}
