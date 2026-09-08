import type { ContactCardVariant } from "./contactCards.constants";

const contactCardVariantClassNames: Record<
  ContactCardVariant,
  { card: string; title: string; contact: string; description: string }
> = {
  commercial: {
    card: "border-0 bg-[#0A0B14] pt-[30.31px] pl-[30.96px] pr-[30.96px]",
    title: "text-[#22D3EE]",
    contact: "text-white/90",
    description: "text-white/60",
  },
  default: {
    card: "border-[1.29px] border-solid border-[#E4E4E7] bg-white pt-[29.02px] pl-[29.67px] pr-[29.67px]",
    title: "text-[#71717A]",
    contact: "text-[#27272A]",
    description: "text-[#71717A]",
  },
};

export const contactCardsColumnClassName =
  "flex w-full min-w-0 flex-col gap-[21px]";

export const contactCardBaseClassName =
  "box-border flex min-h-[144.47px] w-full min-w-0 flex-col items-start rounded-[20.64px] min-[1249px]:h-[144.47px]";

export const contactCardTitleClassName =
  "m-0 font-reddit text-[15.48px] font-normal leading-[20.6px] tracking-[0]";

export const contactCardContactClassName =
  "mt-[11px] font-reddit text-[18.06px] font-normal leading-[25.8px] tracking-[0] underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2";

export const contactCardDescriptionClassName =
  "mt-[4.52px] m-0 font-reddit text-[15.48px] font-normal leading-[20.6px] tracking-[0]";

export function getContactCardVariantClassNames(variant: ContactCardVariant) {
  return contactCardVariantClassNames[variant];
}
