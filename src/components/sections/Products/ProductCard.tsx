import type { ReactNode } from "react";
import ProductCardCopy, {
  type ProductCardCopyConfig,
} from "./ProductCardCopy";
import ProductCardCta from "./ProductCardCta";
import ProductCardIcon from "./ProductCardIcon";

export interface ProductCardIconConfig {
  src: string;
  backgroundClassName: string;
}

interface ProductCardProps {
  productId: string;
  productName: string;
  className?: string;
  ctaHref?: string;
  ctaLabel?: string;
  copy?: ProductCardCopyConfig;
  icon?: ProductCardIconConfig;
  contentClassName?: string;
  contentGapClassName?: string;
  cardPaddingClassName?: string;
  children?: ReactNode;
}

export default function ProductCard({
  productId,
  productName,
  className = "",
  ctaHref,
  ctaLabel = "Saiba mais",
  copy,
  icon,
  contentClassName = "",
  contentGapClassName,
  cardPaddingClassName,
  children,
}: ProductCardProps) {
  const hasContent = icon || copy;
  const resolvedContentGapClassName =
    contentGapClassName ?? "2xl:gap-[38px]";
  const resolvedPaddingClassName =
    cardPaddingClassName ?? "2xl:p-8";

  return (
    <article
      data-product-card={productId}
      aria-label={productName}
      className={`box-border flex w-full flex-col rounded-[20.03px] border border-[#D3D5D8] bg-[linear-gradient(180deg,_#FFFFFF_0%,_#EEF6FF_100%)] p-6 xl:p-8 ${resolvedPaddingClassName} ${className}`}
    >
      {children}

      {hasContent ? (
        <div
          data-product-content={productId}
          className={`flex w-full flex-col gap-6 ${resolvedContentGapClassName} ${contentClassName}`}
        >
          {icon ? (
            <ProductCardIcon
              productId={productId}
              src={icon.src}
              backgroundClassName={icon.backgroundClassName}
            />
          ) : null}

          {copy ? (
            <ProductCardCopy
              productId={productId}
              title={productName}
              description={copy.description}
            />
          ) : null}
        </div>
      ) : null}

      {ctaHref ? (
        <div className="mt-auto">
          <ProductCardCta
            productId={productId}
            href={ctaHref}
            label={ctaLabel}
          />
        </div>
      ) : null}
    </article>
  );
}
