import PrimaryLink from "@/components/ui/PrimaryLink";
import ConciergeHeroIcon from "./ConciergeHeroIcon";

export default function ConciergeHeroContent() {
  return (
    <div
      data-concierge-hero-content
      className="flex min-w-0 flex-col items-start xl:pt-[31px]"
    >
      <div className="mb-4 xl:mb-[14.06px]">
        <ConciergeHeroIcon />
      </div>

      <h1
        id="concierge-hero-title"
        data-concierge-hero-title
        className="m-0 w-full max-w-[544px] font-reddit font-semibold text-[#424241] text-[40px] leading-[52px] tracking-[-0.4px] sm:text-[48px] sm:leading-[64px] sm:tracking-[-0.48px] lg:text-[56px] lg:leading-[72px] lg:tracking-[-0.56px] xl:min-h-[113px] xl:text-[66px] xl:leading-[89px] xl:tracking-[-0.66px]"
      >
        Iungo Concierge
      </h1>

      <p
        data-concierge-hero-description
        className="m-0 mt-[14px] w-full max-w-[623px] font-reddit text-base font-normal leading-8 tracking-[0.038px] text-[#041527]"
      >
        Orquestração de jornadas multicanal em tempo real. Studio no-code
        visual. Triggers em minutos, não horas. O único stack que orquestra
        usando o próprio. Behavior + Organizer AI PIM em tempo real.
      </p>

      <div
        data-concierge-hero-cta
        className="mt-[39px] inline-flex"
      >
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
