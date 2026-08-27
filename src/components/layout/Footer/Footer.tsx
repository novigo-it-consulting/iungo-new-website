import Image from "next/image";
import Link from "next/link";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer
      data-footer
      className="w-full overflow-hidden bg-[#0A0B14]"
    >
      <div
        data-footer-container
        className="mx-auto w-full max-w-[1280px] px-5 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 lg:px-8 lg:pb-10 lg:pt-20"
      >
        <div
          data-footer-top
          className="grid w-full grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-0"
        >
          {/* Bloco institucional — 2 colunas no desktop */}
          <div
            data-footer-institutional
            className="flex w-full flex-col items-start lg:col-span-2"
          >
            <Link
              data-footer-logo
              href="/"
              aria-label="Iungo Intelligence — página inicial"
              className="inline-flex items-center"
            >
              <Image
                src="/images/logo.png"
                alt="Iungo"
                width={157}
                height={56}
                className="h-9 w-[127.13px] object-contain object-left brightness-0 invert"
              />
            </Link>

            <div
              data-footer-description-frame
              className="mt-3 w-full max-w-[448px] pt-1"
            >
              <p
                data-footer-description
                className="m-0 max-w-[428px] font-reddit text-[16px] font-normal leading-6 text-white/60"
              >
                A Brazilian AI Commerce Platform. Catálogo, dados, jornada, atendimento, vendas e IoT — em uma única infraestrutura.
              </p>
            </div>

            <address
              data-footer-address
              className="mt-4 w-full font-reddit text-xs font-normal leading-4 text-white/40 not-italic"
            >
              AV. BRIG. FARIA LIMA, 1234 - CONJ. 111 - JARDIM PAULISTANO - SÃO PAULO, SP - 01451-913
            </address>
          </div>

          {/* Newsletter — 1 coluna no desktop */}
          <div className="lg:col-span-1">
            <FooterNewsletter />
          </div>
        </div>

        {/* Divisória, colunas de navegação, copyright e selos serão adicionados nas próximas etapas */}
      </div>
    </footer>
  );
}
