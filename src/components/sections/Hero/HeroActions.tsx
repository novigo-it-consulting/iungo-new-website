import Link from "next/link";
import PrimaryLink from "@/components/ui/PrimaryLink";

const secondaryClassName =
  "inline-flex shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]";

export default function HeroActions() {
  return (
    <div
      data-hero-actions
      className="mt-8 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-[30px] 2xl:mt-auto 2xl:items-end"
    >
      <PrimaryLink href="/solicitar-demonstracao">
        Solicitar Demonstração
      </PrimaryLink>

      <Link
        data-hero-secondary-cta
        href="/plataformas"
        className={`${secondaryClassName} h-[54.98px] w-full max-w-[253.14px] bg-[#687681] focus-visible:ring-[#687681] sm:w-[253.14px] 2xl:h-[41.63px] 2xl:w-[191.66px]`}
      >
        <span
          data-hero-action-label="platform"
          className="inline-block h-auto w-auto shrink-0 whitespace-nowrap font-bold text-white 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
        >
          Conhecer a Plataforma
        </span>
      </Link>
    </div>
  );
}
