export const RESOLVE_SYSTEM_SCREEN_BADGES = [
  {
    id: "console",
    label: "Console de atendimento",
    isActive: true,
  },
  {
    id: "training",
    label: "Treinamento via PIM",
    isActive: false,
  },
  {
    id: "quality-assurance",
    label: "Quality assurance",
    isActive: false,
  },
  {
    id: "supervision-handoff",
    label: "Supervisão · handoff",
    isActive: false,
  },
] as const;

export const RESOLVE_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/resolve/system-screens-main.svg",
  alt: "Console do Iungo Resolve com conversas ao vivo e indicadores de atendimento.",
  width: 1216,
  height: 377,
} as const;

export const RESOLVE_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "pim-training",
    src: "/images/products/resolve/system-screens-training.svg",
    alt: "Treinamento via PIM com FAQs de produto e respostas grounded no catálogo.",
    width: 395,
    height: 312,
  },
  {
    id: "quality-assurance",
    src: "/images/products/resolve/system-screens-quality-assurance.svg",
    alt: "Painel de quality assurance com revisão de FAQs e status de aprovação.",
    width: 395,
    height: 311,
  },
  {
    id: "supervision-handoff",
    src: "/images/products/resolve/system-screens-supervision-handoff.svg",
    alt: "Painel de supervisão e handoff com conversas em transferência e status de atendimento.",
    width: 395,
    height: 312,
  },
] as const;
