import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";
import {
  ORGANIZER_CTA_BUTTON,
  ORGANIZER_CTA_SUBTITLE,
  ORGANIZER_CTA_TITLE,
} from "./Cta/organizerCta.constants";

export default async function OrganizerCta() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="organizer-cta"
      titleId="organizer-cta-title"
      line1={ORGANIZER_CTA_TITLE.line1}
      line2={ORGANIZER_CTA_TITLE.line2}
      subtitle={ORGANIZER_CTA_SUBTITLE}
      buttonHref={ORGANIZER_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName=""
    />
  );
}
