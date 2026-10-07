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

export default async function BehaviorHeroContent() {
  const t = await getTranslations("productPages.behavior.hero");

  return (
    <div data-behavior-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.behavior} />
      </div>

      <ProductHeroTitle
        id="behavior-hero-title"
        title={t("title")}
        dataPrefix="behavior"
      />

      <div
        data-behavior-hero-subtitle-container
        className={`${productHeroDescriptionBlockClassName} max-w-[566px]`}
      >
        <p
          data-behavior-hero-subtitle
          className={productHeroParagraphClassName}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
