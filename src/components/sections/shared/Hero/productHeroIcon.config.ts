export type ProductHeroIconSizePreset =
  | "107-75"
  | "107-74"
  | "10694-74"
  | "organizer";

export type ProductHeroIconConfig = {
  productSlug: string;
  iconSrc: string;
  backgroundColor: string;
  sizePreset: ProductHeroIconSizePreset;
};

const PRODUCT_HERO_ICON_SEAL_MOBILE_CLASS_NAME =
  "h-14 w-14 rounded-[14px] p-2 sm:h-16 sm:w-16 sm:rounded-2xl sm:p-2.5";

export const PRODUCT_HERO_ICON_SIZE_CLASS_NAMES: Record<
  ProductHeroIconSizePreset,
  string
> = {
  "107-75": `${PRODUCT_HERO_ICON_SEAL_MOBILE_CLASS_NAME} xl:h-[107px] xl:w-[107px] xl:rounded-[26.75px] xl:p-[17.83px]`,
  "107-74": `${PRODUCT_HERO_ICON_SEAL_MOBILE_CLASS_NAME} xl:h-[107px] xl:w-[107px] xl:rounded-[26.74px] xl:p-[17.82px]`,
  "10694-74": `${PRODUCT_HERO_ICON_SEAL_MOBILE_CLASS_NAME} xl:h-[106.94px] xl:w-[106.94px] xl:rounded-[26.74px] xl:p-[17.82px]`,
  organizer: `${PRODUCT_HERO_ICON_SEAL_MOBILE_CLASS_NAME} xl:size-[106.94px] xl:rounded-[26.74px] xl:p-[17.82px]`,
};

export const PRODUCT_HERO_ICONS = {
  attendant: {
    productSlug: "attendant",
    iconSrc: "/icons/products/attendant.svg",
    backgroundColor: "#3B37C0",
    sizePreset: "107-74",
  },
  behavior: {
    productSlug: "behavior",
    iconSrc: "/icons/products/behavior.svg",
    backgroundColor: "#5B6C7C",
    sizePreset: "10694-74",
  },
  concierge: {
    productSlug: "concierge",
    iconSrc: "/icons/products/concierge.svg",
    backgroundColor: "#A72121",
    sizePreset: "10694-74",
  },
  convert: {
    productSlug: "convert",
    iconSrc: "/icons/products/convert.svg",
    backgroundColor: "#0078AA",
    sizePreset: "107-75",
  },
  iot: {
    productSlug: "iot",
    iconSrc: "/icons/products/iot.svg",
    backgroundColor: "#B8860B",
    sizePreset: "107-75",
  },
  organizer: {
    productSlug: "organizer",
    iconSrc: "/icons/products/organizer.svg",
    backgroundColor: "#1E9F67",
    sizePreset: "organizer",
  },
  resolve: {
    productSlug: "resolve",
    iconSrc: "/icons/products/resolve.svg",
    backgroundColor: "#C84F04",
    sizePreset: "107-74",
  },
} as const satisfies Record<string, ProductHeroIconConfig>;
