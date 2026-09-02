import type { ProductSystemScreenBadgeItem } from "@/components/sections/shared/SystemScreens/productSystemScreens.types";

export const IOT_SYSTEM_SCREEN_BADGES: readonly ProductSystemScreenBadgeItem[] =
  [
    {
      id: "map-zones",
      label: "Mapa - zonas",
      isActive: true,
    },
    {
      id: "blind-inventory",
      label: "Inventário cego - app",
      isActive: false,
    },
    {
      id: "geofence-alerts",
      label: "Geofence & alertas",
      isActive: false,
    },
    {
      id: "erp-reconciliation",
      label: "Conciliação - ERP",
      isActive: false,
    },
  ];

export const IOT_SYSTEM_SCREENS_HEADER = {
  title: "O Asset Cloud que une RFID, BLE, LoRa e GPS.",
  description:
    "Mapa de zonas, inventário cego mobile, geofence e conciliação patrimonial em SAP.",
} as const;

export const IOT_INACTIVE_BADGE_BORDER = "border-[#B8860B]/35";

export const IOT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/iot/system-screens-main.svg",
  alt: "Mapa de zonas do Iungo Asset Cloud com eventos em tempo real.",
  width: 1216,
  height: 365,
} as const;

export const IOT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "blind-inventory",
    src: "/images/products/iot/system-screens-inventory.svg",
    alt: "App de inventário cego do Iungo Asset Cloud com divergências em destaque.",
    width: 395,
    height: 279,
  },
  {
    id: "geofence-alerts",
    src: "/images/products/iot/system-screens-geofence.svg",
    alt: "Configurador de geofence do Iungo Asset Cloud com regras e alertas.",
    width: 395,
    height: 279,
  },
  {
    id: "erp-reconciliation",
    src: "/images/products/iot/system-screens-reconciliation.svg",
    alt: "Conciliação patrimonial SAP do Iungo Asset Cloud com acurácia e divergências.",
    width: 395,
    height: 280,
  },
] as const;
