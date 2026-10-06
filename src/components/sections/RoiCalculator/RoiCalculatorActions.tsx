import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import {
  isAvailableHref,
  PLATAFORMA_HREF,
  SOLICITAR_DEMONSTRACAO_HREF,
} from "@/constants/routes";
import { actionButtonGroupGapClassName } from "@/components/ui/actionButtonGroup.styles";

import {
  roiPrimaryButtonClassName,
  roiSecondaryButtonClassName,
} from "./roiCalculator.styles";

export default async function RoiCalculatorActions() {
  const t = await getTranslations("common");
  const plataformaHref = PLATAFORMA_HREF;
  const platformLabel = t("knowThePlatform");

  return (
    <div
      data-roi="actions"
      className={`flex w-full flex-col items-center justify-center sm:flex-row ${actionButtonGroupGapClassName}`}
    >
      <Link
        href={SOLICITAR_DEMONSTRACAO_HREF}
        data-roi="cta-primary"
        className={roiPrimaryButtonClassName}
      >
        {t("scheduleDiagnosis")}
      </Link>

      {isAvailableHref(plataformaHref) ? (
        <Link
          href={plataformaHref}
          data-roi="cta-secondary"
          className={roiSecondaryButtonClassName}
        >
          {platformLabel}
        </Link>
      ) : (
        <span data-roi="cta-secondary" className={roiSecondaryButtonClassName}>
          {platformLabel}
        </span>
      )}
    </div>
  );
}
