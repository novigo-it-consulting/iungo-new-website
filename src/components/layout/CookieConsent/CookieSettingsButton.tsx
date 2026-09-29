"use client";

import {
  COOKIE_SETTINGS_LABEL,
  COOKIE_SETTINGS_TRIGGER_ID,
} from "./cookieConsent.constants";
import { cookieSettingsButtonClassName } from "./cookieConsent.styles";
import { useCookieConsent } from "./CookieConsentContext";

export default function CookieSettingsButton() {
  const { openPreferences } = useCookieConsent();

  return (
    <button
      type="button"
      id={COOKIE_SETTINGS_TRIGGER_ID}
      data-footer-cookie-config
      className={cookieSettingsButtonClassName}
      aria-haspopup="dialog"
      onClick={(event) => {
        openPreferences(event.currentTarget);
      }}
    >
      {COOKIE_SETTINGS_LABEL}
    </button>
  );
}
