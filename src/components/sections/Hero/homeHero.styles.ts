import { actionButtonGroupGapClassName } from "@/components/ui/actionButtonGroup.styles";
import { solidButtonHoverClassName } from "@/components/ui/buttonInteraction.styles";

export const homeHeroTitleClassName =
  "home-hero-title m-0 w-full min-w-0 font-reddit font-semibold tracking-[-0.01em] text-[#424241] text-[40px] leading-[48px] sm:text-[44px] sm:leading-[52px] md:text-[48px] md:leading-[58px]";

export const homeHeroTitleLineClassName = "home-hero-title-line block";

export const homeHeroDescriptionClassName =
  "home-hero-description m-0 w-full font-reddit font-normal tracking-[0em] text-[#909090] text-sm leading-6 sm:text-[15px] sm:leading-[28px] xl:mt-0";

export const homeHeroSecondaryButtonClassName =
  `inline-flex h-[54.98px] w-full max-w-[253.14px] shrink-0 cursor-pointer items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#687681] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687681] focus-visible:ring-offset-2 sm:w-[253.14px] xl:h-[42px] xl:max-w-[192px] xl:text-[13.63px] xl:leading-[20.8px] 2xl:h-[42px] 2xl:w-[192px] ${solidButtonHoverClassName}`;

/** Texto até 561px; imagem ocupa o restante (máx. 663px). Gap fixo 47px (Figma). */
export const homeHeroRowClassName =
  "grid min-w-0 grid-cols-1 gap-10 xl:grid-cols-[minmax(0,561px)_minmax(0,1fr)] xl:items-start xl:gap-[47px] xl:w-full";

export const homeHeroContentClassName =
  "relative z-10 flex min-w-0 w-full max-w-[561px] flex-col";

export const homeHeroCopyClassName =
  "flex w-full min-w-0 flex-col items-start gap-6 sm:gap-7 xl:gap-[53px]";

export const homeHeroActionsClassName =
  `mt-8 flex w-full flex-col items-start sm:flex-row sm:items-center xl:mt-[65px] ${actionButtonGroupGapClassName}`;

export const homeHeroSectionClassName =
  "relative box-border w-full bg-linear-to-b from-[#FFFFFF] from-0% to-[#DCEBFF] to-100% py-12 md:py-14 xl:pt-16 xl:pb-[56px] 2xl:pt-[71px] 2xl:pb-[56px]";

export const homeHeroVisualClassName =
  "relative mx-auto aspect-[3/2] w-full min-w-0 max-w-[663px] xl:mx-0 xl:w-full xl:max-w-[663px] xl:justify-self-end";

export const homeHeroImageClassName = "object-contain object-right";

export const homeHeroImageSizes =
  "(min-width: 1536px) 663px, (min-width: 1280px) 42vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";

  