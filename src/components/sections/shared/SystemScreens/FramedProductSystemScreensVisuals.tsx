import Image from "next/image";

import type {
  ProductSystemScreenImage,
  ProductSystemScreenMainImage,
} from "./productSystemScreens.types";

type FramedProductSystemScreensVisualsProps = {
  productSlug: string;
  main: ProductSystemScreenMainImage;
  gridItems: readonly ProductSystemScreenImage[];
  mainSizes: string;
  includeMainImageDataAttribute?: boolean;
};

export default function FramedProductSystemScreensVisuals({
  productSlug,
  main,
  gridItems,
  mainSizes,
  includeMainImageDataAttribute = false,
}: FramedProductSystemScreensVisualsProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-visuals`]: true,
      }}
      className="mx-auto mt-6 flex w-full max-w-[1216px] flex-col gap-6"
    >
      <div
        {...{
          [`data-${productSlug}-system-screens-main-frame`]: true,
        }}
        className="overflow-hidden rounded-2xl"
      >
        <Image
          {...(includeMainImageDataAttribute
            ? { [`data-${productSlug}-system-screens-main`]: true }
            : {})}
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          unoptimized
          sizes={mainSizes}
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div
        {...{
          [`data-${productSlug}-system-screens-grid`]: true,
        }}
        className="grid w-full min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-3"
      >
        {gridItems.map((item) => (
          <div
            key={item.id}
            {...{
              [`data-${productSlug}-system-screens-grid-item`]: item.id,
            }}
            className="overflow-hidden rounded-xl"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              unoptimized
              sizes="(min-width: 1024px) calc((100vw - 64px - 32px) / 3), calc(100vw - 48px)"
              className="block h-auto min-w-0 w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
