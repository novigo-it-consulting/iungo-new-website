import TestimonialCard from "@/components/ui/TestimonialCard";

import type {
  ProductTestimonialItem,
  ProductTestimonialsVariant,
} from "./productTestimonials.types";

type ProductTestimonialsCardsProps = {
  productSlug: string;
  testimonials: readonly ProductTestimonialItem[];
  variant: ProductTestimonialsVariant;
  listClassName?: string;
};

export default function ProductTestimonialsCards({
  productSlug,
  testimonials,
  variant,
  listClassName = "mt-10 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-2",
}: Readonly<ProductTestimonialsCardsProps>) {
  return (
    <ul
      {...{
        [`data-${productSlug}-testimonials-cards`]: true,
      }}
      className={listClassName}
    >
      {testimonials.map((testimonial) => (
        <li key={testimonial.id} className="min-w-0">
          <TestimonialCard
            variant={variant}
            quote={testimonial.quote}
            initials={testimonial.initials}
            avatarClassName={testimonial.avatarClassName}
            name={testimonial.name}
            role={testimonial.role}
            metricValue={testimonial.metricValue}
            metricLabel={testimonial.metricLabel}
          />
        </li>
      ))}
    </ul>
  );
}
