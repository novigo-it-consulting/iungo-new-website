type BehaviorSystemScreenBadgeProps = {
  label: string;
  isActive?: boolean;
};

const baseClasses =
  "inline-flex items-center justify-center rounded-[50px] border px-4 py-2 font-reddit text-sm font-normal leading-5 tracking-normal";

const variantClasses = {
  active: "border-[#0A0B14] bg-[#0A0B14] text-white",
  inactive: "border-[#D3D5D8] bg-white text-[#27272A]",
} as const;

export default function BehaviorSystemScreenBadge({
  label,
  isActive = false,
}: BehaviorSystemScreenBadgeProps) {
  const variant = isActive ? "active" : "inactive";

  return (
    <li
      data-behavior-system-screen-badge
      data-active={isActive ? "true" : "false"}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {label}
    </li>
  );
}
