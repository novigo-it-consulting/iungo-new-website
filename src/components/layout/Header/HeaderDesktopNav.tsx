"use client";

import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";

import { NAV_LINK_ITEMS } from "./header.constants";
import {
  headerNavClassName,
  headerNavLinkClassName,
  headerNavListClassName,
} from "./header.styles";
import SolucoesMegaMenuTrigger from "./SolucoesMegaMenu/SolucoesMegaMenuTrigger";

const NAV_ITEM_META: Record<
  (typeof NAV_LINK_ITEMS)[number]["id"],
  { navKey: string; desktopWidth: string }
> = {
  plataforma: { navKey: "plataforma", desktopWidth: "2xl:w-[66px]" },
  cases: { navKey: "cases", desktopWidth: "2xl:w-[36px]" },
  recursos: { navKey: "recursos", desktopWidth: "2xl:w-[55px]" },
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
          const meta = NAV_ITEM_META[item.id];
          const className = `${headerNavLinkClassName} ${meta.desktopWidth}`;

          return (
            <li key={item.id}>
              {isAvailableHref(item.href) ? (
                <Link
                  href={item.href}
                  data-header-nav-item={meta.navKey}
                  className={className}
                >
                  {item.label}
                </Link>
              ) : (
                <span data-header-nav-item={meta.navKey} className={className}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
