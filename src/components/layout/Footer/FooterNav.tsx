import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { isAvailableHref } from "@/constants/routes";
import {
  getProductById,
  getProductFooterName,
} from "@/components/sections/Products/products.constants";

import { FOOTER_NAV_GROUPS, type FooterNavLink } from "./footer.constants";

const footerNavItemClassName =
  "inline-block max-w-full cursor-pointer font-reddit text-[14px] font-normal leading-5 text-white/60 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

function FooterNavItem({
  link,
  label,
}: Readonly<{ link: FooterNavLink; label: string }>) {
  const href = link.kind === "product" ? getProductById(link.id).ctaHref : link.href;

  if (isAvailableHref(href)) {
    return (
      <Link href={href} className={footerNavItemClassName}>
        {label}
      </Link>
    );
  }

  return <span className={footerNavItemClassName}>{label}</span>;
}

export default async function FooterNav() {
  const t = await getTranslations("footer");

  return (
    <nav
      data-footer-nav
      aria-label={t("navLabel")}
      className="mx-auto mt-12 w-full max-w-[1216px] border-y border-white/10 py-12"
    >
      <div className="grid w-full grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {FOOTER_NAV_GROUPS.map((group) => (
          <div
            key={group.id}
            data-footer-nav-group={group.dataKey}
            className="flex w-full min-w-0 flex-col items-start gap-4"
          >
            <h2 className="m-0 w-full font-reddit text-[14px] font-normal leading-5 text-white">
              {t(group.titleKey)}
            </h2>

            <ul className="m-0 flex w-full list-none flex-col gap-2 p-0">
              {group.links.map((link) => {
                const label =
                  link.kind === "product"
                    ? getProductFooterName(link.id)
                    : t(link.messageKey);

                return (
                  <li key={link.id}>
                    <FooterNavItem link={link} label={label} />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
