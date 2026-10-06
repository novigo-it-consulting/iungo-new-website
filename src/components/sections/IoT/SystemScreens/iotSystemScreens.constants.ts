export const IOT_SYSTEM_SCREEN_BADGES = [
  { id: "map-zones", isActive: true },
  { id: "blind-inventory", isActive: false },
  { id: "geofence-alerts", isActive: false },
  { id: "erp-reconciliation", isActive: false },
] as const;

export const IOT_INACTIVE_BADGE_BORDER = "border-[#B8860B]/35";

export const IOT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/iot/system-screens-main.svg",
  width: 1216,
  height: 365,
} as const;

export const IOT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "blind-inventory",
    src: "/images/products/iot/system-screens-inventory.svg",
    width: 395,
    height: 279,
  },
  {
    id: "geofence-alerts",
    src: "/images/products/iot/system-screens-geofence.svg",
    width: 395,
    height: 279,
  },
  {
    id: "erp-reconciliation",
    src: "/images/products/iot/system-screens-reconciliation.svg",
    width: 395,
    height: 280,
  },
] as const;
