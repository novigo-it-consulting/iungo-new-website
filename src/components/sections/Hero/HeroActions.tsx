import Link from "next/link";

import { isAvailableHref, PLATAFORMA_HREF, SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import PrimaryLink from "@/components/ui/PrimaryLink";

import {
  homeHeroActionsClassName,
  homeHeroSecondaryButtonClassName,
} from "./homeHero.styles";

export default function HeroActions() {
  const plataformaHref = PLATAFORMA_HREF;

  return (
    <div data-hero-actions className={homeHeroActionsClassName}>
      <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
        Solicitar Demonstração
      </PrimaryLink>

      {isAvailableHref(plataformaHref) ? (
        <Link
          data-hero-secondary-cta
          href={plataformaHref}
          className={homeHeroSecondaryButtonClassName}
        >
          <span className="inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]">
            Conhecer a Plataforma
          </span>
        </Link>
      ) : (
        <span
          data-hero-secondary-cta
          className={homeHeroSecondaryButtonClassName}
        >
          <span className="inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]">
            Conhecer a Plataforma
          </span>
        </span>
      )}
    </div>
  );
}
