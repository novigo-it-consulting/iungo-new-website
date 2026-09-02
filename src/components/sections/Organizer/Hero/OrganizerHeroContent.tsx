import PrimaryLink from "@/components/ui/PrimaryLink";
import {
  productHeroTitleClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import OrganizerHeroIcon from "./OrganizerHeroIcon";

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
        <OrganizerHeroIcon />

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

      <PrimaryLink href="/solicitar-demonstracao">
        Solicitar Demonstração
      </PrimaryLink>
    </div>
  );
}
