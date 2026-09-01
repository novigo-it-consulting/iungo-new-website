import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";

import {
  ATTENDANT_CTA_BUTTON,
  ATTENDANT_CTA_TITLE,
} from "./attendantCta.constants";

export default function AttendantCtaSection() {
  return (
    <ProductPageCtaSection
      dataPrefix="attendant-final-cta"
      titleId="attendant-final-cta-title"
      line1={ATTENDANT_CTA_TITLE.line1}
      line2={ATTENDANT_CTA_TITLE.line2}
      buttonHref={ATTENDANT_CTA_BUTTON.href}
      buttonLabel={ATTENDANT_CTA_BUTTON.label}
      spacerClassName="h-[187px] w-full bg-white"
    />
  );
}
