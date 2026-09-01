import ProductSystemScreenBadge from "./ProductSystemScreenBadge";
import type { ProductSystemScreenBadgeItem } from "./productSystemScreens.types";

type ProductSystemScreensBadgesProps = {
  productSlug: string;
  ariaLabel: string;
  badges: readonly ProductSystemScreenBadgeItem[];
  inactiveBorderClassName: string;
};

export default function ProductSystemScreensBadges({
  productSlug,
  ariaLabel,
  badges,
  inactiveBorderClassName,
}: ProductSystemScreensBadgesProps) {
  return (
    <div
      {...{
        [`data-${productSlug}-system-screens-badges`]: true,
      }}
      className="mx-auto mt-6 w-full max-w-[1216px] pt-6"
    >
      <ul
        aria-label={ariaLabel}
        className="m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0"
      >
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
