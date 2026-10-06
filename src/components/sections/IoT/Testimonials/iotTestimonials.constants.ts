import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const IOT_TESTIMONIALS: readonly Pick<
  ProductTestimonialItem,
  "id" | "initials" | "avatarClassName" | "metricValue"
>[] = [
  {
    id: "luis-f",
    initials: "LF",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    metricValue: "< 1%",
  },
  {
    id: "claudia-b",
    initials: "CB",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    metricValue: "−90%",
  },
];
