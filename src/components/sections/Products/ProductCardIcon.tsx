import Image from "next/image";

interface ProductCardIconProps {
  productId: string;
  src: string;
  backgroundClassName: string;
}

export default function ProductCardIcon({
  productId,
  src,
  backgroundClassName,
}: Readonly<ProductCardIconProps>) {
  return (
    <div
      data-product-icon={productId}
      className={`box-border inline-flex h-[51.44px] w-[51.44px] shrink-0 items-center justify-center gap-[10.72px] overflow-visible rounded-[12.86px] border-0 p-[8.57px] shadow-none ${backgroundClassName}`}
    >
      <span
        data-product-icon-glyph={productId}
        className="relative block h-[30px] w-[30px] shrink-0"
      >
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="30px"
          className="object-contain"
        />
      </span>
    </div>
  );
}
