export interface ProductCardCopyConfig {
  readonly description: string;
  readonly titleClassName: string;
  readonly descriptionClassName: string;
}

interface ProductCardCopyProps extends ProductCardCopyConfig {
  productId: string;
  title: string;
}

export default function ProductCardCopy({
  productId,
  title,
  description,
  titleClassName,
  descriptionClassName,
}: ProductCardCopyProps) {
  return (
    <div
      data-product-copy={productId}
      className="flex w-full max-w-full flex-col gap-[12px] 2xl:w-fit"
    >
      <h3
        data-product-title={productId}
        className={`flex w-full shrink-0 items-center text-left font-reddit text-[20px] font-bold leading-[28px] tracking-[0.25px] text-[#041527] 2xl:text-[24.04px] 2xl:leading-[27.4px] 2xl:tracking-[0.3px] ${titleClassName}`}
      >
        {title}
      </h3>

      <p
        data-product-description={productId}
        className={`flex w-full items-center text-left font-reddit text-[16px] font-normal leading-[26px] tracking-[0.4px] text-[#041527] 2xl:text-[16.02px] 2xl:leading-[26.44px] 2xl:tracking-[0.5px] ${descriptionClassName}`}
      >
        {description}
      </p>
    </div>
  );
}
