import PageContainer from "@/components/layout/PageContainer";

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
          className="mx-auto flex w-full flex-col items-center gap-0 xl:h-[89.34px] xl:max-w-[1265.91px]"
        >
          <h2
            data-products-heading
            className="m-0 block w-full text-center font-reddit text-[30px] font-semibold leading-[72.7px] tracking-[-0.01em] text-[#424241] xl:h-[59.06px] xl:w-[1265.91px]"
          >
            7 produtos. Um único cérebro.
          </h2>

          <p
            data-products-description
            className="m-0 block w-full text-center font-reddit text-[15.14px] font-normal leading-[30.3px] tracking-[0] text-[#909090] xl:h-[30.28px] xl:max-w-[750.31px]"
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
