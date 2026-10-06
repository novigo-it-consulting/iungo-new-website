export const RESOLVE_SYSTEM_SCREEN_BADGES = [
  { id: "console", isActive: true },
  { id: "training", isActive: false },
  { id: "quality-assurance", isActive: false },
  { id: "supervision-handoff", isActive: false },
] as const;

export const RESOLVE_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/resolve/system-screens-main.svg",
  width: 1216,
  height: 377,
} as const;

export const RESOLVE_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "pim-training",
    src: "/images/products/resolve/system-screens-training.svg",
    width: 395,
    height: 312,
  },
  {
    id: "quality-assurance",
    src: "/images/products/resolve/system-screens-quality-assurance.svg",
    width: 395,
    height: 311,
  },
  {
    id: "supervision-handoff",
    src: "/images/products/resolve/system-screens-supervision-handoff.svg",
    width: 395,
    height: 312,
  },
] as const;
