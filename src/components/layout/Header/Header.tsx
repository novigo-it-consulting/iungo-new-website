import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { isAvailableHref } from "@/constants/routes";

import { HEADER_BUTTONS } from "./header.constants";
import HeaderShell from "./HeaderShell";
import LanguageSelector from "./LanguageSelector";
import {
  headerActionsClassName,
  headerButtonLabelClassName,
  headerClientButtonClassName,
  headerDemoButtonClassName,
} from "./header.styles";

export default async function Header() {
  const t = await getTranslations("header");
  const tCommon = await getTranslations("common");
  const areaClienteHref = HEADER_BUTTONS.areaCliente.href;
  const clientAreaLabel = t(HEADER_BUTTONS.areaCliente.labelKey);
  const requestDemoLabel = tCommon("requestDemo");

  return (
    <header
      data-header
      data-page-rail-section="header"
      className="relative z-50 min-w-0 bg-white"
    >
      <HeaderShell
        actions={
          <div data-header-actions className={headerActionsClassName}>
            {isAvailableHref(areaClienteHref) ? (
              <Link
                data-header-client-button
                href={areaClienteHref}
                className={headerClientButtonClassName}
              >
                <span
                  data-header-action-label="client-area"
                  className={headerButtonLabelClassName}
                >
                  {clientAreaLabel}
                </span>
              </Link>
            ) : (
              <span
                data-header-client-button
                className={headerClientButtonClassName}
              >
                <span
                  data-header-action-label="client-area"
                  className={headerButtonLabelClassName}
                >
                  {clientAreaLabel}
                </span>
              </span>
            )}
            <Link
              data-header-demo-button
              href={HEADER_BUTTONS.solicitarDemo.href}
              className={headerDemoButtonClassName}
            >
              <span
                data-header-action-label="demonstration"
                className={headerButtonLabelClassName}
              >
                {requestDemoLabel}
              </span>
            </Link>
            <LanguageSelector instance="desktop" />
          </div>
        }
      />

      <div
        data-header-divider
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-[calc(100%_-_32px)] max-w-[1600px] -translate-x-1/2 bg-[#ECECEC] md:w-[calc(100%_-_64px)]"
      />
    </header>
  );
}
