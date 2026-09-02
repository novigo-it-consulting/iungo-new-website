import Image from "next/image";

export default function ResolveDifferentialOrganizerIcon() {
  return (
    <span
      data-resolve-differential-card-icon="organizer"
      aria-hidden="true"
      className="mt-1 box-border block h-5 w-5 shrink-0 rounded-[6px] bg-[#1E9F67] p-[3px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/organizer.svg"
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
