import Image from "next/image";

export default function BehaviorHeroVisual() {
  return (
    <div
      data-behavior-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end"
    >
      <Image
        src="/images/products/behavior/behavior-hero.png"
        alt="Ilustração do Iungo Behavior com radar comportamental, perfil e métricas em tempo real"
        width={900}
        height={900}
        priority
        sizes="(min-width: 1280px) 450px, calc(100vw - 48px)"
        className="h-auto w-full max-w-[450px] object-contain"
      />
    </div>
  );
}
