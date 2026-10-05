import { actionButtonPairClassName } from "@/components/ui/actionButtonGroup.styles";
import {
  mutedFocusVisibleClassName,
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";
import {
  homeSectionSubtitleMobileClassName,
  pageHeroTitleMobileClassName,
} from "@/components/ui/sectionTitle.styles";

export const homeHeroTitleClassName = [
  "home-hero-title m-0 w-full min-w-0 font-reddit font-semibold tracking-[-0.01em] text-[#424241]",
  pageHeroTitleMobileClassName,
  "sm:text-[44px] sm:leading-[52px] md:text-[48px] md:leading-[58px]",
].join(" ");

export const homeHeroTitleLineClassName = "home-hero-title-line block";

export const homeHeroTitleHighlightClassName = [
  homeHeroTitleLineClassName,
  "font-bold text-[#0024AE]",
].join(" ");

export const homeHeroDescriptionClassName = [
  "home-hero-description m-0 w-full font-reddit font-normal tracking-[0em] text-[#909090]",
  homeSectionSubtitleMobileClassName,
  "xl:mt-0",
].join(" ");

const homeHeroActionBaseClassName = [
  "inline-flex h-full min-h-[55px] w-full min-w-0 cursor-pointer items-center justify-center rounded-full px-2 py-2 text-center font-reddit text-[13px] font-bold leading-4 text-white",
  "sm:px-3 sm:text-sm sm:leading-5 md:px-4 md:text-base md:leading-6",
  "xl:min-h-0 xl:shrink-0 xl:px-[18.33px] xl:py-[9.16px] xl:text-[13.63px] xl:leading-[20.8px]",
].join(" ");

export const homeHeroPrimaryButtonClassName = [
  homeHeroActionBaseClassName,
  "bg-[#0024AE]",
  primaryFocusVisibleClassName,
  "xl:h-[41px] xl:w-[189px] xl:max-w-[189px]",
  solidButtonHoverClassName,
].join(" ");

export const homeHeroSecondaryButtonClassName = [
  homeHeroActionBaseClassName,
  "bg-action-muted",
  mutedFocusVisibleClassName,
  "xl:h-[42px] xl:w-[192px] xl:max-w-[192px]",
  solidButtonHoverClassName,
].join(" ");

export const homeHeroActionLabelClassName =
  "max-w-full text-center font-bold text-white xl:inline-block xl:shrink-0 xl:whitespace-nowrap xl:text-[13.63px] xl:leading-[20.8px]";

/** Texto até 561px; imagem ocupa o restante (máx. 663px). Gap horizontal 47px (Figma). */
export const homeHeroRowClassName = [
  "grid min-w-0 grid-cols-1 gap-8 xl:w-full",
  "xl:grid-cols-[minmax(0,561px)_minmax(0,1fr)] xl:grid-rows-[min-content_min-content]",
  "xl:items-start xl:gap-x-[47px] xl:gap-y-0",
].join(" ");

export const homeHeroContentClassName =
  "relative z-10 flex min-w-0 w-full max-w-[561px] flex-col max-xl:mb-2 xl:col-start-1 xl:row-start-1";

export const homeHeroCopyClassName =
  "flex w-full min-w-0 flex-col items-start gap-6 sm:gap-7 xl:gap-[53px]";

export const homeHeroActionsClassName = [
  actionButtonPairClassName,
  "xl:col-start-1 xl:row-start-2 xl:mt-[65px] xl:flex xl:w-auto xl:items-center",
].join(" ");

export const homeHeroSectionClassName =
  "relative box-border w-full bg-linear-to-b from-[#FFFFFF] from-0% to-[#DCEBFF] to-100% py-12 md:py-14 xl:pt-16 xl:pb-[56px] 2xl:pt-[71px] 2xl:pb-[56px]";

export const homeHeroVisualClassName = [
  "relative mx-auto aspect-[3/2] w-full min-w-0 max-w-[663px]",
  "xl:col-start-2 xl:row-start-1 xl:row-end-3 xl:mx-0 xl:justify-self-end",
].join(" ");

export const homeHeroImageClassName = "object-contain object-right";

export const homeHeroImageSizes =
  "(min-width: 1536px) 663px, (min-width: 1280px) 42vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)";
