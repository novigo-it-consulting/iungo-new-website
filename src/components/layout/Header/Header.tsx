import Link from "next/link";

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

export default function Header() {
  const areaClienteHref = HEADER_BUTTONS.areaCliente.href;

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
                  {HEADER_BUTTONS.areaCliente.label}
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
                  {HEADER_BUTTONS.areaCliente.label}
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
                {HEADER_BUTTONS.solicitarDemo.label}
              </span>
            </Link>
            <LanguageSelector />
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
