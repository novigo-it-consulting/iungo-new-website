import { getTranslations } from "next-intl/server";

import {
  productHeroTitleClassName,
  productHeroParagraphClassName,
  productHeroContentPlacementClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

const organizerHeroContentClassName = [
  "flex min-w-0 flex-col items-start 2xl:pl-[3px]",
  productHeroContentPlacementClassName,
].join(" ");

export default async function OrganizerHeroContent() {
  const t = await getTranslations("productPages.organizer.hero");

  return (
    <div
      data-organizer-hero-content
      className={organizerHeroContentClassName}
    >
      <div
        data-organizer-hero-copy
        className="flex min-w-0 flex-col items-start gap-[14px]"
      >
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.organizer} />

        <h1
          id="organizer-hero-title"
          data-organizer-hero-title
          className={productHeroTitleClassName}
        >
          {t("title")}
        </h1>

        <p
          data-organizer-hero-description
          className={`max-w-[579px] ${productHeroParagraphClassName}`}
        >
          {t("description")}
        </p>
      </div>
    </div>
  );
}
