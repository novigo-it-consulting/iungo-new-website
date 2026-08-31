interface OrganizerCaseStudyIndicatorProps {
  value: string;
  label: string;
}

export default function OrganizerCaseStudyIndicator({
  value,
  label,
}: OrganizerCaseStudyIndicatorProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
      <span className="block w-fit bg-[linear-gradient(180deg,#1E9F67_0%,#1E9F67_60%,#178F5C_100%)] bg-clip-text font-reddit text-[30px] font-bold leading-[27px] tracking-[-1.35px] text-transparent">
        {value}
      </span>
      <span className="w-full font-reddit text-[12px] font-normal leading-[16px] tracking-[0px] text-[#71717A]">
        {label}
      </span>
    </div>
  );
}
