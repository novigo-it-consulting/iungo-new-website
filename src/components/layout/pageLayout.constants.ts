/**
 * Grid de trilhos laterais (PageSideRails).
 * Colunas fixas de 329px (esquerda) e 320px (direita) em 2xl (≥1536px).
 * Abaixo de 2xl: grade de coluna única, padding horizontal gerido por cada section.
 */
export const pageSideRailsGridClassName =
  "grid w-full grid-cols-1 2xl:grid-cols-[329px_minmax(0,1fr)_320px]";
