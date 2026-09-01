import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";

import {
  BEHAVIOR_CTA_BUTTON,
  BEHAVIOR_CTA_TITLE,
} from "./behaviorCta.constants";

export default function BehaviorCtaSection() {
  return (
    <ProductPageCtaSection
      dataPrefix="behavior-final-cta"
      titleId="behavior-final-cta-title"
      line1={BEHAVIOR_CTA_TITLE.line1}
      line2={BEHAVIOR_CTA_TITLE.line2}
      buttonHref={BEHAVIOR_CTA_BUTTON.href}
      buttonLabel={BEHAVIOR_CTA_BUTTON.label}
    />
  );
}
