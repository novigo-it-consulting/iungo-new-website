import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import {
  ATTENDANT_CTA_BUTTON,
  ATTENDANT_CTA_TITLE,
} from "./attendantCta.constants";

export default async function AttendantCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="attendant-final-cta"
      titleId="attendant-final-cta-title"
      line1={ATTENDANT_CTA_TITLE.line1}
      line2={ATTENDANT_CTA_TITLE.line2}
      buttonHref={ATTENDANT_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[187px] w-full bg-white"
    />
  );
}
