import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import BehaviorHeroIcon from "./BehaviorHeroIcon";

export default function BehaviorHeroContent() {
  return (
    <div data-behavior-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <BehaviorHeroIcon />
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

      <div data-behavior-hero-cta className="mt-10 inline-flex xl:mt-[39px]">
        <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
