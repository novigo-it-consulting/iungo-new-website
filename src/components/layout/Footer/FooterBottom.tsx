import { FOOTER_COMPLIANCE_BADGES } from "./footer.constants";

const currentYear = new Date().getFullYear();

export default function FooterBottom() {
  return (
    <div
      data-footer-bottom
      className="mx-auto w-full max-w-[1216px] pt-8"
    >
      <div className="grid w-full min-w-0 grid-cols-1 gap-y-6 lg:grid-cols-2 lg:items-center lg:gap-x-6">
        {/* Bloco legal */}
        <div
          data-footer-legal
          className="flex min-w-0 flex-col gap-1 font-reddit text-[12px] font-normal leading-4 text-white/40"
        >
          <p className="m-0">
            © {currentYear} IUNGO INTELLIGENCE LTDA. - CNPJ 63.246.325/0001-79
          </p>
          <p className="m-0">
            NOVIGO TECNOLOGIA DA INFORMAÇÃO S.A. - GRUPO CONTROLADOR
          </p>
        </div>

        {/* Selos e configuração de cookies */}
        <div
          data-footer-compliance
          className="flex min-w-0 flex-wrap items-center justify-start gap-3 lg:justify-end"
        >
          {FOOTER_COMPLIANCE_BADGES.map((badge) => (
            <span
              key={badge}
              data-footer-badge={badge}
              className="inline-flex min-h-[25px] shrink-0 items-center justify-center rounded-[4px] border border-white/10 px-2 py-[4px] font-reddit text-[10px] font-normal leading-[15px] text-white/40"
            >
              {badge}
            </span>
          ))}

          {/*
           * "Configurar cookies" — sem integração de consentimento no projeto.
           * Manter como <span> até que um serviço (ex.: OneTrust, Osano) seja
           * adicionado; nesse momento, substituir por <button type="button">.
           */}
          <span
            data-footer-cookie-config
            className="font-reddit text-[12px] font-normal leading-4 text-white/60"
          >
            Configurar cookies
          </span>
        </div>
      </div>
    </div>
  );
}
