import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "@/components/sections/shared/Testimonials/ProductTestimonialsHeader";

import { RESOLVE_TESTIMONIALS } from "./resolveTestimonials.constants";

export default function ResolveTestimonials() {
  return (
    <div
      data-resolve-testimonials
      aria-labelledby="resolve-testimonials-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductTestimonialsHeader
        productSlug="resolve"
        title="CX que cresce sem inflar headcount."
        description="Líderes de atendimento que automatizaram L1/L2 sem perder qualidade nem CSAT."
      />

      <ProductTestimonialsCards
        productSlug="resolve"
        testimonials={RESOLVE_TESTIMONIALS}
        variant="resolve"
      />

      <ProductTestimonialsDisclaimer productSlug="resolve" />
    </div>
  );
}
