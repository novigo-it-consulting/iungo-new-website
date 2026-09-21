/**
 * Tipografia da Home: títulos de seção (h2) e subtítulos.
 *
 * Mobile é compacto e compartilhado. O desktop (xl+) restaura o valor
 * já aprovado de cada bloco — não usa o leading 72.7px no mobile.
 * O h1 do Hero não entra neste token (título de página).
 */
export const homeSectionTitleMobileClassName =
  "text-[24px] leading-[30px] sm:text-[26px] sm:leading-[32px]";

export const homeSectionSubtitleMobileClassName =
  "max-xl:text-[15px] max-xl:leading-[20px]";

export const homeSectionTitleClassName = [
  "m-0 w-full text-center font-reddit font-semibold tracking-[-0.01em] text-[#424241]",
  homeSectionTitleMobileClassName,
  "xl:text-[30px] xl:leading-[72.7px]",
].join(" ");

export const homeCasesTitleClassName = [
  "m-0 w-full max-w-full text-center font-reddit font-semibold tracking-[-0.96px] text-[#041527]",
  homeSectionTitleMobileClassName,
  "lg:w-fit lg:text-left xl:text-[30px] xl:leading-[48px]",
].join(" ");

export const homeRoiTitleClassName = [
  "m-0 w-full font-reddit font-bold tracking-[-0.02em] text-white",
  homeSectionTitleMobileClassName,
  "xl:text-[56px] xl:leading-[60px]",
].join(" ");

export const homeProductsSubtitleClassName = [
  "m-0 block w-full text-center font-reddit font-normal tracking-[0] text-[#909090]",
  homeSectionSubtitleMobileClassName,
  "xl:h-[30.28px] xl:max-w-[750.31px] xl:text-[15.14px] xl:leading-[30.3px]",
].join(" ");

export const homeRoiSubtitleClassName = [
  "m-0 w-full max-w-[672px] font-reddit font-normal tracking-[0] text-white/70",
  homeSectionSubtitleMobileClassName,
  "xl:text-[18px] xl:leading-[28px]",
].join(" ");
