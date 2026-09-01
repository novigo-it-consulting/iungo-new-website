import PrimaryLink from "@/components/ui/PrimaryLink";

import BehaviorHeroIcon from "./BehaviorHeroIcon";

export default function BehaviorHeroContent() {
  return (
    <div
      data-behavior-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <BehaviorHeroIcon />
      </div>

      <div
        data-behavior-hero-title-container
        className="w-full max-w-[544px] xl:min-h-[113px]"
      >
        <h1
          id="behavior-hero-title"
          data-behavior-hero-title
          className="m-0 w-full font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.66px]"
        >
          Iungo Behavior
        </h1>
      </div>

      <div
        data-behavior-hero-subtitle-container
        className="mt-[14px] w-full max-w-[566px] xl:min-h-[76px]"
      >
        <p
          data-behavior-hero-subtitle
          className="m-0 w-full font-reddit text-base font-normal leading-8 tracking-[0.38px] text-[#041527]"
        >
          O único Behavior CDP brasileiro com engine comportamental + semântico
          proprietário. Visão 360º preditiva em tempo real — não em batch
          noturno.
        </p>
      </div>

      <div data-behavior-hero-cta className="mt-[39px] inline-flex">
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
