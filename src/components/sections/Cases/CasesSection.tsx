import { Link } from "@/i18n/navigation";

import { CASES_HREF, isAvailableHref } from "@/constants/routes";
import {
  ctaPillBaseClassName,
  ctaPillLabelClassName,
} from "@/components/ui/actionButtonGroup.styles";
import {
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";
import { homeCasesTitleClassName } from "@/components/ui/sectionTitle.styles";
import CaseCard from "./CaseCard";
import { CASES } from "./cases.constants";
import {
  casesSectionCardsGridClassName,
  casesSectionClassName,
  casesSectionContainerClassName,
} from "./casesSection.styles";

const allCasesButtonClassName = [
  ctaPillBaseClassName,
  "h-[41px] w-[157px] self-center bg-[#0024AE] lg:self-auto",
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
].join(" ");

function AllCasesButton({ href }: { readonly href: string | null }) {
  const label = (
    <span data-cases="all-cases-button-text" className={ctaPillLabelClassName}>
      Ver todos os casos
    </span>
  );

  if (isAvailableHref(href)) {
    return (
      <Link
        href={href}
        data-cases="all-cases-button"
        className={allCasesButtonClassName}
      >
        {label}
      </Link>
    );
  }

  return (
    <span data-cases="all-cases-button" className={allCasesButtonClassName}>
      {label}
    </span>
  );
}

export default function CasesSection() {
  const casesHref = CASES_HREF;

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
            className="flex min-w-0 w-full flex-col items-center gap-4 lg:w-auto lg:items-start"
          >
            <span
              data-cases="badge"
              className="box-border inline-flex h-[31.8px] w-[145.8px] shrink-0 items-center justify-center self-center overflow-visible rounded-[399px] border border-[#0024AE]/25 bg-[#0024AE]/5 px-[14.4px] py-[6.4px] backdrop-blur-sm lg:self-start"
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
              className={homeCasesTitleClassName}
            >
              Resultados em produção. Não em pitch deck.
            </h2>
          </div>

          <AllCasesButton href={casesHref} />
        </div>

        <div
          data-cases="cards-grid"
          className={casesSectionCardsGridClassName}
        >
          {CASES.map((successCase) => (
            <CaseCard key={successCase.id} caseData={successCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
