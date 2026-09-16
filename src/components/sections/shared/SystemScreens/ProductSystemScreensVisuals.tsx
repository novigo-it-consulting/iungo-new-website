import Image from "next/image";

import ProductSystemScreensImageGrid from "./ProductSystemScreensImageGrid";
import type {
  ProductSystemScreenImage,
  ProductSystemScreenMainImage,
} from "./productSystemScreens.types";
import {
  productSystemScreensImageClassName,
  productSystemScreensMainSizes,
  productSystemScreensVisualsClassName,
} from "./productSystemScreens.styles";

type ProductSystemScreensVisualsProps = {
  productSlug: string;
  main: ProductSystemScreenMainImage;
  gridItems: readonly ProductSystemScreenImage[];
  mainSizes?: string;
  framed?: boolean;
};

export default function ProductSystemScreensVisuals({
  productSlug,
  main,
  gridItems,
  mainSizes = productSystemScreensMainSizes,
  framed = false,
}: Readonly<ProductSystemScreensVisualsProps>) {
  const mainImage = (
    <Image
      src={main.src}
      alt={main.alt}
      width={main.width}
      height={main.height}
      unoptimized
      sizes={mainSizes}
      className={productSystemScreensImageClassName}
    />
  );

  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-visuals`]: true,
      }}
      className={productSystemScreensVisualsClassName}
    >
      {framed ? (
        <div
          {...{
            [`data-${productSlug}-system-screens-main-frame`]: true,
          }}
          className="overflow-hidden rounded-2xl"
        >
          {mainImage}
        </div>
      ) : (
        mainImage
      )}

      <ProductSystemScreensImageGrid
        productSlug={productSlug}
        items={gridItems}
        itemClassName={
          framed ? "w-full min-w-0 overflow-hidden rounded-xl" : undefined
        }
      />
    </div>
  );
}
