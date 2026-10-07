export interface ProductCardCopyConfig {
  readonly description: string;
}

interface ProductCardCopyProps extends ProductCardCopyConfig {
  productId: string;
  title: string;
}

export default function ProductCardCopy({
  productId,
  title,
  description,
}: Readonly<ProductCardCopyProps>) {
  return (
    <div
      data-product-copy={productId}
      className="flex w-full flex-col items-start gap-[18.93px]"
    >
      <h3
        data-product-title={productId}
        className="m-0 min-h-[21px] w-fit font-reddit text-[18.2px] font-bold leading-[20.7px] tracking-[0.23px] text-left text-[#041527]"
      >
        {title}
      </h3>

      <p
        data-product-description={productId}
        className="m-0 h-auto min-h-[81px] w-full max-w-[401.28px] font-reddit text-[12.13px] font-normal leading-[20px] tracking-[0.38px] text-left text-[#041527]"
      >
        {description}
      </p>
    </div>
  );
}
