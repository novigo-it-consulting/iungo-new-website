export const CONCIERGE_SYSTEM_SCREEN_BADGES = [
  {
    id: "canvas-drag-drop",
    label: "Canvas drag-and-drop",
    isActive: true,
  },
  {
    id: "templates-regua",
    label: "Templates de régua",
    isActive: false,
  },
  {
    id: "ab-test",
    label: "A/B test",
    isActive: false,
  },
  {
    id: "metricas-etapa",
    label: "Métricas por etapa",
    isActive: false,
  },
] as const;

export const CONCIERGE_SYSTEM_SCREEN_CARDS = [
  {
    id: "templates-prontos",
    src: "/images/products/concierge/system-screens-card-1.svg",
    alt: "Templates prontos do Iungo Concierge com 14 réguas validadas no varejo brasileiro",
    width: 395,
    height: 301,
  },
  {
    id: "ab-test-embarcado",
    src: "/images/products/concierge/system-screens-card-2.svg",
    alt: "A/B test embarcado do Iungo Concierge com significância estatística automática",
    width: 395,
    height: 300,
  },
  {
    id: "funil-por-etapa",
    src: "/images/products/concierge/system-screens-card-3.svg",
    alt: "Funil por etapa do Iungo Concierge mostrando onde a régua ganha e onde perde",
    width: 395,
    height: 299,
  },
] as const;
