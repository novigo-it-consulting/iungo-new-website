import PageContainer from "@/components/layout/PageContainer";
import {
  homeProductsSubtitleClassName,
  homeSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

import ProductCard from "./ProductCard";
import {
  FIRST_ROW_PRODUCTS,
  SECOND_ROW_PRODUCTS,
} from "./products.constants";

export default function ProductsSection() {
  return (
    <section
      data-products-section
      className="w-full bg-white"
    >
      <PageContainer
        size="content1264"
        data-page-main-content="products"
        className="flex flex-col items-center pt-12 2xl:pt-[35px]"
      >
        <div
          data-products-heading-group
          className="mx-auto flex w-full flex-col items-center max-xl:gap-2 xl:h-[89.34px] xl:max-w-[1265.91px]"
        >
          <h2
            data-products-heading
            className={`${homeSectionTitleClassName} xl:h-[59.06px] xl:w-[1265.91px]`}
          >
            7 produtos. Um único cérebro.
          </h2>

          <p
            data-products-description
            className={homeProductsSubtitleClassName}
          >
            Nativamente integrados sobre 3 engines proprietárias de IA. Compre
            por módulo ou em pacotes Go-to-Market.
          </p>
        </div>

        <div
          data-products-grid
          data-page-content-anchor="products"
          className="mx-auto mt-8 box-border grid w-full grid-cols-1 items-start content-start gap-y-6 md:grid-cols-2 md:gap-x-6 xl:h-[705.64px] xl:max-w-[1262.13px] xl:grid-cols-8 xl:gap-x-[24.29px] xl:gap-y-[24.35px]"
        >
          {[...FIRST_ROW_PRODUCTS, ...SECOND_ROW_PRODUCTS].map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              productName={product.name}
              className={product.className}
              ctaHref={product.ctaHref ?? undefined}
              ctaLabel={product.ctaLabel}
              ctaAriaLabel={product.ctaAriaLabel ?? undefined}
              copy={product.copy ?? undefined}
              icon={product.icon ?? undefined}
              contentClassName={product.contentClassName}
              contentGapClassName={
                product.contentGapClassName ?? undefined
              }
              cardPaddingClassName={
                product.cardPaddingClassName ?? undefined
              }
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
