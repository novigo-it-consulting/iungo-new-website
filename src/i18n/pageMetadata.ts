import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getSiteUrl } from "@/constants/site";

import { buildPageAlternates, type PageAlternates } from "./alternates";
import { setLocale, type LocaleParams } from "./locale";
import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";

const HERO_PAGE_NAMESPACES = [
  "productPages.organizer",
  "productPages.behavior",
  "productPages.concierge",
  "productPages.resolve",
  "productPages.attendant",
  "productPages.convert",
  "productPages.iot",
] as const;

export type HeroPageNamespace = (typeof HERO_PAGE_NAMESPACES)[number];

function plainMessage(value: string): string {
  return value.replaceAll(/<[^>]+>/g, " ").replaceAll(/\s+/g, " ").trim();
}

export function getPageAlternates(
  pathname: string,
  locale: Locale,
): PageAlternates {
  const localizedPaths: Partial<Record<Locale, string>> = {};

  for (const targetLocale of routing.locales) {
    localizedPaths[targetLocale] = getPathname({
      href: pathname,
      locale: targetLocale,
    });
  }

  return buildPageAlternates(localizedPaths, locale, getSiteUrl());
}

export async function createPageMetadata(
  params: LocaleParams["params"],
  pathname: string,
  metadata: Metadata = {},
): Promise<Metadata> {
  const locale = await setLocale(params);

  return {
    ...metadata,
    alternates: getPageAlternates(pathname, locale),
  };
}

export async function createHeroPageMetadata(
  params: LocaleParams["params"],
  pathname: string,
  namespace: HeroPageNamespace,
): Promise<Metadata> {
  const locale = await setLocale(params);
  const page = await getTranslations({ locale, namespace });
  const site = await getTranslations({ locale, namespace: "metadata" });

  return createPageMetadata(params, pathname, {
    title: `${page("hero.title")} | ${site("title")}`,
    description: plainMessage(page("hero.description")),
  });
}
