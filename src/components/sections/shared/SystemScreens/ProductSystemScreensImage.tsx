import Image from "next/image";

import type { ProductSystemScreenMainImage } from "./productSystemScreens.types";
import { productSystemScreensImageClassName } from "./productSystemScreens.styles";

type ProductSystemScreensImageProps = {
  image: ProductSystemScreenMainImage;
  sizes: string;
};

export default function ProductSystemScreensImage({
  image,
  sizes,
}: Readonly<ProductSystemScreensImageProps>) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      unoptimized
      sizes={sizes}
      className={productSystemScreensImageClassName}
    />
  );
}
