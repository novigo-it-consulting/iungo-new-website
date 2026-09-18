"use client";

import type { ReactNode } from "react";

import CookieBanner from "./CookieBanner";
import {
  CookieConsentStateProvider,
  useCookieConsent,
} from "./CookieConsentContext";
import CookiePreferencesDialog from "./CookiePreferencesDialog";

function CookieConsentUi() {
  const { hydrated, decision } = useCookieConsent();

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {decision === null ? <CookieBanner /> : null}
      <CookiePreferencesDialog />
    </>
  );
}

export function CookieConsentProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <CookieConsentStateProvider>
      {children}
      <CookieConsentUi />
    </CookieConsentStateProvider>
  );
}
