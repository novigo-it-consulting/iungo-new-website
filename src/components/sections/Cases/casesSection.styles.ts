/**
 * Container pai "Casos de Sucesso" — specs Figma (frame 1280 × Hug):
 *   Padding: 32px horizontal · 96px vertical
 *   Gap interno (header ↔ cards): 48px
 *   Largura máxima: 1280px (conteúdo útil: 1216px)
 *
 * Gap externo entre sections adjacentes na Home: 42px.
 */

/** Espaço externo entre a section Casos e Produtos / ROI (Figma: 42px). */
export const casesSectionOuterGapClassName = "my-[42px]";

export const casesSectionClassName = [
  "w-full bg-white",
  casesSectionOuterGapClassName,
].join(" ");

/** Container pai — auto-layout vertical com padding e gap do Figma. */
export const casesSectionContainerClassName = [
  "mx-auto box-border flex w-full max-w-[1280px] flex-col items-stretch overflow-visible",
  "px-[32px] py-[96px] gap-[48px]",
].join(" ");

/** Grid de cards — frame interno 1216 Fill, gap 24px (Figma). */
export const casesSectionCardsGridClassName =
  "grid w-full grid-cols-1 items-stretch gap-[24px] lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-0";
