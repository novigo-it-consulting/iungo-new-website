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

export default async function ResolveHeroContent() {
  const t = await getTranslations("productPages.resolve.hero");

  return (
    <div data-resolve-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.resolve} />
      </div>

      <ProductHeroTitle
        id="resolve-hero-title"
        title={t("title")}
        dataPrefix="resolve"
      />

      <div
        data-resolve-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[566px]`}
      >
        <p
          data-resolve-hero-presentation
          className={productHeroParagraphClassName}
        >
          {t("presentation")}
        </p>

        <p
          data-resolve-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
