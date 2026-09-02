import ProductSectionEyebrow from "./ProductSectionEyebrow";

type ProductSectionHeaderProps = {
  blockSlug: string;
  eyebrow: string;
  title: string;
  titleId: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const DEFAULT_TITLE_CLASS =
  "m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] text-center md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]";

const DEFAULT_DESCRIPTION_CLASS =
  "m-0 font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A] text-center";

export default function ProductSectionHeader({
  blockSlug,
  eyebrow,
  title,
  titleId,
  description,
  titleClassName = DEFAULT_TITLE_CLASS,
  descriptionClassName = DEFAULT_DESCRIPTION_CLASS,
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
        className={titleClassName}
      >
        {title}
      </h2>

      <p
        {...{
          [`data-${blockSlug}-description`]: true,
        }}
        className={descriptionClassName}
      >
        {description}
      </p>
    </div>
  );
}
