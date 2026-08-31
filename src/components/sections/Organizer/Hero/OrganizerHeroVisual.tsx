import Image from "next/image";

export default function OrganizerHeroVisual() {
  return (
    <div
      data-organizer-hero-visual
      className="relative aspect-square w-full max-w-[450px] justify-self-center lg:justify-self-end"
    >
      <Image
        src="/images/products/organizer/organizer-hero.png"
        alt="Interface visual do Iungo Organizer"
        width={450}
        height={450}
        priority
        sizes="(min-width: 1024px) 450px, calc(100vw - 48px)"
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
