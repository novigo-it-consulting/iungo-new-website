import Link from "next/link";
import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";

import {
  homeHeroActionsClassName,
  homeHeroSecondaryButtonClassName,
} from "./homeHero.styles";

export default function HeroActions() {
  return (
    <div data-hero-actions className={homeHeroActionsClassName}>
      <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
        Solicitar Demonstração
      </PrimaryLink>

      <Link
        data-hero-secondary-cta
        href="/plataformas"
        className={homeHeroSecondaryButtonClassName}
      >
        <span className="inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]">
          Conhecer a Plataforma
        </span>
      </Link>
    </div>
  );
}
