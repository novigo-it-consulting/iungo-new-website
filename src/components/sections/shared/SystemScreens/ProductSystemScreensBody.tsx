import ProductSystemScreensBadges from "./ProductSystemScreensBadges";
import ProductSystemScreensHeader from "./ProductSystemScreensHeader";
import ProductSystemScreensVisuals from "./ProductSystemScreensVisuals";
import type { ProductSystemScreensContent } from "./productSystemScreens.types";

type ProductSystemScreensBodyProps = {
  productSlug: string;
  framed?: boolean;
  mainSizes?: string;
} & ProductSystemScreensContent;

export default function ProductSystemScreensBody({
  productSlug,
  title,
  description,
  ariaLabel,
  badges,
  main,
  gridItems,
  inactiveBorderClassName = "border-[#D3D5D8]",
  headerClassNames,
  mainSizes,
  framed = false,
}: Readonly<ProductSystemScreensBodyProps>) {
  return (
    <>
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

      <ProductSystemScreensVisuals
        productSlug={productSlug}
        main={main}
        gridItems={gridItems}
        mainSizes={mainSizes}
        framed={framed}
      />
    </>
  );
}
