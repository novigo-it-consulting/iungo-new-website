type ConciergeSystemScreenBadgeProps = {
  label: string;
  isActive?: boolean;
};

const baseClasses =
  "inline-flex h-[38px] shrink-0 items-center justify-center rounded-full px-4 py-2";

const variantClasses = {
  active: "border border-[#0A0B14] bg-[#0A0B14]",
  inactive: "border border-[rgba(167,33,33,0.35)] bg-white",
} as const;

const textVariantClasses = {
  active: "text-white",
  inactive: "text-[#27272A]",
} as const;

export default function ConciergeSystemScreenBadge({
  label,
  isActive = false,
}: ConciergeSystemScreenBadgeProps) {
  const variant = isActive ? "active" : "inactive";

  return (
    <li
      data-concierge-system-screen-badge
      data-active={isActive ? "true" : "false"}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      <span
        className={`whitespace-nowrap font-reddit text-[14px] font-normal leading-[20px] ${textVariantClasses[variant]}`}
      >
        {label}
      </span>
    </li>
  );
}
