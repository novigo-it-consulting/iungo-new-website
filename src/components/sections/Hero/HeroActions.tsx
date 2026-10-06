import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { isAvailableHref, PLATAFORMA_HREF, SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import PrimaryLink from "@/components/ui/PrimaryLink";

import {
  homeHeroActionLabelClassName,
  homeHeroActionsClassName,
  homeHeroPrimaryButtonClassName,
  homeHeroSecondaryButtonClassName,
} from "./homeHero.styles";

export default async function HeroActions() {
  const t = await getTranslations("common");
  const plataformaHref = PLATAFORMA_HREF;
  const secondaryLabel = (
    <span className={homeHeroActionLabelClassName}>{t("knowPlatform")}</span>
  );

  return (
    <div data-hero-actions className={homeHeroActionsClassName}>
      <PrimaryLink
        href={SOLICITAR_DEMONSTRACAO_HREF}
        className={homeHeroPrimaryButtonClassName}
        labelClassName={homeHeroActionLabelClassName}
      >
        {t("requestDemo")}
      </PrimaryLink>

      {isAvailableHref(plataformaHref) ? (
        <Link
          data-hero-secondary-cta
          href={plataformaHref}
          className={homeHeroSecondaryButtonClassName}
        >
          {secondaryLabel}
        </Link>
      ) : (
        <span
          data-hero-secondary-cta
          className={homeHeroSecondaryButtonClassName}
          aria-disabled="true"
        >
          {secondaryLabel}
        </span>
      )}
    </div>
  );
}
