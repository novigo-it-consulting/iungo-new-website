import Image from "next/image";

export default function HeroVisual() {
  return (
    <div
      data-hero-visual
      className="relative mx-auto aspect-[3/2] w-full max-w-[876px] xl:mx-0 xl:mt-16 xl:min-w-0 xl:flex-1 2xl:ml-auto 2xl:mt-16 2xl:h-[461.09px] 2xl:w-[663.24px] 2xl:max-w-[663.24px] 2xl:flex-none 2xl:shrink-0"
    >
      <Image
        src="/images/hero/hero-platform-icons.png"
        alt="Ícones representando atendimento, automação, integração, vendas e análise da plataforma Iungo"
        fill
        preload
        sizes="(min-width: 1536px) 876px, (min-width: 1280px) 52vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 32px)"
        className="object-contain"
      />
    </div>
  );
}
