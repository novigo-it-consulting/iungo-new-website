import { getTranslations } from "next-intl/server";

import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

type ProductTestimonialsHeaderProps = {
  productSlug: string;
  title: string;
  description: string;
};

export default async function ProductTestimonialsHeader({
  productSlug,
  title,
  description,
}: ProductTestimonialsHeaderProps) {
  const t = await getTranslations("common");

  return (
    <div
      {...{
        [`data-${productSlug}-testimonials-header`]: true,
      }}
      className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-3 text-center"
    >
      <span
        {...{
          [`data-${productSlug}-testimonials-eyebrow`]: true,
        }}
        className="inline-flex items-center justify-center rounded-[999px] border border-[#0024AE]/[0.18] bg-[#0024AE]/[0.07] px-[14px] py-[6px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]"
      >
        {t("testimonials")}
      </span>

      <div
        {...{
          [`data-${productSlug}-testimonials-title-frame`]: true,
        }}
        className="w-full pt-1"
      >
        <h2
          id={`${productSlug}-testimonials-title`}
          {...{
            [`data-${productSlug}-testimonials-title`]: true,
          }}
          className={productSectionTitleClassName}
        >
          {title}
        </h2>
      </div>

      <p
        {...{
          [`data-${productSlug}-testimonials-description`]: true,
        }}
        className={productSectionDescriptionClassName}
      >
        {description}
      </p>
    </div>
  );
}
