import {
  ATTENDANT_HREF,
  BEHAVIOR_HREF,
  CONCIERGE_HREF,
  CONVERT_HREF,
  IOT_HREF,
  ORGANIZER_HREF,
  RESOLVE_HREF,
} from "@/constants/routes";

export const FIRST_ROW_PRODUCTS = [
  {
    id: "organizer",
    name: "Iungo Organizer",
    className: "min-h-[360px] xl:col-span-3 xl:h-[346.74px]",
    ctaHref: ORGANIZER_HREF,
    icon: {
      src: "/icons/products/organizer.svg",
      backgroundClassName: "bg-[#1E9F67]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
  {
    id: "concierge",
    name: "Iungo Concierge",
    className: "min-h-[360px] xl:col-span-3 xl:h-[346.76px]",
    ctaHref: CONCIERGE_HREF,
    icon: {
      src: "/icons/products/concierge.svg",
      backgroundClassName: "bg-[#A72121]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
  {
    id: "behavior",
    name: "Iungo Behavior",
    className: "min-h-[360px] xl:col-span-2 xl:h-[346.76px]",
    ctaHref: BEHAVIOR_HREF,
    icon: {
      src: "/icons/products/behavior.svg",
      backgroundClassName: "bg-[#5B6C7C]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
] as const;

export const SECOND_ROW_PRODUCTS = [
  {
    id: "resolve",
    name: "Iungo Resolve",
    className: "min-h-[360px] xl:col-span-2 xl:h-[333.14px]",
    ctaHref: RESOLVE_HREF,
    icon: {
      src: "/icons/products/resolve.svg",
      backgroundClassName: "bg-[#C84F04]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
  {
    id: "attendant",
    name: "Iungo Attendant",
    className: "min-h-[360px] xl:col-span-2 xl:h-[334.53px]",
    ctaHref: ATTENDANT_HREF,
    icon: {
      src: "/icons/products/attendant.svg",
      backgroundClassName: "bg-[#3B37C0]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
  {
    id: "convert",
    name: "Iungo Convert",
    className: "min-h-[360px] xl:col-span-2 xl:h-[334.53px]",
    ctaHref: CONVERT_HREF,
    icon: {
      src: "/icons/products/convert.svg",
      backgroundClassName: "bg-[#0078AA]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: null,
  },
  {
    id: "iot",
    name: "Iungo IoT",
    className: "min-h-[360px] xl:col-span-2 xl:h-[334.53px]",
    ctaHref: IOT_HREF,
    icon: {
      src: "/icons/products/iot.svg",
      backgroundClassName: "bg-[#B8860B]",
    },
    contentClassName: "",
    contentGapClassName: null,
    cardPaddingClassName: "2xl:px-[25.02px] 2xl:py-[25.73px]",
  },
] as const;

export type ProductId =
  | (typeof FIRST_ROW_PRODUCTS)[number]["id"]
  | (typeof SECOND_ROW_PRODUCTS)[number]["id"];

const ALL_PRODUCTS = [...FIRST_ROW_PRODUCTS, ...SECOND_ROW_PRODUCTS];

export const FOOTER_PRODUCT_IDS = [
  "organizer",
  "behavior",
  "concierge",
  "resolve",
  "attendant",
  "convert",
  "iot",
] as const satisfies readonly ProductId[];

export function getProductById(id: ProductId) {
  const product = ALL_PRODUCTS.find((item) => item.id === id);

  if (!product) {
    throw new Error(`Produto não cadastrado: ${id}`);
  }

  return product;
}

export function getProductFooterName(id: ProductId): string {
  switch (id) {
    case "organizer":
      return "Iungo Organizer AI PIM";
    case "behavior":
      return "Iungo Behavior CDP";
    default:
      return getProductById(id).name;
  }
}
