import CheckIcon from "@/components/icons/CheckIcon";
import XIcon from "@/components/icons/XIcon";

import type { ComparisonValue } from "./organizerComparison.constants";

export default function OrganizerComparisonValue({
  value,
  yesLabel,
  noLabel,
}: Readonly<{
  value: ComparisonValue;
  yesLabel: string;
  noLabel: string;
}>) {
  if (value.type === "text") {
    return (
      <span className="font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#27272A]">
        {value.value}
      </span>
    );
  }

  if (value.type === "check") {
    const isBrand = value.tone === "brand";
    return (
      <span
        className={[
          "mx-auto inline-flex shrink-0 items-center justify-center",
          isBrand
            ? "h-7 w-[15px] text-[#1E9F67]"
            : "h-5 w-3 text-[#27272A]",
        ].join(" ")}
      >
        <CheckIcon
          aria-hidden="true"
          focusable="false"
          className={isBrand ? "h-[18px] w-[15px] shrink-0" : "size-full shrink-0"}
        />
        <span className="sr-only">{yesLabel}</span>
      </span>
    );
  }

  return (
    <span className="mx-auto inline-flex h-5 w-[10px] shrink-0 items-center justify-center text-[#27272A]">
      <XIcon
        aria-hidden="true"
        focusable="false"
        className="size-full shrink-0"
      />
      <span className="sr-only">{noLabel}</span>
    </span>
  );
}
