import Image from "next/image";

import {
  productHeroImageClassName,
  productHeroImageSizes,
  productHeroVisualWrapperClassName,
} from "./productHero.styles";

type ProductHeroVisualProps = {
  productSlug: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ProductHeroVisual({
  productSlug,
  src,
  alt,
  width,
  height,
  className = productHeroVisualWrapperClassName,
}: Readonly<ProductHeroVisualProps>) {
  return (
    <div
      {...{ [`data-${productSlug}-hero-visual`]: true }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
        sizes={productHeroImageSizes}
        className={productHeroImageClassName}
      />
    </div>
  );
}
