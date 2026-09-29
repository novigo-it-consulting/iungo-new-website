"use client";

import PageContainer from "@/components/layout/PageContainer";

import {
  COOKIE_ACCEPT_ALL_LABEL,
  COOKIE_BANNER_DESCRIPTION,
  COOKIE_BANNER_TITLE,
  COOKIE_PERSONALIZE_LABEL,
  COOKIE_REJECT_NON_ESSENTIAL_LABEL,
} from "./cookieConsent.constants";
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
              {COOKIE_BANNER_TITLE}
            </h2>
            <p
              id="cookie-banner-description"
              className={cookieBannerTextClassName}
            >
              {COOKIE_BANNER_DESCRIPTION}
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
              {COOKIE_PERSONALIZE_LABEL}
            </button>
            <button
              type="button"
              className={cookieEqualActionClassName}
              onClick={rejectNonEssential}
            >
              {COOKIE_REJECT_NON_ESSENTIAL_LABEL}
            </button>
            <button
              type="button"
              className={cookieBannerAcceptActionClassName}
              onClick={acceptAll}
            >
              {COOKIE_ACCEPT_ALL_LABEL}
            </button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
