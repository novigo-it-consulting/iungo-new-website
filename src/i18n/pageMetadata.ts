import type { Metadata } from "next";

import { getSiteUrl } from "@/constants/site";

import { buildPageAlternates, type PageAlternates } from "./alternates";
import { setLocale, type LocaleParams } from "./locale";
import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";

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
