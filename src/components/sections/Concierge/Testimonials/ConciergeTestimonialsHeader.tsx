import { getTranslations } from "next-intl/server";

import SectionEyebrow from "@/components/ui/SectionEyebrow";
import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export default async function ConciergeTestimonialsHeader() {
  const tCommon = await getTranslations("common");
  const t = await getTranslations("productPages.concierge.testimonials");

  return (
    <header
      data-concierge-testimonials-header
      className="flex w-full max-w-[672px] flex-col items-center gap-3"
    >
      <SectionEyebrow variant="compact">{tCommon("testimonials")}</SectionEyebrow>

      <div
        data-concierge-testimonials-title-frame
        className="flex w-full items-start justify-center pr-1 xl:h-[40px]"
      >
        <h2
          id="concierge-testimonials-title"
          data-concierge-testimonials-title
            className={`${productSectionTitleClassName} w-full max-w-[496px]`}
        >
          {t("title")}
        </h2>
      </div>

      <p
        data-concierge-testimonials-description
        className={`${productSectionDescriptionClassName} max-w-[619px]`}
      >
        {t("description")}
      </p>
    </header>
  );
}
