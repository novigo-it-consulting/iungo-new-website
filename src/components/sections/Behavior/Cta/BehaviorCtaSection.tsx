import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import {
  BEHAVIOR_CTA_BUTTON,
  BEHAVIOR_CTA_TITLE,
} from "./behaviorCta.constants";

export default async function BehaviorCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="behavior-final-cta"
      titleId="behavior-final-cta-title"
      line1={BEHAVIOR_CTA_TITLE.line1}
      line2={BEHAVIOR_CTA_TITLE.line2}
      buttonHref={BEHAVIOR_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
    />
  );
}
