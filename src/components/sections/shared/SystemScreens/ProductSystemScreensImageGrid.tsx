import Image from "next/image";

import type { ProductSystemScreenImage } from "./productSystemScreens.types";
import {
  productSystemScreensGridItemClassName,
  productSystemScreensGridItemSizes,
  productSystemScreensImageClassName,
  productSystemScreensImageGridClassName,
} from "./productSystemScreens.styles";

type ProductSystemScreensImageGridProps = {
  productSlug: string;
  items: readonly ProductSystemScreenImage[];
  className?: string;
  itemClassName?: string;
};

export default function ProductSystemScreensImageGrid({
  productSlug,
  items,
  className,
  itemClassName = productSystemScreensGridItemClassName,
}: Readonly<ProductSystemScreensImageGridProps>) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-grid`]: true,
      }}
      className={
        className
          ? `${productSystemScreensImageGridClassName} ${className}`
          : productSystemScreensImageGridClassName
      }
    >
      {items.map((item) => (
        <div
          key={item.id}
          {...{
            [`data-${productSlug}-system-screens-grid-item`]: item.id,
          }}
          className={itemClassName}
        >
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            unoptimized
            sizes={productSystemScreensGridItemSizes}
            className={productSystemScreensImageClassName}
          />
        </div>
      ))}
    </div>
  );
}
