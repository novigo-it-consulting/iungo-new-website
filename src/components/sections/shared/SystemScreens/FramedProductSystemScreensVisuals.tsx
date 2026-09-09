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

type FramedProductSystemScreensVisualsProps = {
  productSlug: string;
  main: ProductSystemScreenMainImage;
  gridItems: readonly ProductSystemScreenImage[];
  mainSizes?: string;
};

export default function FramedProductSystemScreensVisuals({
  productSlug,
  main,
  gridItems,
  mainSizes = productSystemScreensMainSizes,
}: FramedProductSystemScreensVisualsProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-visuals`]: true,
      }}
      className={productSystemScreensVisualsClassName}
    >
      <div
        {...{
          [`data-${productSlug}-system-screens-main-frame`]: true,
        }}
        className="overflow-hidden rounded-2xl"
      >
        <Image
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          unoptimized
          sizes={mainSizes}
          className={productSystemScreensImageClassName}
        />
      </div>

      <ProductSystemScreensImageGrid
        productSlug={productSlug}
        items={gridItems}
        itemClassName="w-full min-w-0 overflow-hidden rounded-xl"
      />
    </div>
  );
}
