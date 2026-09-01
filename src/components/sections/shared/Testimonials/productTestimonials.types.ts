import type { TestimonialCardProps } from "@/components/ui/TestimonialCard";

export type ProductTestimonialItem = {
  id: string;
  quote: string;
  initials: string;
  avatarClassName: string;
  name: string;
  role: string;
  metricValue: string;
  metricLabel: string;
};

export type ProductTestimonialsVariant = NonNullable<
  TestimonialCardProps["variant"]
>;
