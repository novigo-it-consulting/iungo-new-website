import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { CONCIERGE_CTA_BUTTON } from "./conciergeCta.constants";

export default async function ConciergeCtaSection() {
  const t = await getTranslations("productPages.concierge.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="concierge-cta"
      titleId="concierge-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      buttonHref={CONCIERGE_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
    />
  );
}
