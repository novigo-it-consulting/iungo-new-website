import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing, type Locale } from "./routing";

export type LocaleParams = {
  params: Promise<{ locale: string }>;
};

/**
 * Props das páginas em [locale]. O Next 16 gera PageProps globalmente
 * em .next/types/routes.d.ts. Readonly atende a regra de props somente leitura.
 * Todas as rotas locais têm o mesmo params: { locale }.
 */
export type LocalePageProps = Readonly<PageProps<"/[locale]">>;

/** Props do layout [locale], geradas pelo Next como LayoutProps. */
export type LocaleLayoutProps = Readonly<LayoutProps<"/[locale]">>;

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
