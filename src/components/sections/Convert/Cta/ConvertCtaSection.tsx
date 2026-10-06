import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { CONVERT_CTA_BUTTON, CONVERT_CTA_TITLE } from "./convertCta.constants";

export default async function ConvertCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="convert-final-cta"
      titleId="convert-final-cta-title"
      line1={CONVERT_CTA_TITLE.line1}
      line2={CONVERT_CTA_TITLE.line2}
      buttonHref={CONVERT_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[193px] w-full bg-white"
      buttonVariant="convert"
    />
  );
}
