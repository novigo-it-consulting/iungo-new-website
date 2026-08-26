import Image from "next/image";

export default function HeroVisual() {
  return (
    <div
      data-hero-visual
      className="relative mx-auto aspect-[3/2] w-full max-w-[876px] xl:absolute xl:right-0 xl:top-[64px] xl:w-[52%] 2xl:right-[-15px] 2xl:h-[609px] 2xl:w-[876px] 2xl:max-w-none"
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
