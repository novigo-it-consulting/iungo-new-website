import type { CaseTagTone } from "./cases.constants";

type CaseTagProps = {
  children: string;
  tone: CaseTagTone;
};

const toneClasses: Record<CaseTagTone, string> = {
  blue: "border-[#0024AE]/25 bg-[#0024AE]/5 text-[#0024AE]",
  red: "border-[#A72121]/25 bg-[#A72121]/5 text-[#A72121]",
  yellow: "border-[#B8860B]/25 bg-[#B8860B]/5 text-[#B8860B]",
};

export default function CaseTag({ children, tone }: Readonly<CaseTagProps>) {
  return (
    <span
      data-case-tag={children.toLowerCase()}
      className={`box-border inline-flex shrink-0 items-center justify-center gap-0 whitespace-nowrap rounded-[999px] border px-[14.4px] py-[6.4px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0] backdrop-blur-sm ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
