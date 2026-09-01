import { TESTIMONIALS_DISCLAIMER_TEXT } from "@/components/sections/shared/testimonials.constants";

type ProductTestimonialsDisclaimerProps = {
  productSlug: string;
};

export default function ProductTestimonialsDisclaimer({
  productSlug,
}: ProductTestimonialsDisclaimerProps) {
  return (
    <p
      {...{
        [`data-${productSlug}-testimonials-disclaimer`]: true,
      }}
      className="mt-10 w-full max-w-[1088px] text-center font-reddit text-[12px] font-normal leading-[16px] tracking-normal text-[#71717A]"
    >
      {TESTIMONIALS_DISCLAIMER_TEXT}
    </p>
  );
}
