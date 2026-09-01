import ResolveHeroButton from "./ResolveHeroButton";
import ResolveHeroIcon from "./ResolveHeroIcon";

const heroParagraphClassName =
  "m-0 w-full font-reddit text-base font-normal leading-8 tracking-[0.38px] text-[#041527]";

export default function ResolveHeroContent() {
  return (
    <div
      data-resolve-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <ResolveHeroIcon />
      </div>

      <div
        data-resolve-hero-title-frame
        className="w-full max-w-[544px] xl:min-h-[113px]"
      >
        <h1
          id="resolve-hero-title"
          data-resolve-hero-title
          className="m-0 w-full font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.01em]"
        >
          Iungo Resolve
        </h1>
      </div>

      <div
        data-resolve-hero-description-block
        className="mt-[14px] w-full max-w-[566px] xl:min-h-[145px]"
      >
        <p
          data-resolve-hero-presentation
          className={heroParagraphClassName}
        >
          Agente de suporte L1/L2 com conhecimento profundo do seu produto.
        </p>

        <p
          data-resolve-hero-description
          className={`mt-[14px] ${heroParagraphClassName}`}
        >
          Lê o catálogo do Iungo Organizer AI PIM em tempo real. Consulta o
          perfil do Iungo Behavior CDP. Resolve dúvidas técnicas como um
          especialista — em segundos.
        </p>
      </div>

      <div data-resolve-hero-cta className="mt-[60px] inline-flex">
        <ResolveHeroButton />
      </div>
    </div>
  );
}
