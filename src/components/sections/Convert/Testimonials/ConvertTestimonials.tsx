import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "@/components/sections/shared/Testimonials/ProductTestimonialsHeader";

import { CONVERT_TESTIMONIALS } from "./convertTestimonials.constants";

export default function ConvertTestimonials() {
  return (
    <section
      data-convert-testimonials
      aria-labelledby="convert-testimonials-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductTestimonialsHeader
        productSlug="convert"
        title="O comercial que vende sozinho — e abre porta pro vendedor."
        description="Diretores comerciais que pararam de perder venda quente fora do horário e começaram a entregar pipeline aquecido ao time."
      />

      <ProductTestimonialsCards
        productSlug="convert"
        testimonials={CONVERT_TESTIMONIALS}
        variant="convert"
      />

      <ProductTestimonialsDisclaimer productSlug="convert" />
    </section>
  );
}
