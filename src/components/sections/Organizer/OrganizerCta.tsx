import { getTranslations } from "next-intl/server";

import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";
import { ORGANIZER_CTA_BUTTON } from "./Cta/organizerCta.constants";

export default async function OrganizerCta() {
  const t = await getTranslations("productPages.organizer.cta");
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="organizer-cta"
      titleId="organizer-cta-title"
      line1={t("line1")}
      line2={t("line2")}
      subtitle={t("subtitle")}
      buttonHref={ORGANIZER_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName=""
    />
  );
}
