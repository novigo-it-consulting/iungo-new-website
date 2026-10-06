import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import {
  CONCIERGE_CTA_BUTTON,
  CONCIERGE_CTA_TITLE,
} from "./conciergeCta.constants";

export default async function ConciergeCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="concierge-cta"
      titleId="concierge-cta-title"
      line1={CONCIERGE_CTA_TITLE.line1}
      line2={CONCIERGE_CTA_TITLE.line2}
      buttonHref={CONCIERGE_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
    />
  );
}
