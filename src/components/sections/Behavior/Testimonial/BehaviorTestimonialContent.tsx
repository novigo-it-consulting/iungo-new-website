import { getTranslations } from "next-intl/server";

import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export default async function BehaviorTestimonialContent() {
  const t = await getTranslations("productPages.behavior.spotlight");

  return (
    <div
      data-behavior-testimonial-content
      className="mx-auto flex w-full max-w-[1024px] flex-col gap-4"
    >
      <div
        data-behavior-testimonial-title-block
        className="w-full px-8"
      >
        <blockquote
          data-behavior-testimonial-quote
          className={productSectionTitleClassName}
        >
          {t("quote")}
        </blockquote>
      </div>

      <div
        data-behavior-testimonial-subtitle-block
        className="w-full px-8"
      >
        <p
          data-behavior-testimonial-attribution
          className={productSectionDescriptionClassName}
        >
          {t("attribution")}
        </p>
      </div>
    </div>
  );
}
