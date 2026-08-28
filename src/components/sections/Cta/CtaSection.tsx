import type { ReactNode } from "react";
import PageContainer from "@/components/layout/PageContainer";
import CtaButton from "./CtaButton";
import CtaSubtitle from "./CtaSubtitle";
import CtaTitle from "./CtaTitle";

interface CtaAction {
  href: string;
  label: string;
}

interface CtaSectionProps {
  titleId: string;
  titleLine1: string;
  titleLine2: string;
  subtitle?: string;
  cta?: CtaAction;
  dataSection?: string;
  children?: ReactNode;
}

export default function CtaSection({
  titleId,
  titleLine1,
  titleLine2,
  subtitle,
  cta,
  dataSection = "product-cta",
  children,
}: CtaSectionProps) {
  return (
    <section
      data-product-cta={dataSection}
      aria-labelledby={titleId}
      className="w-full bg-[#04134F] py-14 sm:py-16 lg:py-20"
    >
      <PageContainer
        size="cta"
        data-product-cta-container={dataSection}
        className="flex min-w-0 flex-col items-center"
      >
        <div
          data-product-cta-content={dataSection}
          className="flex w-full min-w-0 flex-col items-center"
        >
          <CtaTitle titleId={titleId} line1={titleLine1} line2={titleLine2} />
          {subtitle ? (
            <div className="mt-4 w-full">
              <CtaSubtitle text={subtitle} />
            </div>
          ) : null}
          {cta ? (
            <div className={subtitle ? "mt-8" : "mt-4"}>
              <CtaButton href={cta.href} label={cta.label} />
            </div>
          ) : null}
          {children}
        </div>
      </PageContainer>
    </section>
  );
}
