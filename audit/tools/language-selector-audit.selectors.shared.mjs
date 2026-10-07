/**
 * Seletores e constantes do seletor de idioma no Header.
 */
export const LANGUAGE_LIST_LAYOUT_MS = 250;
export const FOOTER_LOGO_WIDTH_PX = 127.13;
export const XL_MIN_WIDTH_PX = 1280;
export const POSITION_TOLERANCE_DESKTOP_PX = 1;
export const POSITION_TOLERANCE_MOBILE_PX = 1.5;

export const LANGUAGE_SELECTOR = {
  header: "[data-header]",
  headerLogo: "[data-header-logo]",
  footerLogoImg: "[data-footer-logo] img",
  menuToggle: "[data-mobile-navigation-toggle]",
  menuPanel: "#mobile-navigation-menu",
  desktopInstance: '[data-header-language-instance="desktop"]',
  mobileInstance: '[data-header-language-instance="mobile"]',
  trigger: "[data-header-language-selector]",
  list: "[data-header-language-list]",
  openColumn: "[data-header-language-open-column]",
  option: "[data-header-language-option]",
  optionEn: '[data-header-language-option="en"]',
  optionPt: '[data-header-language-option="pt-BR"]',
  flag: "[data-header-language-flag]",
  chevron: "[data-header-language-chevron]",
};

export const DESKTOP_TRIGGER = `${LANGUAGE_SELECTOR.desktopInstance} ${LANGUAGE_SELECTOR.trigger}`;
export const DESKTOP_LIST = `${LANGUAGE_SELECTOR.desktopInstance} ${LANGUAGE_SELECTOR.list}`;
export const DESKTOP_OPTION_EN = `${LANGUAGE_SELECTOR.desktopInstance} ${LANGUAGE_SELECTOR.optionEn}`;
export const DESKTOP_OPTION_PT = `${LANGUAGE_SELECTOR.desktopInstance} ${LANGUAGE_SELECTOR.optionPt}`;
export const DESKTOP_COLUMN = `${LANGUAGE_SELECTOR.desktopInstance} ${LANGUAGE_SELECTOR.openColumn}`;
export const MOBILE_TRIGGER = `${LANGUAGE_SELECTOR.mobileInstance} ${LANGUAGE_SELECTOR.trigger}`;
export const MOBILE_LIST = `${LANGUAGE_SELECTOR.mobileInstance} ${LANGUAGE_SELECTOR.list}`;
export const MOBILE_OPTION_EN = `${LANGUAGE_SELECTOR.mobileInstance} ${LANGUAGE_SELECTOR.optionEn}`;
export const MOBILE_OPTION_PT = `${LANGUAGE_SELECTOR.mobileInstance} ${LANGUAGE_SELECTOR.optionPt}`;
