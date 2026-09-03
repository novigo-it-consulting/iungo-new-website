import ProductTestimonialsCards from "./ProductTestimonialsCards";
import ProductTestimonialsDisclaimer from "./ProductTestimonialsDisclaimer";
import ProductTestimonialsHeader from "./ProductTestimonialsHeader";
import type {
  ProductTestimonialItem,
  ProductTestimonialsVariant,
} from "./productTestimonials.types";

type ProductTestimonialsSectionProps = {
  productSlug: string;
  title: string;
  description: string;
  testimonials: readonly ProductTestimonialItem[];
  variant: ProductTestimonialsVariant;
  className?: string;
};

export default function ProductTestimonialsSection({
  productSlug,
  title,
  description,
  testimonials,
  variant,
  className = "flex w-full min-w-0 flex-col items-center",
}: Readonly<ProductTestimonialsSectionProps>) {
  return (
    <section
      {...{ [`data-${productSlug}-testimonials`]: true }}
      aria-labelledby={`${productSlug}-testimonials-title`}
      className={className}
    >
      <ProductTestimonialsHeader
        productSlug={productSlug}
        title={title}
        description={description}
      />

      <ProductTestimonialsCards
        productSlug={productSlug}
        testimonials={testimonials}
        variant={variant}
      />

      <ProductTestimonialsDisclaimer productSlug={productSlug} />
    </section>
  );
}
