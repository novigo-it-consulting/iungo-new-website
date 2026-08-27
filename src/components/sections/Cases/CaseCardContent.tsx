import type { ReactNode } from "react";

type CaseCardContentProps = {
  children: ReactNode;
};

export default function CaseCardContent({ children }: CaseCardContentProps) {
  return (
    <div
      data-case-content=""
      className="flex w-full flex-1 flex-col items-stretch gap-3 overflow-visible p-8"
    >
      {children}
    </div>
  );
}
