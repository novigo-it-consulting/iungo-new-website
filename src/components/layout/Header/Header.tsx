import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, HEADER_BUTTONS } from "./header.constants";
import MobileNavigation from "./MobileNavigation";

const NAV_ITEM_META: Record<
  string,
  { navKey: string; desktopWidth: string }
> = {
  "/solucoes": { navKey: "solucoes", desktopWidth: "2xl:w-[55px]" },
  "/plataformas": { navKey: "plataforma", desktopWidth: "2xl:w-[66px]" },
  "/cases": { navKey: "cases", desktopWidth: "2xl:w-[36px]" },
  "/recursos": { navKey: "recursos", desktopWidth: "2xl:w-[55px]" },
};

export default function Header() {
  return (
    <header
      data-header
      data-page-rail-section="header"
      className="relative bg-white"
    >
      {/*
        Frame: abaixo de 2xl usa o container centralizado existente.
        Em 2xl: margens fixas de 233.16px de cada lado produzem
        frame de 1453.68px, depois pl/pr resultam em 1266px de conteúdo
        começando em x=329px e terminando em x=1595px.
      */}
      <div
        data-header-frame
        className="box-border mx-auto w-full max-w-[1728px] px-4 py-4 md:px-8 xl:py-5 2xl:mx-[233.16px] 2xl:h-[96px] 2xl:max-w-none 2xl:w-auto 2xl:py-0 2xl:pl-[95.84px] 2xl:pr-[91.84px]"
      >
        <div
          data-header-content
          data-page-main-content="header"
          className="flex h-full min-w-0 items-center justify-between"
        >
          {/* Logo */}
          <Link
            data-header-logo
            data-page-content-anchor="header"
            href="/"
            aria-label="Iungo Intelligence — página inicial"
            className="block shrink-0 2xl:h-[42.4px] 2xl:w-[118.87px]"
          >
            <Image
              src="/images/logo.png"
              alt="Iungo Intelligence"
              width={157}
              height={56}
              className="h-auto w-[130px] object-contain sm:w-[145px] xl:w-[157px] 2xl:h-full 2xl:w-full"
              priority
            />
          </Link>

          {/* Navegação desktop */}
          <nav
            data-header-nav
            aria-label="Navegação principal"
            className="hidden shrink-0 items-center xl:flex xl:translate-x-[30px] xl:translate-y-[2px] 2xl:h-[25px] 2xl:w-[339.2px] 2xl:translate-x-0 2xl:translate-y-0"
          >
            <ul className="flex items-center gap-14 2xl:gap-[42.4px]">
              {NAV_ITEMS.map((item) => {
                const meta = NAV_ITEM_META[item.href];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-header-nav-item={meta?.navKey}
                      className={`inline-flex h-8 w-fit shrink-0 items-center justify-center whitespace-nowrap rounded font-reddit text-lg font-normal leading-8 text-[#383838] transition-colors duration-200 hover:text-[#111111] active:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 2xl:h-[25px] ${meta?.desktopWidth ?? ""}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Botões desktop */}
          <div
            data-header-actions
            className="hidden shrink-0 items-start gap-[30px] xl:flex xl:translate-x-[4px] 2xl:items-center 2xl:gap-[20px] 2xl:self-center 2xl:translate-x-0"
          >
            <Link
              data-header-client-button
              href={HEADER_BUTTONS.areaCliente.href}
              className="inline-flex h-[55px] w-[194px] shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#687681] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687681] focus-visible:ring-offset-2 2xl:h-[41.64px] 2xl:w-[146.88px] 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
            >
              <span
                data-header-action-label="client-area"
                className="inline-block h-auto w-auto shrink-0 whitespace-nowrap font-bold text-white 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
              >
                {HEADER_BUTTONS.areaCliente.label}
              </span>
            </Link>
            <Link
              data-header-demo-button
              href={HEADER_BUTTONS.solicitarDemo.href}
              className="inline-flex h-[54px] w-[250px] shrink-0 items-center justify-center gap-[11.45px] whitespace-nowrap rounded-[57.27px] bg-[#0024AE] px-[18.33px] py-[9.16px] text-center font-reddit text-[18px] font-bold leading-[27.49px] tracking-[0px] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 2xl:h-[40.88px] 2xl:w-[189.28px] 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
            >
              <span
                data-header-action-label="demonstration"
                className="inline-block h-auto w-auto shrink-0 whitespace-nowrap font-bold text-white 2xl:text-[13.63px] 2xl:leading-[20.8px] 2xl:tracking-[0px]"
              >
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
