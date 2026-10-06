import type { Locale } from "./routing";
import type { MessageNamespace } from "./namespaces";

import ptMetadata from "@/messages/pt-BR/metadata.json";
import ptHeader from "@/messages/pt-BR/header.json";
import ptMegaMenu from "@/messages/pt-BR/megaMenu.json";
import ptMobileNav from "@/messages/pt-BR/mobileNav.json";
import ptFooter from "@/messages/pt-BR/footer.json";
import ptFooterNewsletter from "@/messages/pt-BR/footerNewsletter.json";
import ptCookies from "@/messages/pt-BR/cookies.json";
import ptLanguageSelector from "@/messages/pt-BR/languageSelector.json";
import ptProducts from "@/messages/pt-BR/products.json";
import { homeCatalog } from "@/i18n/catalog/homeCatalog";
import { productPagesCatalog } from "@/i18n/catalog/productPagesCatalog";

import enMetadata from "@/messages/en/metadata.json";
import enHeader from "@/messages/en/header.json";
import enMegaMenu from "@/messages/en/megaMenu.json";
import enMobileNav from "@/messages/en/mobileNav.json";
import enFooter from "@/messages/en/footer.json";
import enFooterNewsletter from "@/messages/en/footerNewsletter.json";
import enCookies from "@/messages/en/cookies.json";
import enLanguageSelector from "@/messages/en/languageSelector.json";
import enProducts from "@/messages/en/products.json";

import esMetadata from "@/messages/es/metadata.json";
import esHeader from "@/messages/es/header.json";
import esMegaMenu from "@/messages/es/megaMenu.json";
import esMobileNav from "@/messages/es/mobileNav.json";
import esFooter from "@/messages/es/footer.json";
import esFooterNewsletter from "@/messages/es/footerNewsletter.json";
import esCookies from "@/messages/es/cookies.json";
import esLanguageSelector from "@/messages/es/languageSelector.json";
import esProducts from "@/messages/es/products.json";

const ptBRMessages = {
  metadata: ptMetadata,
  header: ptHeader,
  megaMenu: ptMegaMenu,
  mobileNav: ptMobileNav,
  footer: ptFooter,
  footerNewsletter: ptFooterNewsletter,
  cookies: ptCookies,
  languageSelector: ptLanguageSelector,
  products: ptProducts,
  common: homeCatalog["pt-BR"].common,
  home: homeCatalog["pt-BR"].home,
  productPages: productPagesCatalog["pt-BR"],
} satisfies Record<MessageNamespace, unknown>;

export type AppMessages = typeof ptBRMessages;

const enMessages = {
  metadata: enMetadata,
  header: enHeader,
  megaMenu: enMegaMenu,
  mobileNav: enMobileNav,
  footer: enFooter,
  footerNewsletter: enFooterNewsletter,
  cookies: enCookies,
  languageSelector: enLanguageSelector,
  products: enProducts,
  common: homeCatalog.en.common,
  home: homeCatalog.en.home,
  productPages: productPagesCatalog.en,
} satisfies AppMessages;

const esMessages = {
  metadata: esMetadata,
  header: esHeader,
  megaMenu: esMegaMenu,
  mobileNav: esMobileNav,
  footer: esFooter,
  footerNewsletter: esFooterNewsletter,
  cookies: esCookies,
  languageSelector: esLanguageSelector,
  products: esProducts,
  common: homeCatalog.es.common,
  home: homeCatalog.es.home,
  productPages: productPagesCatalog.es,
} satisfies AppMessages;

const catalogs: Record<Locale, AppMessages> = {
  "pt-BR": ptBRMessages,
  en: enMessages,
  es: esMessages,
};

export function loadMessages(locale: Locale): AppMessages {
  return catalogs[locale];
}
