import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { CookieConsentProvider } from "@/components/layout/CookieConsent/CookieConsentProvider";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import { getSiteUrl } from "@/constants/site";
import { getPageAlternates } from "@/i18n/pageMetadata";
import { pickClientMessages } from "@/i18n/clientMessages";
import { setLocale, type LocaleLayoutProps, type LocaleParams } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

import "../globals.css";

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const locale = await setLocale(params);
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: getSiteUrl(),
    title: t("title"),
    description: t("description"),
    alternates: getPageAlternates("/", locale),
  };
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = await setLocale(params);
  const messages = pickClientMessages(await getMessages());

  return (
    <html
      lang={locale}
      className={`${redditSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CookieConsentProvider>
            <Header />
            {children}
            <Footer />
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
