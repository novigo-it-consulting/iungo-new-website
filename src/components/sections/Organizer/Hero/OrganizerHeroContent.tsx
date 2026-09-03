import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import {
  productHeroTitleClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function OrganizerHeroContent() {
  return (
    <div
      data-organizer-hero-content
      className="flex min-w-0 flex-col items-start gap-8 md:gap-10 xl:gap-12 2xl:gap-[58px] 2xl:pl-[3px]"
    >
      <div
        data-organizer-hero-copy
        className="flex min-w-0 flex-col items-start gap-[14px]"
      >
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.organizer} />

        <h1 data-organizer-hero-title className={productHeroTitleClassName}>
          Iungo Organizer
        </h1>

        <p
          data-organizer-hero-description
          className={`max-w-[579px] ${productHeroParagraphClassName}`}
        >
          O melhor AI PIM para enriquecer catálogos com IA generativa, com
          onboarding em 14 dias e integração nativa com Mercado Livre e Amazon
          BR.
        </p>
      </div>

      <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
        Solicitar Demonstração
      </PrimaryLink>
    </div>
  );
}
