import { getTranslations } from "next-intl/server";

import ProductSystemScreensImage from "@/components/sections/shared/SystemScreens/ProductSystemScreensImage";
import { productSystemScreensMainSizes } from "@/components/sections/shared/SystemScreens/productSystemScreens.styles";

import { CONCIERGE_SYSTEM_SCREEN_CANVAS } from "./conciergeSystemScreens.constants";

export default async function ConciergeSystemScreensVisual() {
  const t = await getTranslations("productPages.concierge.systemScreens");

  return (
    <div
      data-concierge-system-screens-visual
      className="mt-6 w-full xl:min-h-[408px]"
    >
      <ProductSystemScreensImage
        image={{
          ...CONCIERGE_SYSTEM_SCREEN_CANVAS,
          alt: t("canvasAlt"),
        }}
        sizes={productSystemScreensMainSizes}
      />
    </div>
  );
}
