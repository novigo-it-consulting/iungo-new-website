import PrimaryLink from "@/components/ui/PrimaryLink";

import AttendantHeroIcon from "./AttendantHeroIcon";

const heroParagraphClassName =
  "m-0 w-full font-reddit text-base font-normal leading-8 tracking-[0.38px] text-[#041527]";

export default function AttendantHeroContent() {
  return (
    <div
      data-attendant-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <AttendantHeroIcon />
      </div>

      <div
        data-attendant-hero-title-frame
        className="w-full max-w-[544px] xl:min-h-[113px]"
      >
        <h1
          id="attendant-hero-title"
          data-attendant-hero-title
          className="m-0 w-full font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.01em]"
        >
          Iungo Attendant
        </h1>
      </div>

      <div
        data-attendant-hero-description-block
        className="mt-[14px] w-full max-w-[566px]"
      >
        <p
          data-attendant-hero-description
          className={heroParagraphClassName}
        >
          O agente que executa, não só responde.
          <br />
          Cancela pedido, troca tamanho, emite segunda via, atualiza endereço,
          gera nota fiscal. Operações reais via APIs do seu ERP, OMS e WMS —
          com auditoria completa.
        </p>
      </div>

      <div data-attendant-hero-cta className="mt-[60px] inline-flex">
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
