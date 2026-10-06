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

export default function RoiCalculatorActions() {
  const plataformaHref = PLATAFORMA_HREF;

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
        Agendar diagnóstico
      </Link>

      {isAvailableHref(plataformaHref) ? (
        <Link
          href={plataformaHref}
          data-roi="cta-secondary"
          className={roiSecondaryButtonClassName}
        >
          Conhecer a plataforma
        </Link>
      ) : (
        <span data-roi="cta-secondary" className={roiSecondaryButtonClassName}>
          Conhecer a plataforma
        </span>
      )}
    </div>
  );
}
