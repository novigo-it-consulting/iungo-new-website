import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, HEADER_BUTTONS } from "./header.constants";
import {
  headerActionsClassName,
  headerButtonLabelClassName,
  headerClientButtonClassName,
  headerDemoButtonClassName,
  headerFrameClassName,
  headerNavClassName,
  headerNavLinkClassName,
  headerNavListClassName,
} from "./header.styles";
import MobileNavigation from "./MobileNavigation";

const NAV_ITEM_META: Record<
  string,
  { navKey: string; desktopWidth: string }
> = {
  "/solucoes": { navKey: "solucoes", desktopWidth: "2xl:w-[55px]" },
  "/plataformas": { navKey: "plataforma", desktopWidth: "2xl:w-[66px]" },
  "/cases": { navKey: "cases", desktopWidth: "2xl:w-[36px]" },
  "/recursos": { navKey: "recursos", desktopWidth: "2xl:w-[55px]" },
};

export default function Header() {
  return (
    <header
      data-header
      data-page-rail-section="header"
      className="relative bg-white"
    >
      <div data-header-frame className={headerFrameClassName}>
        <div
          data-header-content
          data-page-main-content="header"
          className="flex h-full min-w-0 items-center justify-between gap-4 xl:gap-6 2xl:gap-8"
        >
          <Link
            data-header-logo
            data-page-content-anchor="header"
            href="/"
            aria-label="Iungo Intelligence — página inicial"
            className="block shrink-0 2xl:h-[42.4px] 2xl:w-[118.87px]"
          >
            <Image
              src="/images/logo.png"
              alt="Iungo Intelligence"
              width={157}
              height={56}
              className="h-auto w-[130px] object-contain sm:w-[145px] xl:w-[150px] 2xl:h-full 2xl:w-full 2xl:max-w-[157px]"
              priority
            />
          </Link>

          <nav
            data-header-nav
            aria-label="Navegação principal"
            className={headerNavClassName}
          >
            <ul className={headerNavListClassName}>
              {NAV_ITEMS.map((item) => {
                const meta = NAV_ITEM_META[item.href];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-header-nav-item={meta?.navKey}
                      className={`${headerNavLinkClassName} ${meta?.desktopWidth ?? ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div data-header-actions className={headerActionsClassName}>
            <Link
              data-header-client-button
              href={HEADER_BUTTONS.areaCliente.href}
              className={headerClientButtonClassName}
            >
              <span
                data-header-action-label="client-area"
                className={headerButtonLabelClassName}
              >
                {HEADER_BUTTONS.areaCliente.label}
              </span>
            </Link>
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
          </div>

          <MobileNavigation />
        </div>
      </div>

      <div
        data-header-divider
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-[calc(100%_-_32px)] max-w-[1600px] -translate-x-1/2 bg-[#ECECEC] md:w-[calc(100%_-_64px)]"
      />
    </header>
  );
}
