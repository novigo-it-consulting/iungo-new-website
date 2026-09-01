import { TESTIMONIALS_DISCLAIMER_TEXT } from "@/components/sections/shared/testimonials.constants";

export default function ResolveTestimonialsDisclaimer() {
  return (
    <p
      data-resolve-testimonials-disclaimer
      className="mt-10 w-full max-w-[1088px] text-center font-reddit text-[12px] font-normal leading-[16px] tracking-normal text-[#71717A]"
    >
      {TESTIMONIALS_DISCLAIMER_TEXT}
    </p>
  );
}
