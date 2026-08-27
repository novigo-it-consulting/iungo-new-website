import type { ReactNode } from "react";

type CaseCardProps = {
  caseId: string;
  accessibleName: string;
  media?: ReactNode;
  children?: ReactNode;
};

export default function CaseCard({
  caseId,
  accessibleName,
  media,
  children,
}: CaseCardProps) {
  return (
    <article
      data-case-card={caseId}
      aria-label={accessibleName}
      className="box-border flex w-full flex-col gap-0 overflow-hidden rounded-2xl border border-[#E4E4E7] bg-white shadow-none lg:min-h-[656.92px]"
    >
      {media}
      {children}
    </article>
  );
}
