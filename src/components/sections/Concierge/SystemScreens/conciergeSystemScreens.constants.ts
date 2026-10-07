export const CONCIERGE_SYSTEM_SCREEN_BADGES = [
  { id: "canvas-drag-drop", isActive: true },
  { id: "templates-regua", isActive: false },
  { id: "ab-test", isActive: false },
  { id: "metricas-etapa", isActive: false },
] as const;

export const CONCIERGE_SYSTEM_SCREEN_CARDS = [
  {
    id: "templates-prontos",
    src: "/images/products/concierge/system-screens-card-1.svg",
    width: 395,
    height: 301,
  },
  {
    id: "ab-test-embarcado",
    src: "/images/products/concierge/system-screens-card-2.svg",
    width: 395,
    height: 300,
  },
  {
    id: "funil-por-etapa",
    src: "/images/products/concierge/system-screens-card-3.svg",
    width: 395,
    height: 299,
  },
] as const;

export const CONCIERGE_SYSTEM_SCREEN_CANVAS = {
  src: "/images/products/concierge/system-screens-canvas.svg",
  width: 1216,
  height: 408,
} as const;
