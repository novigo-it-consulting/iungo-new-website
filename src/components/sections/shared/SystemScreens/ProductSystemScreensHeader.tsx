import type { ProductSystemScreensHeaderClassNames } from "./productSystemScreens.types";
import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

const defaultContainerClassName =
  "mx-auto flex w-full max-w-[672px] flex-col gap-3 text-center";

const defaultTitleClassName = productSectionTitleClassName;

const defaultDescriptionClassName = productSectionDescriptionClassName;

type ProductSystemScreensHeaderProps = {
  productSlug: string;
  title: string;
  description: string;
  classNames?: ProductSystemScreensHeaderClassNames;
};

export default function ProductSystemScreensHeader({
  productSlug,
  title,
  description,
  classNames,
}: Readonly<ProductSystemScreensHeaderProps>) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-header`]: true,
      }}
      className={classNames?.container ?? defaultContainerClassName}
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
          className={classNames?.title ?? defaultTitleClassName}
        >
          {title}
        </h2>
      </div>

      <p
        {...{
          [`data-${productSlug}-system-screens-description`]: true,
        }}
        className={classNames?.description ?? defaultDescriptionClassName}
      >
        {description}
      </p>
    </div>
  );
}
