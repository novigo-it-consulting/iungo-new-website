import PageContainer from "@/components/layout/PageContainer";

import type { ProductSystemScreensContent } from "./productSystemScreens.types";
import ProductSystemScreensBody from "./ProductSystemScreensBody";

type PlainProductSystemScreensSectionProps = {
  readonly productSlug: string;
} & ProductSystemScreensContent;

export default function PlainProductSystemScreensSection({
  productSlug,
  ...content
}: Readonly<PlainProductSystemScreensSectionProps>) {
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
        <ProductSystemScreensBody productSlug={productSlug} {...content} />
      </PageContainer>
    </section>
  );
}
