export const productSystemScreensBadgeWrapperClassName =
  "mx-auto mt-6 w-full max-w-[1216px] pt-6";

export const productSystemScreensBadgeListClassName =
  "m-0 grid w-full min-w-0 list-none grid-cols-4 items-center gap-1 p-0 sm:gap-2 md:mx-auto md:w-fit md:grid-cols-[repeat(4,max-content)]";

export const productSystemScreensBadgeBaseClassName = [
  "box-border flex h-auto w-full min-w-0 items-center justify-center whitespace-nowrap rounded-[50px] border font-reddit font-normal tracking-normal",
  "max-md:min-h-5 max-md:px-1 max-md:py-1 max-md:text-[clamp(5.5px,_1.85vw,_12px)] max-md:leading-[1.2]",
  "sm:max-md:min-h-7 sm:max-md:px-2 sm:max-md:py-1.5",
  "md:min-h-10 md:w-auto md:px-4 md:py-2 md:text-sm md:leading-5",
].join(" ");

export const productSystemScreensBadgeActiveClassName =
  "border-[#0A0B14] bg-[#0A0B14] text-white";

export const productSystemScreensBadgeInactiveFillClassName =
  "bg-white text-[#27272A]";

export const productSystemScreensVisualsClassName =
  "mx-auto mt-6 flex w-full max-w-[1216px] flex-col gap-6";

export const productSystemScreensImageGridClassName =
  "grid w-full min-w-0 grid-cols-3 items-start gap-2 sm:gap-3 lg:gap-4";

export const productSystemScreensGridItemClassName = "w-full min-w-0";

export const productSystemScreensImageClassName = "block h-auto w-full";

export const productSystemScreensMainSizes =
  "(min-width: 1280px) 1216px, calc(100vw - 48px)";

export const productSystemScreensGridItemSizes =
  "(min-width: 1280px) 395px, calc((100vw - 48px - 16px) / 3)";
