/** Valores aproximados — alinhados ao Header e referência do mega menu. */

export const solucoesMegaMenuPanelClassName =
  "absolute inset-x-0 top-full z-40 box-border max-h-[min(calc(100dvh-5rem),36rem)] overflow-y-auto overscroll-contain border-t border-[#ECECEC] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.06)] before:absolute before:inset-x-0 before:-top-2 before:h-2 before:content-[''] motion-reduce:transition-none";

export const solucoesMegaMenuPanelInnerClassName =
  "mx-auto box-border w-full min-w-0";

/** Container principal: max 1262px incl. padding (box-border). */
export const solucoesMegaMenuContainerClassName =
  "mx-auto box-border w-full min-w-0 max-w-[1262px] px-8 py-10";

/** Grid desktop: 4 colunas iguais (minmax(0,1fr)), gap 32px. */
export const solucoesMegaMenuGridClassName =
  "grid grid-cols-[repeat(4,minmax(0,1fr))] grid-rows-1 items-stretch gap-8";

export const solucoesMegaMenuColumnClassName = "flex min-w-0 flex-col";

export const solucoesMegaMenuFeaturedColumnClassName = [
  solucoesMegaMenuColumnClassName,
  "self-stretch",
].join(" ");

/** Selo → subtítulo: 16px provisório (sem valor explícito no Figma). */
export const solucoesMegaMenuCategoryHeaderClassName =
  "flex min-w-0 flex-col gap-4";

/** Base compartilhada dos selos informativos do mega menu. */
export const solucoesMegaMenuBadgeShellBaseClassName =
  "inline-flex w-fit max-w-full shrink-0 items-center justify-center rounded-[999px] px-[14.4px] py-[6.4px] font-reddit text-[11.2px] font-medium leading-[16.8px]";

/**
 * Selo local do mega menu.
 * Herdado de SectionEyebrow (compact): tracking 0.067px, pill, #0024AE.
 * Específico deste menu: bg #0024AE12, sem borda, sem backdrop-blur, largura ao conteúdo.
 */
export const solucoesMegaMenuCategoryBadgeClassName = [
  solucoesMegaMenuBadgeShellBaseClassName,
  "tracking-[0.067px] bg-[#0024AE12] text-[#0024AE]",
].join(" ");

export const solucoesMegaMenuCategoryBadgeTextClassName = "text-left";

/** Subtítulo: mb-3 (12px) antes da lista de cards. */
export const solucoesMegaMenuCategorySubtitleClassName =
  "mb-3 font-reddit text-left text-[12px] font-normal leading-[19.5px] text-[#71717A]";

/** Gap entre cards: 8px provisório (sem valor explícito no Figma). */
export const solucoesMegaMenuProductListClassName =
  "m-0 flex min-w-0 list-none flex-col gap-2 p-0";

/** Hover: iungo-fog (#F4F6FA) e iungo-indigo (#0024AE) — equivalentes locais. */
export const solucoesMegaMenuProductCardClassName =
  "group flex w-full min-w-0 flex-col gap-2 rounded-lg p-3 transition-colors duration-150 hover:bg-[#F4F6FA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 motion-reduce:transition-none";

export const solucoesMegaMenuProductTitleRowClassName =
  "flex min-w-0 items-center gap-2";

/** IoT e demais cards com selo: ícone + título à esquerda, selo à direita. */
export const solucoesMegaMenuProductTitleRowWithBadgeClassName =
  "flex w-full min-w-0 items-center justify-between gap-2";

export const solucoesMegaMenuProductTitleGroupClassName =
  "flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1";

export const solucoesMegaMenuProductTitleLeadingGroupClassName =
  "flex min-w-0 items-center gap-2";

export const solucoesMegaMenuProductIconShellClassName =
  "relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-[6px]";

export const solucoesMegaMenuProductIconImageClassName =
  "object-contain p-[5px]";

