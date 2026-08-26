import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, HEADER_BUTTONS } from "./header.constants";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <header className="relative bg-white">
      <div className="mx-auto w-full max-w-[1728px] px-4 py-4 md:px-8 xl:py-[39px]">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Iungo Intelligence — página inicial"
            className="block shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="Iungo Intelligence"
              width={157}
              height={56}
              className="h-auto w-[130px] sm:w-[145px] xl:w-[157px] object-contain"
              priority
            />
          </Link>

          {/* Navegação desktop */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center xl:flex xl:translate-x-[30px] xl:translate-y-[2px]"
          >
            <ul className="flex items-center gap-14">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex h-8 w-fit items-center rounded font-reddit text-lg font-normal leading-8 text-[#383838] transition-colors duration-200 hover:text-[#111111] active:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botões desktop */}
          <div className="hidden self-start items-start gap-[30px] xl:flex xl:translate-x-[4px]">
            <Link
              href={HEADER_BUTTONS.areaCliente.href}
              className="inline-flex h-[55px] w-[194px] shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#687681] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687681] focus-visible:ring-offset-2"
            >
              <span className="inline-flex h-7 w-fit items-center">
                {HEADER_BUTTONS.areaCliente.label}
              </span>
            </Link>
            <Link
              href={HEADER_BUTTONS.solicitarDemo.href}
              className="inline-flex h-[54px] w-[250px] shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
            >
              <span className="inline-flex h-7 w-fit items-center">
                {HEADER_BUTTONS.solicitarDemo.label}
              </span>
            </Link>
          </div>

          {/* Botão hambúrguer — mobile/tablet */}
          <MobileNavigation />
        </div>
      </div>

      <div
        data-header-divider
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 h-px w-[calc(100%_-_32px)] max-w-[1600px] -translate-x-1/2 bg-[#ECECEC] md:w-[calc(100%_-_64px)]"
      />
    </header>
  );
}
