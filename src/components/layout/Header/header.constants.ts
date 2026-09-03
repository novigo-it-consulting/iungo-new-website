import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";

export type NavItem = {
  label: string;
  href: string;
};

export const SOLUCOES_NAV_LABEL = "Soluções";

export const NAV_LINK_ITEMS: NavItem[] = [
  { label: "Plataforma", href: "/plataformas" },
  { label: "Cases", href: "/cases" },
  { label: "Recursos", href: "/recursos" },
];

export const HEADER_BUTTONS = {
  areaCliente: {
    label: "Área do Cliente",
    href: "/area-do-cliente",
  },
  solicitarDemo: {
    label: "Solicitar Demonstração",
    href: SOLICITAR_DEMONSTRACAO_HREF,
  },
} as const;
