import ProductSectionEyebrow from "./ProductSectionEyebrow";

type ProductSectionHeaderProps = {
  blockSlug: string;
  eyebrow: string;
  title: string;
  titleId: string;
  description: string;
};

export default function ProductSectionHeader({
  blockSlug,
  eyebrow,
  title,
  titleId,
  description,
}: ProductSectionHeaderProps) {
  return (
    <div
      {...{
        [`data-${blockSlug}-header`]: true,
      }}
      className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-4 text-center"
    >
      <ProductSectionEyebrow
        label={eyebrow}
        dataAttribute={`data-${blockSlug}-eyebrow`}
      />

      <h2
        id={titleId}
        {...{
          [`data-${blockSlug}-title`]: true,
        }}
        className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] text-center md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
      >
        {title}
      </h2>

      <p
        {...{
          [`data-${blockSlug}-description`]: true,
        }}
        className="m-0 font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A] text-center"
      >
        {description}
      </p>
    </div>
  );
}
