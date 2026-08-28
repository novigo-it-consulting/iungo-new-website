import SectionEyebrow from "@/components/ui/SectionEyebrow";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleId: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  titleId,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`flex w-full min-w-0 flex-col items-center justify-start gap-4 ${className}`}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>

      <h2
        id={titleId}
        className="m-0 w-fit max-w-full font-reddit font-bold text-center text-[#27272A] tracking-[-0.02em] text-[30px] leading-[36px] sm:text-[36px] sm:leading-[42px] lg:text-[42px] lg:leading-[46px] 2xl:text-[48px] 2xl:leading-[48px] 2xl:tracking-[-0.96px]"
      >
        {title}
      </h2>
    </div>
  );
}
