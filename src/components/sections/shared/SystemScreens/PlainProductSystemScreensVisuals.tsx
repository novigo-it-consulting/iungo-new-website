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

type PlainProductSystemScreensVisualsProps = {
  productSlug: string;
  main: ProductSystemScreenMainImage;
  gridItems: readonly ProductSystemScreenImage[];
};

export default function PlainProductSystemScreensVisuals({
  productSlug,
  main,
  gridItems,
}: PlainProductSystemScreensVisualsProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-visuals`]: true,
      }}
      className={productSystemScreensVisualsClassName}
    >
      <Image
        src={main.src}
        alt={main.alt}
        width={main.width}
        height={main.height}
        unoptimized
        sizes={productSystemScreensMainSizes}
        className={productSystemScreensImageClassName}
      />

      <ProductSystemScreensImageGrid productSlug={productSlug} items={gridItems} />
    </div>
  );
}
