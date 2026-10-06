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
