import type { ReactNode } from "react";

import CaseCardMedia from "./CaseCardMedia";
import type { CaseImage } from "./cases.constants";
import {
  caseCardClassName,
  caseCardInnerClassName,
} from "./casesSection.styles";
import "./caseCard.hover.css";

type CaseCardProps = {
  caseId: string;
  accessibleName: string;
  image?: CaseImage;
  children?: ReactNode;
};

export default function CaseCard({
  caseId,
  accessibleName,
  image,
  children,
}: CaseCardProps) {
  return (
    <article
      data-case-card={caseId}
      aria-label={accessibleName}
      className={caseCardClassName}
    >
      <div className={caseCardInnerClassName}>
        {image ? <CaseCardMedia caseId={caseId} image={image} /> : null}
        {children}
      </div>
    </article>
  );
}
