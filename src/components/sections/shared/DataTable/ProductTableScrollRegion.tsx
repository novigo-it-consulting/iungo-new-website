"use client";

import { useRef, type ReactNode } from "react";

import { useHasHorizontalOverflow } from "./useHasHorizontalOverflow";

type ProductTableScrollRegionProps = {
  ariaLabel: string;
  children: ReactNode;
  className: string;
  dataSlug?: string;
};

export default function ProductTableScrollRegion({
  ariaLabel,
  children,
  className,
  dataSlug,
}: Readonly<ProductTableScrollRegionProps>) {
  const regionRef = useRef<HTMLElement>(null);
  const hasOverflow = useHasHorizontalOverflow(regionRef);
  const tabIndex = hasOverflow ? 0 : undefined;

  return (
    <section
      ref={regionRef}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      {...(dataSlug ? { "data-product-text-table": dataSlug } : {})}
      className={className}
    >
      {children}
    </section>
  );
}
