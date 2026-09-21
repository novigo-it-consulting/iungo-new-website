import {
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";

export const primaryLinkClassName = [
  "inline-flex h-[54px] w-fit max-w-full shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white",
  primaryFocusVisibleClassName,
  "lg:w-[250px] lg:max-w-[250px] xl:h-[41px] xl:w-[189px] xl:max-w-[189px] xl:text-[13.63px] xl:leading-[20.8px] 2xl:h-[41px] 2xl:w-[189px]",
  solidButtonHoverClassName,
].join(" ");

export const primaryLinkLabelClassName =
  "inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]";