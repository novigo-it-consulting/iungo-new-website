import Image from "next/image";

export default function ResolveHeroVisual() {
  return (
    <div
      data-resolve-hero-visual
      className="mt-8 flex min-w-0 justify-center xl:mt-0 xl:justify-end"
    >
      <Image
        src="/images/products/resolve/resolve-hero.png"
        alt="Ilustração do Iungo Resolve com fluxos de atendimento e módulos conectados."
        width={900}
        height={900}
        priority
        sizes="(min-width: 1280px) 450px, calc(100vw - 48px)"
        className="block h-auto w-full max-w-[450px] object-contain"
      />
    </div>
  );
}
