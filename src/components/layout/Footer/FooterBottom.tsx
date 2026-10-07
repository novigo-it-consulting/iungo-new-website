import { getTranslations } from "next-intl/server";

import CookieSettingsButton from "@/components/layout/CookieConsent/CookieSettingsButton";

import { FOOTER_BADGE_KEYS } from "./footer.constants";

export default async function FooterBottom() {
  const t = await getTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <div
      data-footer-bottom
      className="mx-auto w-full max-w-[1216px] pt-8"
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-center lg:gap-x-6">
        <div
          data-footer-legal
          className="flex min-w-0 flex-col gap-1 font-reddit text-[12px] font-normal leading-4 text-white/40"
        >
          <p className="m-0">{t("legal.company", { year: currentYear })}</p>
          <p className="m-0">{t("legal.controller")}</p>
        </div>

        <div
          data-footer-compliance
          className="flex min-w-0 flex-wrap items-center justify-start gap-3 lg:justify-end"
        >
          {FOOTER_BADGE_KEYS.map((badgeKey) => (
            <span
              key={badgeKey}
              data-footer-badge={t(badgeKey)}
              className="inline-flex min-h-[25px] shrink-0 items-center justify-center rounded-[4px] border border-white/10 px-2 py-[4px] font-reddit text-[10px] font-normal leading-[15px] text-white/40"
            >
              {t(badgeKey)}
            </span>
          ))}

          <CookieSettingsButton />
        </div>
      </div>
    </div>
  );
}
