import { CASES_HREF } from "@/constants/routes";
import { FOOTER_PRODUCT_IDS } from "@/components/sections/Products/products.constants";

export type FooterTextLink = {
  kind: "text";
  id: string;
  messageKey:
    | "solutions.commerceIntelligenceSuite"
    | "solutions.cxAiAgents"
    | "solutions.salesConnected"
    | "solutions.phygitalIntelligence"
    | "company.about"
    | "company.cases"
    | "company.contact"
    | "company.careers"
    | "company.press"
    | "resources.technicalBlog"
    | "resources.whitepapers"
    | "resources.comparisons"
    | "resources.glossary"
    | "resources.apiDocs"
    | "trust.trustCenter"
    | "trust.lgpdDpo"
    | "trust.privacy"
    | "trust.cookies"
    | "trust.subprocessors"
    | "trust.status";
  href: string | null;
};

export type FooterProductLink = {
  kind: "product";
  id: (typeof FOOTER_PRODUCT_IDS)[number];
};

export type FooterNavLink = FooterTextLink | FooterProductLink;

export type FooterNavGroup = {
  id: "products" | "solutions" | "company" | "resources" | "trust";
  dataKey: string;
  titleKey:
    | "columns.products"
    | "columns.solutions"
    | "columns.company"
    | "columns.resources"
    | "columns.trust";
  links: readonly FooterNavLink[];
};

export const FOOTER_BADGE_KEYS = ["badges.lgpd", "badges.iso", "badges.soc2"] as const;

export const FOOTER_NAV_GROUPS: readonly FooterNavGroup[] = [
  {
    id: "products",
    dataKey: "produtos",
    titleKey: "columns.products",
    links: FOOTER_PRODUCT_IDS.map((id) => ({ kind: "product", id }) as const),
  },
  {
    id: "solutions",
    dataKey: "soluções",
    titleKey: "columns.solutions",
    links: [
      { kind: "text", id: "commerce-intelligence-suite", messageKey: "solutions.commerceIntelligenceSuite", href: null },
      { kind: "text", id: "cx-ai-agents", messageKey: "solutions.cxAiAgents", href: null },
      { kind: "text", id: "sales-connected", messageKey: "solutions.salesConnected", href: null },
      { kind: "text", id: "phygital-intelligence", messageKey: "solutions.phygitalIntelligence", href: null },
    ],
  },
  {
    id: "company",
    dataKey: "empresa",
    titleKey: "columns.company",
    links: [
      { kind: "text", id: "about", messageKey: "company.about", href: null },
      { kind: "text", id: "cases", messageKey: "company.cases", href: CASES_HREF },
      { kind: "text", id: "contact", messageKey: "company.contact", href: null },
      { kind: "text", id: "careers", messageKey: "company.careers", href: null },
      { kind: "text", id: "press", messageKey: "company.press", href: null },
    ],
  },
  {
    id: "resources",
    dataKey: "recursos",
    titleKey: "columns.resources",
    links: [
      { kind: "text", id: "technical-blog", messageKey: "resources.technicalBlog", href: null },
      { kind: "text", id: "whitepapers", messageKey: "resources.whitepapers", href: null },
      { kind: "text", id: "comparisons", messageKey: "resources.comparisons", href: null },
      { kind: "text", id: "glossary", messageKey: "resources.glossary", href: null },
      { kind: "text", id: "api-docs", messageKey: "resources.apiDocs", href: null },
    ],
  },
  {
    id: "trust",
    dataKey: "trust",
    titleKey: "columns.trust",
    links: [
      { kind: "text", id: "trust-center", messageKey: "trust.trustCenter", href: null },
      { kind: "text", id: "lgpd-dpo", messageKey: "trust.lgpdDpo", href: null },
      { kind: "text", id: "privacy", messageKey: "trust.privacy", href: null },
      { kind: "text", id: "cookies", messageKey: "trust.cookies", href: null },
      { kind: "text", id: "subprocessors", messageKey: "trust.subprocessors", href: null },
      { kind: "text", id: "status", messageKey: "trust.status", href: null },
    ],
  },
];
