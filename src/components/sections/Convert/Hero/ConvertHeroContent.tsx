import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroCtaClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function ConvertHeroContent() {
  return (
    <div data-convert-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.convert} />
      </div>

      <ProductHeroTitle
        id="convert-hero-title"
        title="Iungo Convert"
        dataPrefix="convert"
      />

      <div
        data-convert-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[615px]`}
      >
        <p data-convert-hero-presentation className={productHeroParagraphClassName}>
          O único Sales Agent que conhece seu catálogo PIM e o perfil CDP em
          tempo real.
        </p>

        <p
          data-convert-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          Identifica intenção. Recomenda produto. Negocia condição. Fecha venda.
          E faz handoff perfeito ao humano quando faz sentido — com contexto
          completo.
        </p>
      </div>

      <div data-convert-hero-cta className={productHeroCtaClassName}>
        <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
