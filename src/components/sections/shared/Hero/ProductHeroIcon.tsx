import Image from "next/image";

import {
  PRODUCT_HERO_ICON_SIZE_CLASS_NAMES,
  type ProductHeroIconConfig,
} from "./productHeroIcon.config";

type ProductHeroIconProps = ProductHeroIconConfig;

export default function ProductHeroIcon({
  productSlug,
  iconSrc,
  backgroundColor,
  sizePreset,
}: Readonly<ProductHeroIconProps>) {
  return (
    <div
      {...{ [`data-${productSlug}-hero-icon`]: true }}
      aria-hidden="true"
      style={{ backgroundColor }}
      className={`flex shrink-0 items-center justify-center ${PRODUCT_HERO_ICON_SIZE_CLASS_NAMES[sizePreset]}`}
    >
      <span className="relative block size-full">
        <Image
          src={iconSrc}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 71px, (min-width: 640px) 44px, 40px"
          className="object-contain"
        />
      </span>
    </div>
  );
}
