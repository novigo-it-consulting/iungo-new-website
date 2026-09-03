import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import ConciergeHeroIcon from "./ConciergeHeroIcon";

export default function ConciergeHeroContent() {
  return (
    <div data-concierge-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ConciergeHeroIcon />
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

      <div data-concierge-hero-cta className="mt-10 inline-flex xl:mt-[39px]">
        <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
