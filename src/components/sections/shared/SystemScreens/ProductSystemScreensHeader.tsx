type ProductSystemScreensHeaderProps = {
  productSlug: string;
  title: string;
  description: string;
};

export default function ProductSystemScreensHeader({
  productSlug,
  title,
  description,
}: ProductSystemScreensHeaderProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-header`]: true,
      }}
      className="mx-auto flex w-full max-w-[672px] flex-col gap-3 text-center"
    >
      <div
        {...{
          [`data-${productSlug}-system-screens-title-frame`]: true,
        }}
        className="w-full pt-1"
      >
        <h2
          id={`${productSlug}-system-screens-title`}
          {...{
            [`data-${productSlug}-system-screens-title`]: true,
          }}
          className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
        >
          {title}
        </h2>
      </div>

      <p
        {...{
          [`data-${productSlug}-system-screens-description`]: true,
        }}
        className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
      >
        {description}
      </p>
    </div>
  );
}
