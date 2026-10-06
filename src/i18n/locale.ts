import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type Locale } from "./routing";

export type LocaleParams = {
  params: Promise<{ locale: string }>;
};

export async function setLocale(
  params: Promise<{ locale: string }>,
): Promise<Locale> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return locale;
}
