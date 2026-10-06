import { getTranslations } from "next-intl/server";

import BehaviorTestimonialContent from "./BehaviorTestimonialContent";

export default async function BehaviorTestimonialSection() {
  const t = await getTranslations("productPages.behavior.spotlight");

  return (
    <section
      data-behavior-testimonial-section
      aria-label={t("ariaLabel")}
      className="w-full min-w-0 bg-[rgba(244,244,245,0.40)] xl:min-h-[280px]"
    >
      <div
        data-behavior-testimonial-container
        className="mx-auto box-border w-full max-w-[1909px] px-6 py-[80px] sm:px-8 min-[1909px]:px-[442px]"
      >
        <BehaviorTestimonialContent />
      </div>
    </section>
  );
}
