import PageContainer from "@/components/layout/PageContainer";

import type { ProductSystemScreensContent } from "./productSystemScreens.types";
import PlainProductSystemScreensVisuals from "./PlainProductSystemScreensVisuals";
import ProductSystemScreensBadges from "./ProductSystemScreensBadges";
import ProductSystemScreensHeader from "./ProductSystemScreensHeader";

type PlainProductSystemScreensSectionProps = {
  readonly productSlug: string;
} & ProductSystemScreensContent;

export default function PlainProductSystemScreensSection({
  productSlug,
  title,
  description,
  ariaLabel,
  badges,
  main,
  gridItems,
  inactiveBorderClassName = "border-[#D3D5D8]",
  headerClassNames,
}: PlainProductSystemScreensSectionProps) {
  return (
    <section
      {...{
        [`data-${productSlug}-system-screens-section`]: true,
      }}
      aria-labelledby={`${productSlug}-system-screens-title`}
      className="w-full min-w-0 bg-white py-16 xl:py-[96px]"
    >
      <PageContainer
        {...{
          [`data-${productSlug}-system-screens-container`]: true,
        }}
        size="content1280"
        className="min-w-0"
      >
        <ProductSystemScreensHeader
          productSlug={productSlug}
          title={title}
          description={description}
          classNames={headerClassNames}
        />

        <ProductSystemScreensBadges
          productSlug={productSlug}
          ariaLabel={ariaLabel}
          badges={badges}
          inactiveBorderClassName={inactiveBorderClassName}
        />

        <PlainProductSystemScreensVisuals
          productSlug={productSlug}
          main={main}
          gridItems={gridItems}
        />
      </PageContainer>
    </section>
  );
}
