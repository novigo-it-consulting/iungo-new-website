export const HEADER_LANGUAGES = [
  {
    code: "pt-BR",
    label: "BR",
    name: "Português",
    flagSrc: "/images/flags/pt-BR.svg",
  },
] as const;

type HeaderLanguage = (typeof HEADER_LANGUAGES)[number];
type HeaderLanguageCode = HeaderLanguage["code"];

export const DEFAULT_LANGUAGE_CODE: HeaderLanguageCode = "pt-BR";

export const LANGUAGE_SELECTOR_FLAG_SIZE = 25;

export function getHeaderLanguage(code: HeaderLanguageCode): HeaderLanguage {
  const language = HEADER_LANGUAGES.find((item) => item.code === code);

  if (language === undefined) {
    throw new Error(`Idioma não cadastrado: ${code}`);
  }

  return language;
}
