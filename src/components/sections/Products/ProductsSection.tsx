import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import {
  homeProductsSubtitleClassName,
  homeSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

import ProductCard from "./ProductCard";
import {
  FIRST_ROW_PRODUCTS,
  SECOND_ROW_PRODUCTS,
  type ProductId,
} from "./products.constants";

type ProductsTranslator = Awaited<ReturnType<typeof getTranslations<"products">>>;

function cardDescription(id: ProductId, tProducts: ProductsTranslator): string {
  if (id === "iot") {
    return tProducts("iot.homeDescription");
  }

  return tProducts(`${id}.description`);
}

function ProductsHeading({
  title,
  subtitle,
}: {
  readonly title: string;
  readonly subtitle: string;
}) {
  return (
    <div
      data-products-heading-group
      className="mx-auto flex w-full flex-col items-center max-xl:gap-2 xl:h-[89.34px] xl:max-w-[1265.91px]"
    >
      <h2
        data-products-heading
        className={`${homeSectionTitleClassName} xl:h-[59.06px] xl:w-[1265.91px]`}
      >
        {title}
      </h2>

      <p data-products-description className={homeProductsSubtitleClassName}>
        {subtitle}
      </p>
    </div>
  );
}

function ProductsGrid({
  descriptionFor,
  learnMore,
  learnMoreAbout,
}: {
  readonly descriptionFor: (id: ProductId) => string;
  readonly learnMore: string;
  readonly learnMoreAbout: (productName: string) => string;
}) {
  return (
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
          ctaLabel={learnMore}
          ctaAriaLabel={learnMoreAbout(product.name)}
          copy={{ description: descriptionFor(product.id) }}
          icon={product.icon ?? undefined}
          contentClassName={product.contentClassName}
          contentGapClassName={product.contentGapClassName ?? undefined}
          cardPaddingClassName={product.cardPaddingClassName ?? undefined}
        />
      ))}
    </div>
  );
}

export default async function ProductsSection() {
  const tHome = await getTranslations("home.products");
  const tProducts = await getTranslations("products");
  const tCommon = await getTranslations("common");

  return (
    <section data-products-section className="w-full bg-white">
      <PageContainer
        size="content1264"
        data-page-main-content="products"
        className="flex flex-col items-center pt-12 2xl:pt-[35px]"
      >
        <ProductsHeading title={tHome("title")} subtitle={tHome("subtitle")} />
        <ProductsGrid
          descriptionFor={(id) => cardDescription(id, tProducts)}
          learnMore={tCommon("learnMore")}
          learnMoreAbout={(productName) =>
            tCommon("learnMoreAbout", { productName })
          }
        />
      </PageContainer>
    </section>
  );
}
