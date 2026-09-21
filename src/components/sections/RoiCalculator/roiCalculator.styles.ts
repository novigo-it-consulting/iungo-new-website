import { solidButtonHoverClassName } from "@/components/ui/buttonInteraction.styles";

const roiCtaBaseClassName = [
  "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[50px]",
  "px-[25.6px] font-reddit text-[15.2px] font-medium leading-[22.8px] tracking-[0]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031358]",
].join(" ");

export const roiPrimaryButtonClassName = [
  roiCtaBaseClassName,
  "bg-white pb-[16.19px] pt-[14.39px] text-[#000D3F]",
  "shadow-[0_1px_2px_rgba(0,13,63,0.06),0_4px_16px_rgba(0,13,63,0.10)]",
  solidButtonHoverClassName,
].join(" ");

export const roiSecondaryButtonClassName = [
  roiCtaBaseClassName,
  "border border-white/[0.18] bg-transparent pb-[15.19px] pt-[13.39px] text-white/90",
  "transition-colors duration-150 hover:border-white/30 hover:bg-white/10 motion-reduce:transition-none",
].join(" ");
