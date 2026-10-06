import { Link } from "@/i18n/navigation";

import {
  ctaPillBaseClassName,
  ctaPillLabelClassName,
} from "@/components/ui/actionButtonGroup.styles";
import {
  primaryFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";

interface ProductCardCtaProps {
  productId: string;
  href: string;
  label?: string;
  ariaLabel?: string;
}

export default function ProductCardCta({
  productId,
  href,
  label = "Saiba mais",
  ariaLabel,
}: ProductCardCtaProps) {
  return (
    <Link
      data-product-cta={productId}
      href={href}
      aria-label={ariaLabel}
      className={`${ctaPillBaseClassName} h-[40.88px] w-[121.9px] self-start bg-[#0024AE] ${primaryFocusVisibleClassName} ${solidButtonHoverClassName}`}
    >
      <span data-product-cta-label={productId} className={ctaPillLabelClassName}>
        {label}
      </span>
    </Link>
  );
}
