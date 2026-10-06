import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const ATTENDANT_TESTIMONIALS: readonly Pick<
  ProductTestimonialItem,
  "id" | "initials" | "avatarClassName" | "metricValue"
>[] = [
  {
    id: "sandra-v",
    initials: "SV",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    metricValue: "−75%",
  },
  {
    id: "henrique-l",
    initials: "HL",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    metricValue: "0",
  },
];
