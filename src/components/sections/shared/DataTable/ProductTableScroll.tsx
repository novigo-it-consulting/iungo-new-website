import type { ReactNode } from "react";

import { primaryFocusVisibleClassName } from "@/components/ui/buttonInteraction.styles";

const productTableScrollClassName = [
  "w-full min-w-0 overflow-x-auto overscroll-x-contain",
  primaryFocusVisibleClassName,
].join(" ");

const productTableFrameClassName =
  "overflow-hidden border border-[#E4E4E7] bg-white";

type ProductTableScrollProps = {
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  dataSlug?: string;
};

export default function ProductTableScroll({
  ariaLabel,
  children,
  className = "",
  frameClassName = "",
  dataSlug,
}: Readonly<ProductTableScrollProps>) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      {...(dataSlug ? { "data-product-text-table": dataSlug } : {})}
      className={`${productTableScrollClassName} ${className}`}
    >
      <div
        {...(dataSlug
          ? { "data-product-text-table-container": dataSlug }
          : {})}
        className={`${productTableFrameClassName} ${frameClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
