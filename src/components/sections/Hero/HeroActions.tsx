import Link from "next/link";

const actionBaseClassName =
  "inline-flex shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export default function HeroActions() {
  return (
    <div
      data-hero-actions
      className="mt-8 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-[30px] 2xl:mt-[85.53px] 2xl:-ml-px"
    >
      <Link
        data-hero-primary-action
        href="/solicitar-demonstracao"
        className={`${actionBaseClassName} h-[54px] w-full max-w-[250px] bg-[#0024AE] focus-visible:ring-[#0024AE] sm:w-[250px]`}
      >
        <span className="inline-flex h-7 w-fit items-center">
          Solicitar Demonstração
        </span>
      </Link>

      <Link
        data-hero-secondary-action
        href="/plataformas"
        className={`${actionBaseClassName} h-[54.98px] w-full max-w-[253.14px] bg-[#687681] focus-visible:ring-[#687681] sm:w-[253.14px]`}
      >
        <span className="inline-flex h-7 w-fit items-center">
          Conhecer a Plataforma
        </span>
      </Link>
    </div>
  );
}
