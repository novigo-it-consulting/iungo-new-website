import Image from "next/image";

import type {
  ProductSystemScreenImage,
  ProductSystemScreenMainImage,
} from "./productSystemScreens.types";

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
      className="mx-auto mt-6 flex w-full max-w-[1216px] flex-col gap-6"
    >
      <Image
        src={main.src}
        alt={main.alt}
        width={main.width}
        height={main.height}
        unoptimized
        sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
        className="block h-auto w-full"
      />

      <div
        {...{
          [`data-${productSlug}-system-screens-grid`]: true,
        }}
        className="grid w-full min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-3"
      >
        {gridItems.map((item) => (
          <Image
            key={item.id}
            {...{
              [`data-${productSlug}-system-screens-grid-item`]: item.id,
            }}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            unoptimized
            sizes="(min-width: 1024px) calc((100vw - 64px - 32px) / 3), calc(100vw - 48px)"
            className="block h-auto min-w-0 w-full"
          />
        ))}
      </div>
    </div>
  );
}
