import PrimaryLink from "@/components/ui/PrimaryLink";
import OrganizerHeroIcon from "./OrganizerHeroIcon";

export default function OrganizerHeroContent() {
  return (
    <div
      data-organizer-hero-content
      className="flex min-w-0 flex-col items-start gap-8 md:gap-10 xl:gap-12 2xl:gap-[58px] 2xl:pl-[3px]"
    >
      <div
        data-organizer-hero-copy
        className="flex min-w-0 flex-col items-start gap-[14px]"
      >
        <OrganizerHeroIcon />

        <h1
          data-organizer-hero-title
          className="m-0 w-full max-w-[544px] font-reddit font-semibold tracking-[-0.01em] text-[#424241] text-[40px] leading-[48px] sm:text-[48px] sm:leading-[58px] lg:text-[56px] lg:leading-[70px] xl:min-h-[113px] xl:text-[66px] xl:leading-[89px]"
        >
          Iungo Organizer
        </h1>

        <p
          data-organizer-hero-description
          className="m-0 w-full max-w-[579px] font-reddit text-[16px] font-normal leading-8 tracking-[0.38px] text-[#041527] xl:min-h-[77px]"
        >
          O melhor AI PIM para enriquecer catálogos com IA generativa, com
          onboarding em 14 dias e integração nativa com Mercado Livre e Amazon BR.
        </p>
      </div>

      <PrimaryLink href="/solicitar-demonstracao">
        Solicitar Demonstração
      </PrimaryLink>
    </div>
  );
}
