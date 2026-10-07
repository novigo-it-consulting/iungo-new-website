import {
  SOLUCOES_COMMERCE_INTELLIGENCE_HREF,
  SOLUCOES_CX_AI_AGENTS_HREF,
  SOLUCOES_SALES_CONNECTED_HREF,
} from "@/constants/routes";

export const SOLUCOES_MEGA_MENU_PANEL_ID = "header-solucoes-mega-menu";

/** Altura mínima provisória do painel — ajustar conforme referência Figma. */
export const SOLUCOES_MEGA_MENU_PANEL_MIN_HEIGHT_PX = 120;

export type SolucoesMegaMenuCategory = {
  readonly id: string;
  readonly badgeKey:
    | "categories.commerceIntelligence.badge"
    | "categories.cxAiAgents.badge"
    | "categories.salesConnected.badge";
  readonly subtitleKey:
    | "categories.commerceIntelligence.subtitle"
    | "categories.cxAiAgents.subtitle"
    | "categories.salesConnected.subtitle";
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
      badgeKey: "categories.commerceIntelligence.badge",
      subtitleKey: "categories.commerceIntelligence.subtitle",
      productIds: ["organizer", "behavior", "concierge"],
      viewSolutionHref: SOLUCOES_COMMERCE_INTELLIGENCE_HREF,
    },
    {
      id: "cx-ai-agents",
      badgeKey: "categories.cxAiAgents.badge",
      subtitleKey: "categories.cxAiAgents.subtitle",
      productIds: ["resolve", "attendant"],
      viewSolutionHref: SOLUCOES_CX_AI_AGENTS_HREF,
    },
    {
      id: "sales-connected",
      badgeKey: "categories.salesConnected.badge",
      subtitleKey: "categories.salesConnected.subtitle",
      productIds: ["convert", "iot"],
      viewSolutionHref: SOLUCOES_SALES_CONNECTED_HREF,
    },
  ] as const;

export const SOLUCOES_MEGA_MENU_FEATURED_CASE_COLUMN_ID = "featured-case";
