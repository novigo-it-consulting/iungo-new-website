import type { ReactNode } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { homeSectionTitleMobileClassName } from "@/components/ui/sectionTitle.styles";

const titleSizeClasses = {
  default: [
    "m-0 w-fit max-w-full font-reddit font-bold text-center text-[#27272A] tracking-[-0.02em]",
    homeSectionTitleMobileClassName,
    "lg:text-[42px] lg:leading-[46px] 2xl:text-[48px] 2xl:leading-[48px] 2xl:tracking-[-0.96px]",
  ].join(" "),
  comparison: [
    "m-0 w-fit max-w-full font-reddit font-bold text-center text-[#27272A] tracking-[-0.6px]",
    homeSectionTitleMobileClassName,
    "lg:text-[36px] lg:leading-10 lg:tracking-[-0.72px]",
  ].join(" "),
} as const;

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleId: string;
  className?: string;
  eyebrowIcon?: ReactNode;
  titleSize?: keyof typeof titleSizeClasses;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  className = "",
  eyebrowIcon,
  titleSize = "default",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-center justify-start gap-4 ${className}`}
    >
      <SectionEyebrow icon={eyebrowIcon}>{eyebrow}</SectionEyebrow>

      <div className="flex w-full min-w-0 justify-center">
        <h2 id={titleId} className={titleSizeClasses[titleSize]}>
          {title}
        </h2>
      </div>
    </div>
  );
}
