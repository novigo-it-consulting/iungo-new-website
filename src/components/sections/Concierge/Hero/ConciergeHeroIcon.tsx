import Image from "next/image";

export default function ConciergeHeroIcon() {
  return (
    <div
      data-concierge-hero-icon
      aria-hidden="true"
      className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[20px] bg-[#A72121] p-[13.33px] sm:h-[96px] sm:w-[96px] md:rounded-3xl md:p-4 xl:h-[106.94px] xl:w-[106.94px] xl:rounded-[26.74px] xl:p-[17.82px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/concierge.svg"
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
