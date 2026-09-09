import type { ProductSystemScreensHeaderClassNames } from "./productSystemScreens.types";

const defaultContainerClassName =
  "mx-auto flex w-full max-w-[672px] flex-col gap-3 text-center";

const defaultTitleClassName =
  "m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]";

const defaultDescriptionClassName =
  "m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]";

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
}: ProductSystemScreensHeaderProps) {
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
