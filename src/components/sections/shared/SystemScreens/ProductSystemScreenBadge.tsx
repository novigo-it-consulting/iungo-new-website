type ProductSystemScreenBadgeProps = {
  productSlug: string;
  label: string;
  isActive?: boolean;
  inactiveBorderClassName: string;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-[50px] border px-4 py-2 font-reddit text-sm font-normal leading-5 tracking-normal";

const activeClasses = "border-[#0A0B14] bg-[#0A0B14] text-white";

export default function ProductSystemScreenBadge({
  productSlug,
  label,
  isActive = false,
  inactiveBorderClassName,
}: ProductSystemScreenBadgeProps) {
  return (
    <li
      {...{
        [`data-${productSlug}-system-screen-badge`]: true,
        "data-active": isActive ? "true" : "false",
      }}
      className={
        isActive
          ? `${baseClasses} ${activeClasses}`
          : `${baseClasses} ${inactiveBorderClassName} bg-white text-[#27272A]`
      }
    >
      {label}
    </li>
  );
}
