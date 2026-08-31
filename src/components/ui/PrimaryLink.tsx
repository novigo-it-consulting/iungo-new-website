import Link from "next/link";
import type { ReactNode } from "react";

interface PrimaryLinkProps {
  href: string;
  children: ReactNode;
}

export default function PrimaryLink({ href, children }: PrimaryLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex h-[54px] w-full max-w-[250px] shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 sm:w-[250px] 2xl:h-[40.88px] 2xl:w-[189.28px] 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
    >
      <span className="inline-block h-auto w-auto shrink-0 whitespace-nowrap font-bold text-white 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]">
        {children}
      </span>
    </Link>
  );
}
