import CaseCardContent from "./CaseCardContent";
import CaseCardDescription from "./CaseCardDescription";
import CaseCardMedia from "./CaseCardMedia";
import CaseCardMetrics from "./CaseCardMetrics";
import CaseCardTitle from "./CaseCardTitle";
import CaseTag from "./CaseTag";
import type { CaseData } from "./cases.constants";
import {
  caseCardClassName,
  caseCardInnerClassName,
  caseCardTagsClassName,
} from "./casesSection.styles";
import "./caseCard.hover.css";

type CaseCardProps = {
  caseData: CaseData;
};

export default function CaseCard({ caseData }: Readonly<CaseCardProps>) {
  const {
    id,
    accessibleName,
    image,
    tags,
    title,
    description,
    metrics,
    metricsValueClassName,
  } = caseData;

  return (
    <article
      data-case-card={id}
      aria-label={accessibleName}
      className={caseCardClassName}
    >
      <div className={caseCardInnerClassName}>
        {image ? <CaseCardMedia caseId={id} image={image} /> : null}
        <CaseCardContent>
          <div
            data-case-tags={id}
            className={caseCardTagsClassName}
          >
            {tags.map((tag) => (
              <CaseTag key={tag.label} tone={tag.tone}>
                {tag.label}
              </CaseTag>
            ))}
          </div>
          <CaseCardTitle caseId={id}>{title}</CaseCardTitle>
          <CaseCardDescription caseId={id}>{description}</CaseCardDescription>
          <hr
            data-case-divider={id}
            className="m-0 h-px w-full border-0 bg-[#E4E4E7]"
          />
          <CaseCardMetrics
            caseId={id}
            metrics={metrics}
            valueClassName={metricsValueClassName}
          />
        </CaseCardContent>
      </div>
    </article>
  );
}
