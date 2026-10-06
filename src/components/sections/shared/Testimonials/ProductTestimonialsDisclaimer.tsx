import { getTranslations } from "next-intl/server";

type ProductTestimonialsDisclaimerProps = {
  productSlug: string;
};

export default async function ProductTestimonialsDisclaimer({
  productSlug,
}: Readonly<ProductTestimonialsDisclaimerProps>) {
  const t = await getTranslations("productPages.shared.testimonials");

  return (
    <p
      {...{
        [`data-${productSlug}-testimonials-disclaimer`]: true,
      }}
      className="mt-10 w-full max-w-[1088px] text-center font-reddit text-[12px] font-normal leading-[16px] tracking-normal text-[#71717A]"
    >
      {t("disclaimer")}
    </p>
  );
}
