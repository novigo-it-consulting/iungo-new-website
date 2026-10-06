import { routing, type Locale } from "@/i18n/routing";

const LANGUAGE_PRESENTATION = {
  "pt-BR": {
    label: "PT",
    name: "Português",
    flagSrc: "/images/flags/pt-BR.svg",
  },
  en: {
    label: "EN",
    name: "English",
    flagSrc: "/images/flags/en.svg",
  },
  es: {
    label: "ES",
    name: "Español",
    flagSrc: "/images/flags/es.svg",
  },
} as const satisfies Record<
  Locale,
  { label: string; name: string; flagSrc: string }
>;

export const HEADER_LANGUAGES = routing.locales.map((code) => ({
  code,
  ...LANGUAGE_PRESENTATION[code],
}));

export type HeaderLanguage = (typeof HEADER_LANGUAGES)[number];
export type HeaderLanguageCode = Locale;

export const LANGUAGE_SELECTOR_FLAG_SIZE = 25;

export function getHeaderLanguage(code: HeaderLanguageCode): HeaderLanguage {
  const language = HEADER_LANGUAGES.find((item) => item.code === code);

  if (language === undefined) {
    throw new Error(`Idioma não cadastrado: ${code}`);
  }

  return language;
}

export function getOtherHeaderLanguages(
  code: HeaderLanguageCode,
): HeaderLanguage[] {
  return HEADER_LANGUAGES.filter((item) => item.code !== code);
}
