import PageContainer from "@/components/layout/PageContainer";
import CtaButton from "@/components/sections/Cta/CtaButton";

import {
  CONCIERGE_CTA_BUTTON,
  CONCIERGE_CTA_TITLE,
} from "./conciergeCta.constants";
import ConciergeCtaTitle from "./ConciergeCtaTitle";

export default function ConciergeCtaSection() {
  return (
    <>
      <div
        data-concierge-cta-spacer
        aria-hidden="true"
        className="h-[32px] w-full bg-white"
      />

      <section
        data-concierge-cta-section
        aria-labelledby="concierge-cta-title"
        className="w-full bg-[#04134F]"
      >
      <PageContainer
        size="cta"
        data-concierge-cta-container
        className="flex min-w-0 flex-col items-center pt-[80px] pb-[80px]"
      >
        <div
          data-concierge-cta-content
          className="flex w-full min-w-0 flex-col items-center"
        >
          <ConciergeCtaTitle
            line1={CONCIERGE_CTA_TITLE.line1}
            line2={CONCIERGE_CTA_TITLE.line2}
          />

          <div data-concierge-cta-action className="mt-[25px]">
            <CtaButton
              href={CONCIERGE_CTA_BUTTON.href}
              label={CONCIERGE_CTA_BUTTON.label}
            />
          </div>
        </div>
      </PageContainer>
    </section>
    </>
  );
}
