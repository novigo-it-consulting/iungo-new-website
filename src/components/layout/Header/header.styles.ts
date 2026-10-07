import { actionButtonGroupGapClassName } from "@/components/ui/actionButtonGroup.styles";
export { actionButtonPairClassName as mobileNavActionsClassName } from "@/components/ui/actionButtonGroup.styles";
import {
  mutedFocusVisibleClassName,
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";

// O frame ocupa toda a largura — gutters e max-width são responsabilidade do
// PageContainer content1264 dentro do HeaderShell.
export const headerFrameClassName =
  "box-border w-full py-4 2xl:h-[96px] 2xl:py-0";

export const headerNavClassName =
  "hidden shrink-0 items-center xl:flex 2xl:h-[25px] 2xl:w-[339.2px]";

export const headerNavListClassName =
  "flex items-center gap-6 xl:gap-8 2xl:gap-[42.4px]";

export const headerNavLinkClassName = [
  "inline-flex h-8 w-fit shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded font-reddit text-base font-normal leading-8 text-[#383838] transition-colors duration-200 hover:text-[#111111] active:text-black",
  primaryFocusVisibleClassName,
  "xl:text-[15px] xl:leading-6 2xl:h-[25px] 2xl:text-lg 2xl:leading-8",
].join(" ");

export const headerActionsClassName = [
  "hidden shrink-0 items-center xl:flex",
  actionButtonGroupGapClassName,
].join(" ");

/** Base compartilhada dos dois botões de ação do header desktop.
 *  Cores de fundo, foco e dimensões xl são definidos por cada variante. */
const headerButtonBaseClassName = [
  "inline-flex h-10 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[57.27px] px-4 text-center font-reddit text-sm font-bold leading-5 text-white",
  solidButtonHoverClassName,
  "xl:px-[18.33px] xl:text-[13.63px] xl:leading-[20.8px]",
].join(" ");

export const headerClientButtonClassName = [
  headerButtonBaseClassName,
  "bg-action-muted",
  mutedFocusVisibleClassName,
  "xl:h-[41.64px] xl:w-[146.88px] 2xl:h-[41.64px] 2xl:w-[146.88px]",
].join(" ");

export const headerDemoButtonClassName = [
  headerButtonBaseClassName,
  "bg-[#0024AE]",
  primaryFocusVisibleClassName,
  "xl:h-[40.88px] xl:w-[189.28px] 2xl:h-[40.88px] 2xl:w-[189.28px]",
].join(" ");

export const headerButtonLabelClassName =
  "inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]";

/** Grupo mobile: seletor (somente com o menu aberto) + botão ☰, gap-4 (16px). */
export const mobileNavRootClassName = "flex items-center gap-4 xl:hidden";

export const mobileNavToggleClassName = [
  "flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-md transition-colors hover:bg-gray-100",
  primaryFocusVisibleClassName,
].join(" ");

export const mobileNavToggleBarClassName =
  "block h-0.5 w-6 origin-center bg-[#383838] transition-transform duration-200";

export const mobileNavToggleBarMiddleClassName =
  "block h-0.5 w-6 bg-[#383838] transition-opacity duration-200";

export const mobileNavPanelClassName =
  "absolute inset-x-0 top-full z-50 box-border h-auto max-h-[calc(100svh-100%)] min-h-0 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y scroll-pt-2 scroll-pb-[calc(1.5rem+env(safe-area-inset-bottom))] bg-white shadow-lg transition-opacity duration-200";

export const mobileNavPanelInnerClassName =
  "mx-auto w-full max-w-[1728px] px-4 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:px-8";

export const mobileNavItemClassName =
  "block min-h-[44px] cursor-pointer rounded py-3 font-reddit text-lg font-normal leading-8 text-[#383838] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-1";

const mobileNavActionBaseClassName =
  "inline-flex h-full min-h-[55px] w-full min-w-0 cursor-pointer items-center justify-center rounded-full px-3 py-2 text-center font-reddit text-base font-bold leading-6 text-white md:px-4";

export const mobileNavClientButtonClassName = [
  mobileNavActionBaseClassName,
  "bg-action-muted",
  mutedFocusVisibleClassName,
  solidButtonHoverClassName,
].join(" ");

export const mobileNavDemoButtonClassName = [
  mobileNavActionBaseClassName,
  "bg-[#0024AE]",
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
].join(" ");
