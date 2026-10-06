import {
  productSystemScreensBadgeActiveClassName,
  productSystemScreensBadgeBaseClassName,
  productSystemScreensBadgeInactiveFillClassName,
} from "./productSystemScreens.styles";

type ProductSystemScreenBadgeProps = {
  productSlug: string;
  label: string;
  isActive?: boolean;
  inactiveBorderClassName: string;
};

export default function ProductSystemScreenBadge({
  productSlug,
  label,
  isActive = false,
  inactiveBorderClassName,
}: Readonly<ProductSystemScreenBadgeProps>) {
  return (
    <li
      {...{
        [`data-${productSlug}-system-screen-badge`]: true,
        "data-active": isActive ? "true" : "false",
      }}
      className={
        isActive
          ? `${productSystemScreensBadgeBaseClassName} ${productSystemScreensBadgeActiveClassName}`
          : `${productSystemScreensBadgeBaseClassName} ${inactiveBorderClassName} ${productSystemScreensBadgeInactiveFillClassName}`
      }
    >
      {label}
    </li>
  );
}
