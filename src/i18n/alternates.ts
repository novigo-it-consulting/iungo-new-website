import { routing, type Locale } from "./routing";

export type PageAlternates = {
  canonical: string;
  languages: Record<string, string>;
};

export function buildPageAlternates(
  localizedPaths: Partial<Record<Locale, string>>,
  locale: Locale,
  siteUrl: URL,
): PageAlternates {
  const languages: Record<string, string> = {};

  for (const targetLocale of routing.locales) {
    const localizedPath = localizedPaths[targetLocale];

    if (!localizedPath) {
      throw new Error(`Path ausente para ${targetLocale}.`);
    }

    languages[targetLocale] = new URL(localizedPath, siteUrl).toString();
  }

  const canonical = languages[locale];
  const xDefault = languages[routing.defaultLocale];

  if (!canonical || !xDefault) {
    throw new Error(`Alternates ausentes para o locale ${locale}.`);
  }

  return {
    canonical,
    languages: {
      ...languages,
      "x-default": xDefault,
    },
  };
}
