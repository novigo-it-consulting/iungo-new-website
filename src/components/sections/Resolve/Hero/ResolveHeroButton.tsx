import Link from "next/link";

export default function ResolveHeroButton() {
  return (
    <Link
      href="/solicitar-demonstracao"
      className="inline-flex h-[54px] w-full max-w-[250px] shrink-0 items-center justify-center whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-[18.33px] py-[9.16px] font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 sm:w-[250px] 2xl:h-[40.88px] 2xl:w-[189.28px] 2xl:rounded-[43.36px] 2xl:px-[13.88px] 2xl:py-[6.94px] 2xl:text-[13.63px] 2xl:leading-[20.8px]"
    >
      Solicitar Demonstração
    </Link>
  );
}
