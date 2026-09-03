import type { ReactNode } from "react";

import { productHeroCtaClassName } from "./productHero.styles";

type ProductHeroCtaProps = {
  productSlug: string;
  className?: string;
  children: ReactNode;
};

export default function ProductHeroCta({
  productSlug,
  className = productHeroCtaClassName,
  children,
}: ProductHeroCtaProps) {
  return (
    <div {...{ [`data-${productSlug}-hero-cta`]: true }} className={className}>
      {children}
    </div>
  );
}
