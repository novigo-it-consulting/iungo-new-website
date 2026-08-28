import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
}

export default function SectionEyebrow({ children }: SectionEyebrowProps) {
  return (
    <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-[999px] border border-[rgba(0,36,174,0.18)] bg-[rgba(0,36,174,0.07)] px-[14.4px] py-[6.4px] backdrop-blur-sm">
      <span className="font-reddit text-center text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]">
        {children}
      </span>
    </span>
  );
}
