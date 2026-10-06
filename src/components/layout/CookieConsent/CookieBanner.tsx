"use client";

import { useTranslations } from "next-intl";

import PageContainer from "@/components/layout/PageContainer";
import {
  cookieBannerAcceptActionClassName,
  cookieBannerActionsClassName,
  cookieBannerContentClassName,
  cookieBannerCopyClassName,
  cookieBannerRegionClassName,
  cookieBannerTextClassName,
  cookieBannerTitleClassName,
  cookieEqualActionClassName,
} from "./cookieConsent.styles";
import { useCookieConsent } from "./CookieConsentContext";

export default function CookieBanner() {
  const { acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();
  const t = useTranslations("cookies");

  return (
    <section
      data-cookie-banner
      className={cookieBannerRegionClassName}
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <PageContainer size="content1264">
        <div className={cookieBannerContentClassName}>
          <div className={cookieBannerCopyClassName}>
            <h2
              id="cookie-banner-title"
              className={cookieBannerTitleClassName}
            >
              {t("banner.title")}
            </h2>
            <p
              id="cookie-banner-description"
              className={cookieBannerTextClassName}
            >
              {t("banner.description")}
            </p>
          </div>

          <div className={cookieBannerActionsClassName}>
            <button
              type="button"
              className={cookieEqualActionClassName}
              aria-haspopup="dialog"
              onClick={(event) => {
                openPreferences(event.currentTarget);
              }}
            >
              {t("actions.personalize")}
            </button>
            <button
              type="button"
              className={cookieEqualActionClassName}
              onClick={rejectNonEssential}
            >
              {t("actions.rejectNonEssential")}
            </button>
            <button
              type="button"
              className={cookieBannerAcceptActionClassName}
              onClick={acceptAll}
            >
              {t("actions.acceptAll")}
            </button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
