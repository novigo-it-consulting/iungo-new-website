import Image from "next/image";

export default function ResolveDifferentialBehaviorIcon() {
  return (
    <span
      data-resolve-differential-card-icon="behavior"
      aria-hidden="true"
      className="mt-1 box-border block h-5 w-5 shrink-0 rounded-[5px] bg-[#5B6C7C] p-[3px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/behavior.svg"
          alt=""
          aria-hidden="true"
          fill
          sizes="14px"
          className="object-contain"
        />
      </span>
    </span>
  );
}
