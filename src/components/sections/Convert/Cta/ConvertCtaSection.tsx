import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";

import { CONVERT_CTA_BUTTON, CONVERT_CTA_TITLE } from "./convertCta.constants";

export default function ConvertCtaSection() {
  return (
    <ProductPageCtaSection
      dataPrefix="convert-final-cta"
      titleId="convert-final-cta-title"
      line1={CONVERT_CTA_TITLE.line1}
      line2={CONVERT_CTA_TITLE.line2}
      buttonHref={CONVERT_CTA_BUTTON.href}
      buttonLabel={CONVERT_CTA_BUTTON.label}
      spacerClassName="h-[193px] w-full bg-white"
      buttonVariant="convert"
    />
  );
}
