import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { CONVERT_CTA_BUTTON } from "./convertCta.constants";

export default async function ConvertCtaSection() {
  const t = await getTranslations("productPages.convert.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="convert-final-cta"
      titleId="convert-final-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      buttonHref={CONVERT_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[193px] w-full bg-white"
      buttonVariant="convert"
    />
  );
}
