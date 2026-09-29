import {
  AREA_CLIENTE_HREF,
  CASES_HREF,
  PLATAFORMA_HREF,
  RECURSOS_HREF,
  SOLICITAR_DEMONSTRACAO_HREF,
} from "@/constants/routes";

export type NavItem = {
  id: "plataforma" | "cases" | "recursos";
  label: string;
  href: string | null;
};

export const SOLUCOES_NAV_LABEL = "Soluções";

export const NAV_LINK_ITEMS: NavItem[] = [
  { id: "plataforma", label: "Plataforma", href: PLATAFORMA_HREF },
  { id: "cases", label: "Cases", href: CASES_HREF },
  { id: "recursos", label: "Recursos", href: RECURSOS_HREF },
];

export const HEADER_BUTTONS = {
  areaCliente: {
    label: "Área do Cliente",
    href: AREA_CLIENTE_HREF,
  },
  solicitarDemo: {
    label: "Solicitar Demonstração",
    href: SOLICITAR_DEMONSTRACAO_HREF,
  },
} as const;
