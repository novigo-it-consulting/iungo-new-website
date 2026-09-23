import Link from "next/link";

import { ctaMobileSizeAndTypographyClassName } from "@/components/ui/ctaButton.styles";

interface CtaButtonProps {
  href: string;
  label: string;
  variant?: "default" | "convert";
}

const variantClasses = {
  default: "py-[14px]",
  convert: "py-[14.4px]",
} as const;

export default function CtaButton({
  href,
  label,
  variant = "default",
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-reddit bg-white text-[#04134F] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#04134F]",
        ctaMobileSizeAndTypographyClassName,
        variantClasses[variant],
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
