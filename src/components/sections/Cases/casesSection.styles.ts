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
  "w-full overflow-visible bg-white",
  casesSectionOuterGapClassName,
].join(" ");

/** Container pai — auto-layout vertical com padding e gap do Figma. */
export const casesSectionContainerClassName = [
  "mx-auto box-border flex w-full max-w-[1280px] flex-col items-stretch overflow-visible",
  "px-[32px] py-[96px] gap-[48px]",
].join(" ");

/** Grid de cards — frame interno 1216 Fill, gap 24px (Figma). */
export const casesSectionCardsGridClassName =
  "grid w-full grid-cols-1 items-stretch gap-[24px] overflow-visible lg:grid-cols-2 lg:gap-x-[24px] lg:gap-y-0";

export const caseCardClassName =
  "relative z-0 box-border flex w-full flex-col gap-0 overflow-visible rounded-2xl border border-[#E4E4E7] bg-white shadow-none lg:min-h-[656.92px]";

export const caseCardInnerClassName =
  "flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[inherit]";

export const caseCardTagsClassName =
  "flex w-full flex-wrap items-center justify-start gap-2 overflow-visible p-0";

/**
 * Área de mídia dos cards: 16/9 (`aspect-video`).
 * Largura intrínseca pensada para retina no card de 596px (1280px − 64px de padding − 24px de gap).
 */
export const caseCardMediaImageWidth = 1200;
export const caseCardMediaImageHeight = 675;

export const caseCardMediaImageClassName =
  "block h-full w-full object-cover object-center";

export const caseCardMediaImageSizes =
  "(min-width: 1280px) 596px, (min-width: 1024px) calc((100vw - 88px) / 2), calc(100vw - 64px)";
