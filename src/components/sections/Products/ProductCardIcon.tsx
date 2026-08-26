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
}: ProductCardIconProps) {
  return (
    <div
      data-product-icon={productId}
      className={`box-border flex size-14 shrink-0 items-center justify-center rounded-[14px] p-2 2xl:size-[67.93px] 2xl:rounded-[16.98px] 2xl:p-[11.32px] ${backgroundClassName}`}
    >
      <span
        data-product-icon-glyph={productId}
        className="relative block size-9 shrink-0 2xl:size-[42.46px]"
      >
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="43px"
          className="object-contain"
        />
      </span>
    </div>
  );
}
