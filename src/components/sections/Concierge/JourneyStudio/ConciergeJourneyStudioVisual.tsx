import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function ConciergeJourneyStudioVisual() {
  const t = await getTranslations("productPages.concierge.studio");

  return (
    <div
      data-concierge-studio-visual
      className="flex min-w-0 items-center justify-center sm:px-4 xl:min-h-[311.8px] xl:px-8"
    >
      <div
        data-concierge-studio-image-frame
        className="relative aspect-[609/235] w-full max-w-[609px] overflow-hidden rounded-[14px] shadow-[0_40px_100px_-24px_rgba(79,70,229,0.40),0_12px_32px_-8px_rgba(0,0,0,0.50)] xl:aspect-auto xl:h-[235px]"
      >
        <Image
          src="/images/products/concierge/journey-studio-flow.svg"
          alt={t("imageAlt")}
          width={609}
          height={235}
          unoptimized
          sizes="(min-width: 1280px) 609px, calc(100vw - 48px)"
          className="h-auto w-full max-w-[609px]"
        />

        <span
          data-concierge-studio-inner-shadow
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[14px] shadow-[inset_0_1px_0_-1px_rgba(255,255,255,0.06)]"
        />
      </div>
    </div>
  );
}
