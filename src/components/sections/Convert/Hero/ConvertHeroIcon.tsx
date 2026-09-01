import Image from "next/image";

export default function ConvertHeroIcon() {
  return (
    <div
      data-convert-hero-icon
      aria-hidden="true"
      className="flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[20px] bg-[#0078AA] p-[13.33px] sm:h-[96px] sm:w-[96px] md:rounded-3xl md:p-4 xl:h-[107px] xl:w-[107px] xl:rounded-[26.75px] xl:p-[17.83px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/convert.svg"
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
