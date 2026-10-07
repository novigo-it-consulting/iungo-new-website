import {
  homeSectionSubtitleMobileClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export const BEHAVIOR_INACTIVE_BADGE_BORDER = "border-[#E4E4E7]";

export const BEHAVIOR_SYSTEM_SCREEN_HEADER_CLASS_NAMES = {
  container: "mx-auto flex w-full max-w-[723px] flex-col gap-3 text-center",
  title: [productSectionTitleClassName, "tracking-normal xl:leading-[43px]"].join(
    " ",
  ),
  description: [
    "m-0 mx-auto w-full max-w-[579px] font-reddit font-normal tracking-normal text-[#71717A]",
    homeSectionSubtitleMobileClassName,
    "xl:text-[17px] xl:leading-[26px]",
  ].join(" "),
};

export const BEHAVIOR_SYSTEM_SCREEN_BADGES = [
  { id: "profile-360", isActive: true },
  { id: "live-segments", isActive: false },
  { id: "stream-events", isActive: false },
  { id: "activations", isActive: false },
] as const;

export const BEHAVIOR_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/behavior/system-screens/system-screens-main.svg",
  width: 1306,
  height: 430,
} as const;

export const BEHAVIOR_SYSTEM_SCREEN_GRID = [
  {
    id: "segment-builder",
    src: "/images/products/behavior/system-screens/system-screens-segment-builder.svg",
    width: 395,
    height: 288,
  },
  {
    id: "unified-identity",
    src: "/images/products/behavior/system-screens/system-screens-identity.svg",
    width: 395,
    height: 288,
  },
  {
    id: "activation-destinations",
    src: "/images/products/behavior/system-screens/system-screens-destinations.svg",
    width: 395,
    height: 288,
  },
] as const;
