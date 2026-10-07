import { getTranslations } from "next-intl/server";

import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";
import ProductHeroLayout from "@/components/sections/shared/Hero/ProductHeroLayout";
import ProductHeroVisual from "@/components/sections/shared/Hero/ProductHeroVisual";
import {
  productHeroCtaOrganizerClassName,
  productHeroGridCenteredClassName,
  productHeroVisualOrganizerClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import OrganizerHeroContent from "./OrganizerHeroContent";

export default async function OrganizerHero() {
  const t = await getTranslations("productPages.organizer.hero");

  return (
    <ProductHeroLayout
      scope="organizer"
      titleId="organizer-hero-title"
      gradientClassName="bg-[linear-gradient(180deg,#FFFFFF_29%,#E9F5F0_100%)]"
      gridClassName={productHeroGridCenteredClassName}
      content={<OrganizerHeroContent />}
      visual={
        <ProductHeroVisual
          productSlug="organizer"
          src="/images/products/organizer/organizer-hero.png"
          alt={t("imageAlt")}
          width={450}
          height={450}
          className={productHeroVisualOrganizerClassName}
        />
      }
      cta={
        <ProductHeroCta
          productSlug="organizer"
          className={productHeroCtaOrganizerClassName}
        />
      }
    />
  );
}
