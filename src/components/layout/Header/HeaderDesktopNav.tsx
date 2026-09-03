"use client";

import Link from "next/link";

import { NAV_LINK_ITEMS } from "./header.constants";
import {
  headerNavClassName,
  headerNavLinkClassName,
  headerNavListClassName,
} from "./header.styles";
import SolucoesMegaMenuTrigger from "./SolucoesMegaMenu/SolucoesMegaMenuTrigger";

const NAV_ITEM_META: Record<
  string,
  { navKey: string; desktopWidth: string }
> = {
  "/plataformas": { navKey: "plataforma", desktopWidth: "2xl:w-[66px]" },
  "/cases": { navKey: "cases", desktopWidth: "2xl:w-[36px]" },
  "/recursos": { navKey: "recursos", desktopWidth: "2xl:w-[55px]" },
};

export default function HeaderDesktopNav() {
  return (
    <nav
      data-header-nav
      aria-label="Navegação principal"
      className={headerNavClassName}
    >
      <ul className={headerNavListClassName}>
        <li>
          <SolucoesMegaMenuTrigger />
        </li>
        {NAV_LINK_ITEMS.map((item) => {
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
  );
}
