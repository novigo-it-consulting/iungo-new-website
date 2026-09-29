/**
 * Métricas do Iungo Resolve.
 * Mobile: 3 colunas compactas. md+ restaura o layout aprovado (48px / gap-8).
 */

/** Respiro acima das métricas no mobile; xl restaura os 109px aprovados. */
export const resolveContentSectionClassName =
  "w-full min-w-0 bg-white pt-12 xl:pt-[109px]";

export const resolveMetricsGridClassName = [
  "@container mx-auto grid w-full min-w-0 max-w-[1088px] grid-cols-3",
  "gap-2 sm:gap-3 md:gap-8",
].join(" ");

export const resolveMetricItemClassName =
  "flex min-w-0 flex-col items-center gap-1 text-center";

export const resolveMetricValueClassName = [
  "m-0 w-full min-w-0 text-center font-reddit font-bold text-[#C84F04]",
  "whitespace-nowrap tracking-[-0.02em]",
  "text-[clamp(22px,8.5cqi,32px)] leading-[1.2]",
  "md:text-[48px] md:leading-[48px] md:tracking-[-0.96px]",
].join(" ");

export const resolveMetricDescriptionClassName = [
  "m-0 w-full text-center font-reddit font-medium tracking-normal text-[#27272A]",
  "text-[11px] leading-4",
  "sm:text-xs sm:leading-4",
  "md:text-sm md:leading-5",
].join(" ");

export const resolveMetricComplementClassName = [
  "m-0 w-full text-center font-reddit font-normal tracking-normal text-[#71717A]",
  "text-[10px] leading-[14px]",
  "sm:text-[11px] sm:leading-4",
  "md:text-xs md:leading-4",
].join(" ");
