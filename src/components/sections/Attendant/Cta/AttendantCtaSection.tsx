import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { ATTENDANT_CTA_BUTTON } from "./attendantCta.constants";

export default async function AttendantCtaSection() {
  const t = await getTranslations("productPages.attendant.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="attendant-final-cta"
      titleId="attendant-final-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      buttonHref={ATTENDANT_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[187px] w-full bg-white"
    />
  );
}
