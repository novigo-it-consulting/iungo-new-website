import ProductPageCtaSection from "@/components/sections/Cta/ProductPageCtaSection";
import { getRequestDemoLabel } from "@/components/sections/shared/requestDemoLabel";

import { IOT_CTA_BUTTON, IOT_CTA_TITLE } from "./iotCta.constants";

export default async function IoTCtaSection() {
  const requestDemoLabel = await getRequestDemoLabel();

  return (
    <ProductPageCtaSection
      dataPrefix="iot-final-cta"
      titleId="iot-final-cta-title"
      line1={IOT_CTA_TITLE.line1}
      line2={IOT_CTA_TITLE.line2}
      buttonHref={IOT_CTA_BUTTON.href}
      buttonLabel={requestDemoLabel}
      spacerClassName="h-[173px] w-full bg-white"
      titleFrameClassName="flex w-full max-w-[513px] min-h-[120px] flex-col items-center"
      titleToButtonGapClassName="gap-[25px]"
    />
  );
}
