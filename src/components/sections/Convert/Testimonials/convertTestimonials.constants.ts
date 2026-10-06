import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const CONVERT_TESTIMONIALS: readonly Pick<
  ProductTestimonialItem,
  "id" | "initials" | "avatarClassName" | "metricValue"
>[] = [
  {
    id: "daniel-p",
    initials: "DP",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    metricValue: "2x",
  },
  {
    id: "vivian-k",
    initials: "VK",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    metricValue: "+34%",
  },
];
