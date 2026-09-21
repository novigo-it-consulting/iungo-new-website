import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";
import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function BehaviorHeroContent() {
  return (
    <div data-behavior-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.behavior} />
      </div>

      <ProductHeroTitle
        id="behavior-hero-title"
        title="Iungo Behavior"
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
          O único Behavior CDP brasileiro com engine comportamental + semântico
          proprietário. Visão 360º preditiva em tempo real — não em batch
          noturno.
        </p>
      </div>
    </div>
  );
}
