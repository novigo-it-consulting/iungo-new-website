import Image from "next/image";

export default function OrganizerHeroIcon() {
  return (
    <div
      data-organizer-hero-icon
      aria-hidden="true"
      className="flex size-20 shrink-0 items-center justify-center rounded-[20px] bg-[#1E9F67] p-[13.33px] md:size-24 md:rounded-3xl md:p-4 xl:size-[106.94px] xl:rounded-[26.74px] xl:p-[17.82px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/organizer.svg"
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1280px) 71px, (min-width: 768px) 64px, 53px"
          className="object-contain"
        />
      </span>
    </div>
  );
}
