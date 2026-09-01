export const ATTENDANT_SYSTEM_SCREEN_BADGES = [
  {
    id: "live-operations",
    label: "Operações ao vivo",
    isActive: true,
  },
  {
    id: "connectors",
    label: "Conectores · ERP/OMS",
    isActive: false,
  },
  {
    id: "audit-log",
    label: "Log de auditoria",
    isActive: false,
  },
  {
    id: "exceptions-panel",
    label: "Painel de exceções",
    isActive: false,
  },
] as const;

export const ATTENDANT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/attendant/system-screens-main.svg",
  alt: "Console de operações ao vivo do Iungo Attendant com transações em tempo real.",
  width: 1216,
  height: 423,
} as const;

export const ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "connectors",
    src: "/images/products/attendant/system-screens-connectors.svg",
    alt: "Painel de conectores ERP e OMS do Iungo Attendant.",
    width: 395,
    height: 273,
  },
  {
    id: "audit-log",
    src: "/images/products/attendant/system-screens-audit-log.svg",
    alt: "Log de auditoria do Iungo Attendant com histórico de ações e eventos.",
    width: 395,
    height: 273,
  },
  {
    id: "exceptions-panel",
    src: "/images/products/attendant/system-screens-exceptions-panel.svg",
    alt: "Painel de exceções do Iungo Attendant com alertas e fila de pendências.",
    width: 395,
    height: 275,
  },
] as const;