export const solucoesMegaMenuProductTitleClassName =
  "min-w-0 font-reddit text-[14px] font-medium leading-5 transition-colors duration-150 group-hover:text-[#0024AE] motion-reduce:transition-none";

export const solucoesMegaMenuProductDescriptionClassName =
  "m-0 font-reddit text-left text-[12px] font-normal leading-4 text-[#71717A]";

/**
 * Selo NOVO (IoT): 11.2px medium, pill, #B8860B / bg #B8860B1A.
 * Peso e borda herdados do padrão SectionEyebrow compact quando compatível.
 * Pendência de contraste: #B8860B sobre #B8860B1A ≈ 2,92:1.
 */
export const solucoesMegaMenuProductBadgeClassName = [
  solucoesMegaMenuBadgeShellBaseClassName,
  "tracking-[0.067px] bg-[#B8860B1A] text-[#B8860B]",
].join(" ");

export const solucoesMegaMenuProductBadgeTextClassName = "whitespace-nowrap";

/** Base compartilhada dos links com seta do mega menu. */
export const solucoesMegaMenuArrowLinkBaseClassName =
  "inline-flex w-fit items-center gap-1.5 font-reddit text-[12px] font-normal leading-4";

export const solucoesMegaMenuCategoryViewLinkClassName = [
  solucoesMegaMenuArrowLinkBaseClassName,
  "mt-3 text-[#4F46E5] transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 motion-reduce:transition-none",
].join(" ");

export const solucoesMegaMenuTriggerClassName =
  "inline-flex h-8 w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded font-reddit text-base font-normal leading-8 text-[#383838] transition-colors duration-200 hover:text-[#0024AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 xl:text-[15px] xl:leading-6 2xl:h-[25px] 2xl:text-lg 2xl:leading-8";

export const solucoesMegaMenuTriggerOpenClassName = "text-[#0024AE]";

export const solucoesMegaMenuChevronClassName =
  "size-3 shrink-0 transition-transform duration-200 motion-reduce:transition-none";

export const solucoesMegaMenuChevronOpenClassName = "rotate-180 text-[#0024AE]";

export const solucoesMobileGroupButtonClassName =
  "flex min-h-[44px] w-full items-center justify-between gap-3 rounded py-3 font-reddit text-lg font-normal leading-8 text-[#383838] transition-colors duration-150 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-1";

export const solucoesMobileGroupPanelClassName =
  "flex min-w-0 flex-col gap-6 pb-2 pl-1";

export const solucoesMobileCategoryItemClassName = "min-w-0";

/** Card “Caso em destaque” — quarta coluna do mega menu. */
export const solucoesMegaMenuFeaturedCaseCardClassName =
  "box-border flex h-full w-full min-w-0 flex-col rounded-xl bg-[#0A0B14] p-6 text-white";

/**
 * Selo escuro local — cores #FFFFFFEB / #FFFFFF12 conforme referência.
 * Herdado de DarkSectionEyebrow: tracking 0.672px, pill. Sem borda, backdrop-blur
 * ou opacidade no elemento pai.
 */
export const solucoesMegaMenuFeaturedCaseBadgeClassName = [
  solucoesMegaMenuBadgeShellBaseClassName,
  "mb-3 self-start tracking-[0.672px] bg-[#FFFFFF12] text-[#FFFFFFEB]",
].join(" ");

export const solucoesMegaMenuFeaturedCaseTitleClassName =
  "m-0 mb-2 font-reddit text-[18px] font-bold leading-[22.5px] text-white";

export const solucoesMegaMenuFeaturedCaseSubtitleClassName =
  "m-0 mb-4 font-reddit text-[14px] font-normal leading-5 text-[#FFFFFF99]";

export const solucoesMegaMenuFeaturedCaseReadLinkClassName = [
  solucoesMegaMenuArrowLinkBaseClassName,
  "self-start text-[#22D3EE] underline-offset-2 transition-colors duration-150 hover:underline focus-visible:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B14] motion-reduce:transition-none",
].join(" ");
