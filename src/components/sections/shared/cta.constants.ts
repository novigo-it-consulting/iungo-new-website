import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";

/** Rótulo canônico do botão CTA de produto — uma única fonte de verdade. */
export const PRODUCT_PAGE_CTA_LABEL = "Solicitar Demonstração" as const;

/** Botão CTA padrão de produto — label e href compartilhados por todos os produtos. */
export const PRODUCT_PAGE_CTA_BUTTON = {
  label: PRODUCT_PAGE_CTA_LABEL,
  href: SOLICITAR_DEMONSTRACAO_HREF,
} as const;
