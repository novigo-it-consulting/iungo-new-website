import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import * as rootParams from "next/root-params";
import { notFound } from "next/navigation";

import { loadMessages } from "./loadMessages";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  const requested = locale ?? (await rootParams.locale());

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: loadMessages(requested),
  };
});
