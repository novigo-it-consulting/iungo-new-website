import {
  homeSectionSubtitleMobileClassName,
  pageHeroTitleMobileClassName,
} from "@/components/ui/sectionTitle.styles";

export const productHeroSectionBaseClassName =
  "w-full min-w-0 bg-white py-12 md:py-14 xl:py-[54px]";

/** Coluna única no mobile (texto → imagem → botão); duas colunas a partir de lg. */
const productHeroGridBaseClassName = [
  "grid min-w-0 grid-cols-1 gap-8",
  "lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)] lg:grid-rows-[min-content_min-content]",
  "lg:gap-x-6 lg:gap-y-0 xl:gap-x-8 2xl:gap-x-10",
].join(" ");

export const productHeroGridClassName = [
  productHeroGridBaseClassName,
  "lg:items-start",
].join(" ");

/** Organizer: alinha verticalmente texto e imagem no desktop. */
export const productHeroGridCenteredClassName = [
  productHeroGridBaseClassName,
  "items-center",
].join(" ");

export const productHeroTitleFrameClassName = "w-full max-w-[544px]";

export const productHeroTitleClassName = [
  "m-0 w-full font-reddit font-semibold text-[#424241] tracking-[-0.4px]",
  pageHeroTitleMobileClassName,
  "sm:text-[44px] sm:leading-[52px] md:text-[48px] md:leading-[58px]",
  "lg:text-[52px] lg:leading-[68px] lg:tracking-[-0.52px] xl:text-[56px] xl:leading-[72px] xl:tracking-[-0.56px] 2xl:text-[66px] 2xl:leading-[89px] 2xl:tracking-[-0.01em]",
].join(" ");

export const productHeroParagraphClassName = [
  "m-0 w-full font-reddit font-normal tracking-[0.38px] text-[#041527]",
  homeSectionSubtitleMobileClassName,
  "xl:text-base xl:leading-8",
].join(" ");

export const productHeroContentPlacementClassName =
  "max-lg:mb-2 lg:col-start-1 lg:row-start-1";

export const productHeroContentClassName = [
  "flex min-w-0 flex-col items-start lg:pt-4 xl:pt-[31px]",
  productHeroContentPlacementClassName,
].join(" ");

const productHeroVisualPlacementClassName =
  "lg:col-start-2 lg:row-start-1 lg:row-end-3";

/**
 * Ilustração do Hero no mobile: ~18% menor que 100%/450px.
 * O container encolhe junto (sem scale). Desktop restaura 450px em lg+.
 */
const productHeroIllustrationMobileWidthClassName =
  "w-[82%] max-w-[369px]";

const productHeroIllustrationDesktopWidthClassName =
  "lg:w-full lg:max-w-[450px]";

export const productHeroVisualWrapperClassName = [
  "flex min-w-0 justify-center justify-self-center",
  productHeroIllustrationMobileWidthClassName,
  productHeroIllustrationDesktopWidthClassName,
  productHeroVisualPlacementClassName,
  "lg:justify-end lg:justify-self-end",
].join(" ");

export const productHeroVisualOrganizerClassName = [
  "relative aspect-square min-w-0 justify-self-center",
  productHeroIllustrationMobileWidthClassName,
  productHeroIllustrationDesktopWidthClassName,
  productHeroVisualPlacementClassName,
  "lg:justify-self-end",
].join(" ");

export const productHeroImageClassName = "block h-auto w-full object-contain";

export const productHeroImageSizes =
  "(min-width: 1536px) 450px, (min-width: 1280px) 38vw, (min-width: 1024px) 40vw, (min-width: 640px) min(369px, calc((100vw - 64px) * 0.82)), min(369px, calc((100vw - 48px) * 0.82))";

const productHeroCtaPlacementClassName = [
  "flex w-full justify-center",
  "lg:col-start-1 lg:row-start-2 lg:justify-start",
].join(" ");

export const productHeroCtaClassName = [
  productHeroCtaPlacementClassName,
  "lg:mt-10 xl:mt-12 2xl:mt-[60px]",
].join(" ");

/** Variante compacta para Behavior e Concierge (espaçamento aprovado no Figma). */
export const productHeroCtaCompactClassName = [
  productHeroCtaPlacementClassName,
  "lg:mt-10 xl:mt-[39px]",
].join(" ");

export const productHeroCtaOrganizerClassName = [
  productHeroCtaPlacementClassName,
  "lg:mt-10 xl:mt-12 2xl:mt-[58px]",
].join(" ");

export const productHeroIconSpacingClassName = "mb-4 xl:mb-[14px]";

export const productHeroDescriptionBlockClassName = "mt-[14px] w-full";
