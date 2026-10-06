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

export default async function ConciergeHeroContent() {
  const t = await getTranslations("productPages.concierge.hero");

  return (
    <div data-concierge-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.concierge} />
      </div>

      <ProductHeroTitle
        id="concierge-hero-title"
        title={t("title")}
        dataPrefix="concierge"
      />

      <p
        data-concierge-hero-description
        className={`${productHeroDescriptionBlockClassName} max-w-[623px] ${productHeroParagraphClassName}`}
      >
        {t("description")}
      </p>
    </div>
  );
}
