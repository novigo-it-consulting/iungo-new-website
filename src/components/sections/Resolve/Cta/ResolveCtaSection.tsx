import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { RESOLVE_CTA_BUTTON } from "./resolveCta.constants";

export default async function ResolveCtaSection() {
  const t = await getTranslations("productPages.resolve.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="resolve-final-cta"
      titleId="resolve-final-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      buttonHref={RESOLVE_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[65px] w-full bg-white"
    />
  );
}
