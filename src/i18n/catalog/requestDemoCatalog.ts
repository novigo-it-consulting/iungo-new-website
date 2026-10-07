import type { Locale } from "@/i18n/routing";

import ptRequestDemo from "@/messages/pt-BR/requestDemo.json";
import enRequestDemo from "@/messages/en/requestDemo.json";
import esRequestDemo from "@/messages/es/requestDemo.json";

const ptBR = ptRequestDemo;

export const requestDemoCatalog = {
  "pt-BR": ptBR,
  en: enRequestDemo satisfies typeof ptBR,
  es: esRequestDemo satisfies typeof ptBR,
};

export type RequestDemoMessages = typeof ptBR;

export function pickRequestDemoMessages(locale: Locale): RequestDemoMessages {
  return requestDemoCatalog[locale];
}
