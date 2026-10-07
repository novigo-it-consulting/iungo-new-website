export const ORGANIZER_INACTIVE_BADGE_BORDER = "border-[#1E9F67]/30";

export const ORGANIZER_SYSTEM_SCREEN_BADGES = [
  { id: "product-sheet", isActive: true },
  { id: "editorial-workflow", isActive: false },
  { id: "attributes-taxonomy", isActive: false },
  { id: "channels-publication", isActive: false },
] as const;

export const ORGANIZER_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/organizer/system-screens/system-screens-main.svg",
  width: 1216,
  height: 439,
} as const;

export const ORGANIZER_SYSTEM_SCREEN_GRID = [
  {
    id: "editorial-workflow",
    src: "/images/products/organizer/system-screens/system-screens-workflow.svg",
    width: 395,
    height: 288,
  },
  {
    id: "attributes-taxonomy",
    src: "/images/products/organizer/system-screens/system-screens-attributes.svg",
    width: 395,
    height: 289,
  },
  {
    id: "ai-panel",
    src: "/images/products/organizer/system-screens/system-screens-ai-panel.svg",
    width: 395,
    height: 286,
  },
] as const;
