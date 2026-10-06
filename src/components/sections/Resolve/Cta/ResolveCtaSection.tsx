import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import {
  RESOLVE_CTA_BUTTON,
  RESOLVE_CTA_TITLE,
} from "./resolveCta.constants";

export default async function ResolveCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="resolve-final-cta"
      titleId="resolve-final-cta-title"
      line1={RESOLVE_CTA_TITLE.line1}
      line2={RESOLVE_CTA_TITLE.line2}
      buttonHref={RESOLVE_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[65px] w-full bg-white"
    />
  );
}
