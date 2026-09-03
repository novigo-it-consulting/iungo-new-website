import ProductTestimonialsCards from "@/components/sections/shared/Testimonials/ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "@/components/sections/shared/Testimonials/ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "@/components/sections/shared/Testimonials/ProductTestimonialsHeader";

import { IOT_TESTIMONIALS } from "./iotTestimonials.constants";

export default function IoTTestimonials() {
  return (
    <section
      data-iot-testimonials
      aria-labelledby="iot-testimonials-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductTestimonialsHeader
        productSlug="iot"
        title="Quem rastreia ativo crítico, fala."
        description="Diretores de TI e supply chain que reduziram prejuízo, fechamento contábil e auditoria física."
      />

      <ProductTestimonialsCards
        productSlug="iot"
        testimonials={IOT_TESTIMONIALS}
        variant="iot"
      />

      <ProductTestimonialsDisclaimer productSlug="iot" />
    </section>
  );
}
