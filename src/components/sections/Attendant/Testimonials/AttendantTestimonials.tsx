import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "@/components/sections/shared/Testimonials/ProductTestimonialsHeader";

import { ATTENDANT_TESTIMONIALS } from "./attendantTestimonials.constants";

export default function AttendantTestimonials() {
  return (
    <div
      data-attendant-testimonials
      aria-labelledby="attendant-testimonials-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductTestimonialsHeader
        productSlug="attendant"
        title="Operação que não dorme."
        description="Heads de operação e back-office que pararam de tratar tarefa mecânica como trabalho humano."
      />

      <ProductTestimonialsCards
        productSlug="attendant"
        testimonials={ATTENDANT_TESTIMONIALS}
        variant="attendant"
      />

      <ProductTestimonialsDisclaimer productSlug="attendant" />
    </div>
  );
}
