import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroCtaClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import ResolveHeroButton from "./ResolveHeroButton";
import ResolveHeroIcon from "./ResolveHeroIcon";

export default function ResolveHeroContent() {
  return (
    <div data-resolve-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ResolveHeroIcon />
      </div>

      <ProductHeroTitle
        id="resolve-hero-title"
        title="Iungo Resolve"
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
          Agente de suporte L1/L2 com conhecimento profundo do seu produto.
        </p>

        <p
          data-resolve-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          Lê o catálogo do Iungo Organizer AI PIM em tempo real. Consulta o
          perfil do Iungo Behavior CDP. Resolve dúvidas técnicas como um
          especialista — em segundos.
        </p>
      </div>

      <div data-resolve-hero-cta className={productHeroCtaClassName}>
        <ResolveHeroButton />
      </div>
    </div>
  );
}
