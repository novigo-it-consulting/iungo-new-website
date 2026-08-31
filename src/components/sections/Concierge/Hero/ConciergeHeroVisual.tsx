import Image from "next/image";

export default function ConciergeHeroVisual() {
  return (
    <div
      data-concierge-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end xl:translate-x-[7px]"
    >
      <Image
        src="/images/products/concierge/concierge-hero.png"
        alt="Ilustração do Iungo Concierge conectando pessoas, processos e objetivos"
        width={900}
        height={900}
        priority
        sizes="(min-width: 768px) 450px, calc(100vw - 48px)"
        className="h-auto w-full max-w-[450px] object-contain"
      />
    </div>
  );
}
