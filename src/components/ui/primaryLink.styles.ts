import {
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";
import { ctaMobileSizeAndTypographyClassName } from "@/components/ui/ctaButton.styles";

export const primaryLinkClassName = [
  // Estrutura e cores (todas as telas)
  "inline-flex w-fit max-w-full shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap text-center font-reddit bg-[#0024AE] text-white",
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
  // Mobile: forma, tipografia e px alinhados ao CtaButton de referência
  ctaMobileSizeAndTypographyClassName,
  "py-[14px]",
  // Desktop: restaura exatamente as dimensões e tipografia aprovadas (lg → xl → 2xl)
  "lg:w-[250px] lg:max-w-[250px]",
  "xl:h-[41px] xl:w-[189px] xl:max-w-[189px] xl:rounded-[57.27px] xl:px-[18.33px] xl:py-[9.16px] xl:text-[13.63px] xl:leading-[20.8px] xl:font-bold",
  "2xl:h-[41px] 2xl:w-[189px]",
].join(" ");

export const primaryLinkLabelClassName =
  "inline-block shrink-0 whitespace-nowrap font-semibold text-white xl:font-bold xl:text-[13.63px] xl:leading-[20.8px]";