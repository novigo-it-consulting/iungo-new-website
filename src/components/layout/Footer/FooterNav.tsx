import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";

import { FOOTER_NAV_GROUPS } from "./footer.constants";

const footerNavItemClassName =
  "inline-block max-w-full cursor-pointer font-reddit text-[14px] font-normal leading-5 text-white/60 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

export default function FooterNav() {
  return (
    <nav
      data-footer-nav
      aria-label="Navegação do rodapé"
      className="mx-auto mt-12 w-full max-w-[1216px] border-y border-white/10 py-12"
    >
      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {FOOTER_NAV_GROUPS.map((group) => (
          <div
            key={group.title}
            data-footer-nav-group={group.title.toLowerCase()}
            className="flex w-full min-w-0 flex-col items-start gap-4"
          >
            <h2 className="m-0 w-full font-reddit text-[14px] font-normal leading-5 text-white">
              {group.title}
            </h2>

            <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">
              {group.links.map((link) => (
                <li key={link.label}>
                  {isAvailableHref(link.href) ? (
                    <Link href={link.href} className={footerNavItemClassName}>
                      {link.label}
                    </Link>
                  ) : (
                    <span className={footerNavItemClassName}>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
