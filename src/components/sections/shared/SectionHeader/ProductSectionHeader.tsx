import ProductSectionEyebrow from "./ProductSectionEyebrow";
import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

type ProductSectionHeaderProps = {
  blockSlug: string;
  eyebrow: string;
  title: string;
  titleId: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const DEFAULT_TITLE_CLASS = productSectionTitleClassName;

const DEFAULT_DESCRIPTION_CLASS = productSectionDescriptionClassName;

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
