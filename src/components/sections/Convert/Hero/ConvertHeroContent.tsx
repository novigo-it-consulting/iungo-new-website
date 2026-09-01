import PrimaryLink from "@/components/ui/PrimaryLink";

import ConvertHeroIcon from "./ConvertHeroIcon";

const heroParagraphClassName =
  "m-0 w-full font-reddit text-base font-normal leading-8 tracking-[0.38px] text-[#041527]";

export default function ConvertHeroContent() {
  return (
    <div
      data-convert-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <ConvertHeroIcon />
      </div>

      <div
        data-convert-hero-title-frame
        className="w-full max-w-[544px] xl:min-h-[113px]"
      >
        <h1
          id="convert-hero-title"
          data-convert-hero-title
          className="m-0 w-full font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.01em]"
        >
          Iungo Convert
        </h1>
      </div>

      <div
        data-convert-hero-description-block
        className="mt-[14px] w-full max-w-[615px]"
      >
        <p data-convert-hero-presentation className={heroParagraphClassName}>
          O único Sales Agent que conhece seu catálogo PIM e o perfil CDP em
          tempo real.
        </p>

        <p
          data-convert-hero-description
          className={`mt-[14px] ${heroParagraphClassName}`}
        >
          Identifica intenção. Recomenda produto. Negocia condição. Fecha venda.
          E faz handoff perfeito ao humano quando faz sentido — com contexto
          completo.
        </p>
      </div>

      <div data-convert-hero-cta className="mt-[60px] inline-flex">
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
