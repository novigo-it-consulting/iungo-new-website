import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";

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
        Solicitar Demonstração
      </PrimaryLink>
    </div>
  );
}
