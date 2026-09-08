import { solidButtonHoverClassName } from "@/components/ui/buttonInteraction.styles";

// O frame ocupa toda a largura — gutters e max-width são responsabilidade do
// PageContainer content1264 dentro do HeaderShell.
export const headerFrameClassName =
  "box-border w-full py-4 2xl:h-[96px] 2xl:py-0";

export const headerNavClassName =
  "hidden shrink-0 items-center xl:flex 2xl:h-[25px] 2xl:w-[339.2px]";

export const headerNavListClassName =
  "flex items-center gap-6 xl:gap-8 2xl:gap-[42.4px]";

export const headerNavLinkClassName =
  "inline-flex h-8 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded font-reddit text-base font-normal leading-8 text-[#383838] transition-colors duration-200 hover:text-[#111111] active:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 xl:text-[15px] xl:leading-6 2xl:h-[25px] 2xl:text-lg 2xl:leading-8";

export const headerActionsClassName =
  "hidden shrink-0 items-center gap-3 xl:flex xl:gap-4 2xl:gap-[20px]";

export const headerClientButtonClassName =
  `inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[57.27px] bg-[#687681] px-4 text-center font-reddit text-sm font-bold leading-5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687681] focus-visible:ring-offset-2 xl:h-[41.64px] xl:w-[146.88px] xl:px-[18.33px] xl:text-[13.63px] xl:leading-[20.8px] 2xl:h-[41.64px] 2xl:w-[146.88px] ${solidButtonHoverClassName}`;

export const headerDemoButtonClassName =
  `inline-flex h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-4 text-center font-reddit text-sm font-bold leading-5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 xl:h-[40.88px] xl:w-[189.28px] xl:px-[18.33px] xl:text-[13.63px] xl:leading-[20.8px] 2xl:h-[40.88px] 2xl:w-[189.28px] ${solidButtonHoverClassName}`;

export const headerButtonLabelClassName =
  "inline-block shrink-0 whitespace-nowrap font-bold text-white xl:text-[13.63px] xl:leading-[20.8px]";
  