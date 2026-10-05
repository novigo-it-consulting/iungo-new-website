import Image from "next/image";

import LanguageSelectorChevronIcon from "@/components/icons/LanguageSelectorChevronIcon";

import {
  DEFAULT_LANGUAGE_CODE,
  LANGUAGE_SELECTOR_FLAG_SIZE,
  getHeaderLanguage,
} from "./languageSelector.constants";
import {
  languageSelectorButtonClassName,
  languageSelectorChevronClassName,
  languageSelectorFlagClassName,
  languageSelectorLabelClassName,
} from "./languageSelector.styles";

const currentLanguage = getHeaderLanguage(DEFAULT_LANGUAGE_CODE);

export default function LanguageSelector() {
  return (
    <button
      type="button"
      data-header-language-selector
      aria-label={`Idioma: ${currentLanguage.name}`}
      className={languageSelectorButtonClassName}
    >
      <Image
        src={currentLanguage.flagSrc}
        alt=""
        aria-hidden="true"
        width={LANGUAGE_SELECTOR_FLAG_SIZE}
        height={LANGUAGE_SELECTOR_FLAG_SIZE}
        unoptimized
        className={languageSelectorFlagClassName}
      />
      <span className={languageSelectorLabelClassName}>
        {currentLanguage.label}
      </span>
      <LanguageSelectorChevronIcon className={languageSelectorChevronClassName} />
    </button>
  );
}
