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
      <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center px-4 pt-12 md:px-8 2xl:px-0 2xl:pt-[35px]">
        <h2
          data-products-heading
          className="flex w-full max-w-[1672px] items-center justify-center text-center font-reddit text-[28px] font-semibold leading-[40px] tracking-[-0.28px] text-[#424241] md:text-[32px] md:leading-[48px] md:tracking-[-0.32px] 2xl:h-[78px] 2xl:text-[40px] 2xl:leading-[96px] 2xl:tracking-[-0.4px]"
        >
          7 produtos. Um único cérebro.
        </h2>

        <p
          data-products-description
          className="flex w-full max-w-[991px] items-center justify-center text-center font-reddit text-[16px] font-normal leading-[28px] tracking-[0px] text-[#909090] md:text-[18px] md:leading-[32px] 2xl:h-[40px] 2xl:text-[20px] 2xl:leading-[40px]"
        >
          Nativamente integrados sobre 3 engines proprietárias de IA. Compre
          por módulo ou em pacotes Go-to-Market.
        </p>

        <div
          data-products-grid
          className="mt-8 w-full max-w-[1667px] 2xl:h-[932px]"
        >
          <div
            data-products-first-row
            className="grid w-full grid-cols-1 items-start gap-6 xl:grid-cols-[1.54fr_1.54fr_1fr] xl:gap-8 2xl:h-[458px] 2xl:grid-cols-[604.92px_604.92px_1fr] 2xl:gap-[31.93px]"
          >
            {FIRST_ROW_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                productName={product.name}
                className={product.className}
                ctaHref={product.ctaHref ?? undefined}
                ctaLabel={product.ctaLabel}
                copy={product.copy ?? undefined}
                icon={product.icon ?? undefined}
                contentClassName={product.contentClassName}
              />
            ))}
          </div>

          <div
            data-products-second-row
            className="mt-6 grid w-full grid-cols-1 items-start gap-6 md:grid-cols-2 xl:mt-8 xl:grid-cols-4 xl:gap-8 2xl:mt-[32.16px] 2xl:h-[441.84px] 2xl:grid-cols-[393px_392.6px_392.6px_1fr] 2xl:gap-[32.0667px]"
          >
            {SECOND_ROW_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                productId={product.id}
                productName={product.name}
                className={product.className}
                ctaHref={product.ctaHref ?? undefined}
                ctaLabel={product.ctaLabel}
                copy={product.copy ?? undefined}
                icon={product.icon ?? undefined}
                contentClassName={product.contentClassName}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
