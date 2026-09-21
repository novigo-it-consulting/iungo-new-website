/**
 * Tipografia da Home e páginas de produto.
 *
 * Mobile é compacto e compartilhado. O desktop (xl+) restaura o valor
 * já aprovado de cada bloco. O h1 do Hero da Home não usa o token de
 * seção (título de página).
 */
export const homeSectionTitleMobileClassName =
  "text-[24px] leading-[30px] sm:text-[26px] sm:leading-[32px]";

export const homeSectionSubtitleMobileClassName =
  "max-xl:text-[15px] max-xl:leading-[20px]";

/** h1 de página no mobile (Home e Hero de produto). */
export const pageHeroTitleMobileClassName =
  "text-[clamp(26px,8.2vw,40px)] leading-[clamp(32px,9.8vw,48px)]";

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

/** h2 de seção nas páginas de produto. xl restaura 36/40. */
export const productSectionTitleClassName = [
  "m-0 font-reddit font-bold text-center tracking-[-0.56px] text-[#27272A]",
  homeSectionTitleMobileClassName,
  "xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]",
].join(" ");

/** Corpo de descrição de produto, sem alinhamento (centrado ou à esquerda no consumidor). */
export const productSectionDescriptionBaseClassName = [
  "m-0 w-full font-reddit font-normal tracking-normal text-[#71717A]",
  homeSectionSubtitleMobileClassName,
  "xl:text-base xl:leading-6",
].join(" ");

export const productSectionDescriptionClassName = [
  productSectionDescriptionBaseClassName,
  "text-center",
].join(" ");
