export const ATTENDANT_SYSTEM_SCREEN_BADGES = [
  { id: "live-operations", isActive: true },
  { id: "connectors", isActive: false },
  { id: "audit-log", isActive: false },
  { id: "exceptions-panel", isActive: false },
] as const;

export const ATTENDANT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/attendant/system-screens-main.svg",
  width: 1216,
  height: 423,
} as const;

export const ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "connectors",
    src: "/images/products/attendant/system-screens-connectors.svg",
    width: 395,
    height: 273,
  },
  {
    id: "audit-log",
    src: "/images/products/attendant/system-screens-audit-log.svg",
    width: 395,
    height: 273,
  },
  {
    id: "exceptions-panel",
    src: "/images/products/attendant/system-screens-exceptions-panel.svg",
    width: 395,
    height: 275,
  },
] as const;
