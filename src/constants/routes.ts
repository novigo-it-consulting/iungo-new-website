/** Rota canônica para solicitar demonstração / agendar diagnóstico. */
export const SOLICITAR_DEMONSTRACAO_HREF = "/solicitar-demonstracao" as const;

/**
 * Destinos ainda sem página no App Router.
 * Para reativar um item, substitua `null` pelo path comentado.
 */
export const PLATAFORMA_HREF: string | null = null; // "/plataformas"
export const CASES_HREF: string | null = null; // "/cases"
export const RECURSOS_HREF: string | null = null; // "/recursos"
export const AREA_CLIENTE_HREF: string | null = null; // "/area-do-cliente"

/** Destinos do link “Ver solução completa” no mega menu. */
export const SOLUCOES_COMMERCE_INTELLIGENCE_HREF: string | null = null; // "/solucoes/commerce-intelligence"
export const SOLUCOES_CX_AI_AGENTS_HREF: string | null = null; // "/solucoes/cx-ai-agents"
export const SOLUCOES_SALES_CONNECTED_HREF: string | null = null; // "/solucoes/sales-connected"

export function isAvailableHref(
  href: string | null | undefined,
): href is string {
  return typeof href === "string" && href.length > 0 && href !== "#";
}
