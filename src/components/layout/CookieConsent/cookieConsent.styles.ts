import { actionButtonGroupGapClassName } from "@/components/ui/actionButtonGroup.styles";
import {
  iconButtonHoverClassName,
  outlineButtonHoverClassName,
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";

export const cookieBannerRegionClassName =
  "fixed inset-x-0 bottom-0 z-[200] border-t border-[#ECECEC] bg-[#EFF6FF] pb-[env(safe-area-inset-bottom)]";

export const cookieBannerContentClassName =
  "flex w-full min-w-0 flex-col gap-4 py-4 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6";

export const cookieBannerCopyClassName =
  "flex min-w-0 flex-1 flex-col gap-2";

export const cookieBannerTitleClassName =
  "m-0 font-reddit text-base font-semibold leading-6 text-[#171717]";

export const cookieBannerTextClassName =
  "m-0 font-reddit text-sm font-normal leading-5 text-[#383838]";

export const cookieBannerActionsClassName =
  `flex w-full min-w-0 shrink-0 flex-col sm:flex-row sm:flex-wrap lg:w-auto lg:justify-end ${actionButtonGroupGapClassName}`;

const cookieActionBaseClassName = [
  "inline-flex min-h-11 w-full cursor-pointer items-center justify-center rounded-[50px] border px-4 py-2 text-center font-reddit text-sm font-semibold leading-5 sm:w-auto disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  primaryFocusVisibleClassName,
].join(" ");

export const cookieEqualActionClassName =
  `${cookieActionBaseClassName} border-[#0024AE] bg-white text-[#0024AE] ${outlineButtonHoverClassName}`;

export const cookieBannerAcceptActionClassName =
  `${cookieActionBaseClassName} border-[#0024AE] bg-[#0024AE] text-white ${solidButtonHoverClassName}`;

export const cookieDialogClassName =
  "fixed inset-0 z-[300] m-auto h-fit w-[min(calc(100%-48px),32rem)] max-h-[min(90dvh,40rem)] flex-col overflow-hidden rounded-2xl border border-[#ECECEC] bg-white p-0 text-[#171717] shadow-[0_12px_32px_rgba(0,0,0,0.16)] open:flex backdrop:bg-black/50 motion-reduce:transition-none";

export const cookieDialogHeaderClassName =
  "flex shrink-0 flex-col gap-2 border-b border-[#ECECEC] py-4 pl-5 pr-12 sm:pl-6 sm:pr-14";

export const cookieDialogTitleClassName =
  "m-0 min-w-0 font-reddit text-lg font-semibold leading-7 text-[#171717]";

export const cookieDialogCloseClassName =
  `absolute right-1 top-1 z-10 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-[#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 ${iconButtonHoverClassName}`;

export const cookieDialogDescriptionClassName =
  "m-0 font-reddit text-sm font-normal leading-5 text-[#383838]";

export const cookieDialogBodyClassName =
  "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6";

export const cookieCategoryCardClassName =
  "flex flex-col gap-2 rounded-xl border border-[#ECECEC] bg-[#F7F7F8] p-4";

export const cookieCategoryTitleClassName =
  "m-0 font-reddit text-sm font-semibold leading-5 text-[#171717]";

export const cookieCategoryTextClassName =
  "m-0 font-reddit text-xs font-normal leading-4 text-[#383838]";

export const cookieLiveNoticeClassName = `${cookieCategoryTextClassName} block`;

export const cookieDialogFooterClassName =
  "flex shrink-0 flex-col gap-2 border-t border-[#ECECEC] px-5 py-4 sm:flex-row sm:justify-end sm:px-6";

export const cookieChoiceFieldsetClassName =
  "m-0 flex min-w-0 flex-col gap-2 border-0 p-0";

export const cookieChoiceLegendClassName =
  "float-none mb-1 p-0 font-reddit text-sm font-semibold leading-5 text-[#171717]";

export const cookieChoiceLabelClassName =
  "flex min-h-8 cursor-pointer items-center gap-2 font-reddit text-sm font-normal leading-5 text-[#171717]";

export const cookieChoiceControlClassName =
  "grid size-5 shrink-0 place-items-center";

export const cookieChoiceRadioClassName =
  "peer col-start-1 row-start-1 m-0 box-border size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-[#AEAEB2] bg-white p-0 checked:border-[#0024AE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2";

export const cookieChoiceDotClassName =
  "pointer-events-none col-start-1 row-start-1 size-2.5 shrink-0 rounded-full bg-transparent peer-checked:bg-[#0024AE]";

export { cookieBannerAcceptActionClassName as cookieSaveActionClassName };

export const cookieSettingsButtonClassName =
  "cursor-pointer border-0 bg-transparent p-0 font-reddit text-[12px] font-normal leading-4 tracking-normal text-white/60 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

export const cookieEmailClassName =
  "font-reddit text-[#0024AE] underline decoration-transparent transition-colors hover:decoration-[#0024AE] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2";
