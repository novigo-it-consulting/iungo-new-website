import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import { PRODUCT_PAGE_CTA_LABEL } from "@/components/sections/shared/cta.constants";

import {
  productHeroCtaClassName,
  productHeroCtaCompactClassName,
} from "./productHero.styles";

type ProductHeroCtaProps = {
  productSlug: string;
  compact?: boolean;
  className?: string;
};

export default function ProductHeroCta({
  productSlug,
  compact = false,
  className,
}: Readonly<ProductHeroCtaProps>) {
  const resolvedClassName =
    className ??
    (compact ? productHeroCtaCompactClassName : productHeroCtaClassName);

  return (
    <div
      {...{ [`data-${productSlug}-hero-cta`]: true }}
      className={resolvedClassName}
    >
      <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
        {PRODUCT_PAGE_CTA_LABEL}
      </PrimaryLink>
    </div>
  );
}
