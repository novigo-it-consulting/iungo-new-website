import Image from "next/image";

export default function BehaviorCdpComparisonVisual() {
  return (
    <div
      data-behavior-cdp-comparison-visual
      className="flex min-w-0 items-center justify-center xl:justify-end"
    >
      <div
        data-behavior-cdp-comparison-visual-frame
        className="relative aspect-[601/342] w-full max-w-[601px] overflow-hidden rounded-[14px] shadow-[0_40px_100px_-24px_rgba(79,70,229,0.40),0_12px_32px_-8px_rgba(0,0,0,0.50)] xl:aspect-auto xl:h-[342px]"
      >
        <Image
          src="/images/products/behavior/behavior-unified-profile.svg"
          alt="Perfil unificado do cliente com eventos em tempo real e jornada disparada"
          width={753}
          height={494}
          unoptimized
          sizes="(min-width: 1280px) 601px, calc(100vw - 48px)"
          className="absolute left-[-12.645%] top-[-10.526%] h-[144.444%] w-[125.291%] max-w-none"
        />

        <span
          data-behavior-cdp-comparison-inner-shadow
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[14px] shadow-[inset_0_1px_0_-1px_rgba(255,255,255,0.06)]"
        />
      </div>
    </div>
  );
}
