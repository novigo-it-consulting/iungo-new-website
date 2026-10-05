import {
  ATTENDANT_HREF,
  BEHAVIOR_HREF,
  CASES_HREF,
  CONCIERGE_HREF,
  CONVERT_HREF,
  IOT_HREF,
  ORGANIZER_HREF,
  RESOLVE_HREF,
} from "@/constants/routes";

export type FooterNavLink = {
  label: string;
  href: string | null;
};

export type FooterNavGroup = {
  title: string;
  links: readonly FooterNavLink[];
};

export const FOOTER_COMPLIANCE_BADGES = [
  "LGPD",
  "ISO 27001 · IMPL.",
  "SOC 2 · IMPL.",
] as const;

export const FOOTER_NAV_GROUPS: readonly FooterNavGroup[] = [
  {
    title: "Produtos",
    links: [
      { label: "Iungo Organizer AI PIM", href: ORGANIZER_HREF },
      { label: "Iungo Behavior CDP", href: BEHAVIOR_HREF },
      { label: "Iungo Concierge", href: CONCIERGE_HREF },
      { label: "Iungo Resolve", href: RESOLVE_HREF },
      { label: "Iungo Attendant", href: ATTENDANT_HREF },
      { label: "Iungo Convert", href: CONVERT_HREF },
      { label: "Iungo IoT", href: IOT_HREF },
    ],
  },
  {
    title: "Soluções",
    links: [
      { label: "Commerce Intelligence Suite", href: null },
      { label: "CX AI Agents", href: null },
      { label: "Sales & Connected", href: null },
      { label: "Phygital Intelligence", href: null },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre", href: null },
      { label: "Cases", href: CASES_HREF },
      { label: "Contato", href: null },
      { label: "Carreiras", href: null },
      { label: "Imprensa", href: null },
    ],
  },
  {
    title: "Recursos",
    links: [
      { label: "Blog técnico", href: null },
      { label: "Whitepapers", href: null },
      { label: "Comparativos", href: null },
      { label: "Glossário", href: null },
      { label: "API & Docs", href: null },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "Trust Center", href: null },
      { label: "LGPD & DPO", href: null },
      { label: "Privacidade", href: null },
      { label: "Cookies", href: null },
      { label: "Subprocessadores", href: null },
      { label: "Status", href: null },
    ],
  },
];
