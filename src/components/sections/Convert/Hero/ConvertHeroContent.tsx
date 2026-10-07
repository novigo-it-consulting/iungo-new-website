import { getTranslations } from "next-intl/server";

import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";
import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default async function ConvertHeroContent() {
  const t = await getTranslations("productPages.convert.hero");

  return (
    <div data-convert-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.convert} />
      </div>

      <ProductHeroTitle
        id="convert-hero-title"
        title={t("title")}
        dataPrefix="convert"
      />

      <div
        data-convert-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[615px]`}
      >
        <p data-convert-hero-presentation className={productHeroParagraphClassName}>
          {t("presentation")}
        </p>

        <p
          data-convert-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
