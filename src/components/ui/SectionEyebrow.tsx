import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "default" | "compact";
}

const outerVariantClasses = {
  default:
    "inline-flex w-fit shrink-0 items-center justify-center gap-[7.19px] rounded-[999px] border border-[rgba(0,36,174,0.18)] bg-[rgba(0,36,174,0.07)] px-[14.4px] py-[6.4px] backdrop-blur-sm",
  compact:
    "inline-flex h-[31.8px] w-fit max-w-full shrink-0 items-center justify-center rounded-[999px] border border-[rgba(0,36,174,0.18)] bg-[rgba(0,36,174,0.07)] px-[14.4px] py-[6.4px] backdrop-blur-sm",
} as const;

const textVariantClasses = {
  default:
    "font-reddit text-center text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]",
  compact:
    "whitespace-nowrap font-reddit text-center text-[11.2px] font-medium leading-[16.8px] tracking-[0.067px] text-[#0024AE]",
} as const;

export default function SectionEyebrow({
  children,
  icon,
  variant = "default",
}: Readonly<SectionEyebrowProps>) {
  return (
    <span
      data-section-eyebrow
      className={outerVariantClasses[variant]}
    >
      {icon}
      <span className={textVariantClasses[variant]}>{children}</span>
    </span>
  );
}
