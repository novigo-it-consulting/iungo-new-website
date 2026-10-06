import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { BEHAVIOR_CTA_BUTTON } from "./behaviorCta.constants";

export default async function BehaviorCtaSection() {
  const t = await getTranslations("productPages.behavior.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="behavior-final-cta"
      titleId="behavior-final-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      buttonHref={BEHAVIOR_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
    />
  );
}
