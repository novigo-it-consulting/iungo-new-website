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

function renderAttendantLineBreak() {
  return <br className="max-xl:hidden" />;
}

export default async function AttendantHeroContent() {
  const t = await getTranslations("productPages.attendant.hero");

  return (
    <div data-attendant-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.attendant} />
      </div>

      <ProductHeroTitle
        id="attendant-hero-title"
        title={t("title")}
        dataPrefix="attendant"
      />

      <div
        data-attendant-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[566px]`}
      >
        <p
          data-attendant-hero-description
          className={productHeroParagraphClassName}
        >
          {t.rich("description", {
            br: renderAttendantLineBreak,
          })}
        </p>
      </div>
    </div>
  );
}
