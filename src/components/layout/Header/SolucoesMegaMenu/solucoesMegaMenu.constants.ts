import {
  SOLUCOES_COMMERCE_INTELLIGENCE_HREF,
  SOLUCOES_CX_AI_AGENTS_HREF,
  SOLUCOES_SALES_CONNECTED_HREF,
} from "@/constants/routes";

export const SOLUCOES_MEGA_MENU_PANEL_ID = "header-solucoes-mega-menu";

/** Altura mínima provisória do painel — ajustar conforme referência Figma. */
export const SOLUCOES_MEGA_MENU_PANEL_MIN_HEIGHT_PX = 120;

export const SOLUCOES_MEGA_MENU_VIEW_SOLUTION_LABEL = "Ver solução completa";

export type SolucoesMegaMenuCategory = {
  readonly id: string;
  readonly badge: string;
  readonly subtitle: string;
  readonly productIds: readonly (
    | "organizer"
    | "behavior"
    | "concierge"
    | "resolve"
    | "attendant"
    | "convert"
    | "iot"
  )[];
  /** Destino do link “Ver solução completa”. */
  readonly viewSolutionHref: string | null;
};

export const SOLUCOES_MEGA_MENU_CATEGORIES: readonly SolucoesMegaMenuCategory[] =
  [
    {
      id: "commerce-intelligence",
      badge: "COMMERCE INTELLIGENCE",
      subtitle:
        "Catálogo, dados de cliente e jornadas — no mesmo motor de IA.",
      productIds: ["organizer", "behavior", "concierge"],
      viewSolutionHref: SOLUCOES_COMMERCE_INTELLIGENCE_HREF,
    },
    {
      id: "cx-ai-agents",
      badge: "CX AI AGENTS",
      subtitle:
        "Atendimento e operação automatizados — com auditoria total.",
      productIds: ["resolve", "attendant"],
      viewSolutionHref: SOLUCOES_CX_AI_AGENTS_HREF,
    },
    {
      id: "sales-connected",
      badge: "SALES & CONNECTED",
      subtitle:
        "Venda conversacional e ativos físicos no mesmo tecido de dados.",
      productIds: ["convert", "iot"],
      viewSolutionHref: SOLUCOES_SALES_CONNECTED_HREF,
    },
  ] as const;

export const SOLUCOES_MEGA_MENU_FEATURED_CASE_COLUMN_ID = "featured-case";
