export const BEHAVIOR_SYSTEM_SCREEN_BADGES = [
  {
    id: "product-sheet",
    label: "Ficha de produto",
    isActive: true,
  },
  {
    id: "editorial-workflow",
    label: "Workflow editorial",
    isActive: false,
  },
  {
    id: "attributes-taxonomy",
    label: "Atributos & taxonomia",
    isActive: false,
  },
  {
    id: "channels-publication",
    label: "Canais & publicação",
    isActive: false,
  },
] as const;

export const BEHAVIOR_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/behavior/system-screens-main.svg",
  alt: "Tela de produto do Iungo Behavior com atributos, completude do cadastro e canais de publicação.",
  width: 1216,
  height: 439,
} as const;

export const BEHAVIOR_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "editorial-workflow",
    src: "/images/products/behavior/system-screens-workflow.svg",
    alt: "Workflow editorial com etapas de aprovação e status de publicação.",
    width: 395,
    height: 288,
  },
  {
    id: "attributes-taxonomy",
    src: "/images/products/behavior/system-screens-attributes.svg",
    alt: "Atributos e taxonomia do produto organizados por categoria.",
    width: 395,
    height: 289,
  },
  {
    id: "ai-panel",
    src: "/images/products/behavior/system-screens-ai-panel.svg",
    alt: "Painel de IA com sugestões de enriquecimento e inconsistências detectadas.",
    width: 395,
    height: 286,
  },
] as const;
