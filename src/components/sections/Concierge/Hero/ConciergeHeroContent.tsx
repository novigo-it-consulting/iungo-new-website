import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";
import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function ConciergeHeroContent() {
  return (
    <div data-concierge-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.concierge} />
      </div>

      <ProductHeroTitle
        id="concierge-hero-title"
        title="Iungo Concierge"
        dataPrefix="concierge"
      />

      <p
        data-concierge-hero-description
        className={`${productHeroDescriptionBlockClassName} max-w-[623px] ${productHeroParagraphClassName}`}
      >
        Orquestração de jornadas multicanal em tempo real. Studio no-code
        visual. Triggers em minutos, não horas. O único stack que orquestra
        usando o próprio. Behavior + Organizer AI PIM em tempo real.
      </p>
    </div>
  );
}
