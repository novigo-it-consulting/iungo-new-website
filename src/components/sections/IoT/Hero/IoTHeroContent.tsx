import { getTranslations } from "next-intl/server";

import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

export default async function IoTHeroContent() {
  const t = await getTranslations("productPages.iot.hero");

  return (
    <div data-iot-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.iot} />
      </div>

      <ProductHeroTitle
        id="iot-hero-title"
        title={t("title")}
        dataPrefix="iot"
      />

      <div
        data-iot-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[615px]`}
      >
        <p data-iot-hero-presentation className={productHeroParagraphClassName}>
          {t("presentation")}
        </p>

        <p
          data-iot-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
