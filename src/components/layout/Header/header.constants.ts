import {
  AREA_CLIENTE_HREF,
  CASES_HREF,
  PLATAFORMA_HREF,
  RECURSOS_HREF,
  SOLICITAR_DEMONSTRACAO_HREF,
} from "@/constants/routes";

export const NAV_LINK_ITEMS = [
  { id: "plataforma", labelKey: "nav.platform", href: PLATAFORMA_HREF },
  { id: "cases", labelKey: "nav.cases", href: CASES_HREF },
  { id: "recursos", labelKey: "nav.resources", href: RECURSOS_HREF },
] as const;

const HIDDEN_NAV_LINK_IDS = new Set<(typeof NAV_LINK_ITEMS)[number]["id"]>([
  "plataforma",
  "cases",
  "recursos",
]);

export const VISIBLE_NAV_LINK_ITEMS = NAV_LINK_ITEMS.filter(
  (item) => !HIDDEN_NAV_LINK_IDS.has(item.id),
);

/** Mesmo ponto do `xl:` do Tailwind (80rem). Usado pelo menu mobile e pelo seletor de idioma. */
export const HEADER_DESKTOP_MEDIA_QUERY = "(min-width: 80rem)";

export const HEADER_BUTTONS = {
  areaCliente: {
    labelKey: "actions.clientArea",
    href: AREA_CLIENTE_HREF,
  },
  solicitarDemo: {
    href: SOLICITAR_DEMONSTRACAO_HREF,
  },
} as const;
