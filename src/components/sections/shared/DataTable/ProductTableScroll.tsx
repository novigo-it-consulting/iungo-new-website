import type { ReactNode } from "react";

import { primaryFocusVisibleClassName } from "@/components/ui/buttonInteraction.styles";

import ProductTableScrollRegion from "./ProductTableScrollRegion";

// contain-paint segura a largura da tabela dentro da rolagem.
// Os ancestrais flex/grid já usam min-w-0; sem isso o Chrome soma a tabela ao scroll da página.
const productTableScrollClassName = [
  "w-full min-w-0 contain-paint overflow-x-auto overscroll-x-contain",
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
    <ProductTableScrollRegion
      ariaLabel={ariaLabel}
      className={`${productTableScrollClassName} ${className}`}
      dataSlug={dataSlug}
    >
      <div
        {...(dataSlug
          ? { "data-product-text-table-container": dataSlug }
          : {})}
        className={`${productTableFrameClassName} ${frameClassName}`}
      >
        {children}
      </div>
    </ProductTableScrollRegion>
  );
}
