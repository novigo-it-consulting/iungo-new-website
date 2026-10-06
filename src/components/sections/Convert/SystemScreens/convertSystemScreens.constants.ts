export const CONVERT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/convert/system-screens-main.svg",
  width: 1216,
  height: 352,
} as const;

export const CONVERT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "conversa-ao-vivo",
    src: "/images/products/convert/system-screens-conversation.svg",
    width: 395,
    height: 325,
  },
  {
    id: "briefing-pro-vendedor",
    src: "/images/products/convert/system-screens-briefing.svg",
    width: 395,
    height: 326,
  },
  {
    id: "performance-do-time",
    src: "/images/products/convert/system-screens-performance.svg",
    width: 395,
    height: 326,
  },
] as const;

export const CONVERT_SYSTEM_SCREEN_BADGES = [
  { id: "pipeline-ia", isActive: true },
  { id: "conversa-em-curso", isActive: false },
  { id: "briefing-handoff", isActive: false },
  { id: "performance-vendedor", isActive: false },
] as const;
