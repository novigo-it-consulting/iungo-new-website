export const HEADER_LANGUAGES = [
  {
    code: "pt-BR",
    label: "PT",
    name: "Português",
    flagSrc: "/images/flags/pt-BR.svg",
  },
  {
    code: "en",
    label: "EN",
    name: "English",
    flagSrc: "/images/flags/en.svg",
  },
  {
    code: "es",
    label: "ES",
    name: "Español",
    flagSrc: "/images/flags/es.svg",
  },
] as const;

export type HeaderLanguage = (typeof HEADER_LANGUAGES)[number];
export type HeaderLanguageCode = HeaderLanguage["code"];

export const DEFAULT_LANGUAGE_CODE: HeaderLanguageCode = "pt-BR";

export const LANGUAGE_SELECTOR_FLAG_SIZE = 25;

export const LANGUAGE_SELECTOR_LIST_ID = "header-language-list";

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
