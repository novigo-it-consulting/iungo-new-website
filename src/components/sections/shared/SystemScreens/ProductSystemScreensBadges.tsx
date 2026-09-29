import ProductSystemScreenBadge from "./ProductSystemScreenBadge";
import type { ProductSystemScreenBadgeItem } from "./productSystemScreens.types";
import {
  productSystemScreensBadgeListClassName,
  productSystemScreensBadgeWrapperClassName,
} from "./productSystemScreens.styles";

type ProductSystemScreensBadgesProps = {
  productSlug: string;
  ariaLabel: string;
  badges: readonly ProductSystemScreenBadgeItem[];
  inactiveBorderClassName: string;
  wrapperClassName?: string;
};

export default function ProductSystemScreensBadges({
  productSlug,
  ariaLabel,
  badges,
  inactiveBorderClassName,
  wrapperClassName = productSystemScreensBadgeWrapperClassName,
}: ProductSystemScreensBadgesProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-badges`]: true,
      }}
      className={wrapperClassName}
    >
      <ul aria-label={ariaLabel} className={productSystemScreensBadgeListClassName}>
        {badges.map((badge) => (
          <ProductSystemScreenBadge
            key={badge.id}
            productSlug={productSlug}
            label={badge.label}
            isActive={badge.isActive}
            inactiveBorderClassName={inactiveBorderClassName}
          />
        ))}
      </ul>
    </div>
  );
}
