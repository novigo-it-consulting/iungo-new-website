import SectionEyebrow from "@/components/ui/SectionEyebrow";
import {
  homeSectionTitleMobileClassName,
  productSectionDescriptionBaseClassName,
} from "@/components/ui/sectionTitle.styles";

export default function ConciergeJourneyStudioContent() {
  return (
    <div
      data-concierge-studio-content
      className="flex min-w-0 w-full flex-col gap-4"
    >
      <SectionEyebrow variant="compact">
        IUNGO JOURNEY STUDIO
      </SectionEyebrow>

      <h2
        id="concierge-studio-title"
        data-concierge-studio-title
        className={[
          "m-0 w-full font-reddit font-bold text-[#27272A] tracking-[-0.56px]",
          homeSectionTitleMobileClassName,
          "xl:text-[32px] xl:leading-[40px] xl:tracking-[-0.64px]",
        ].join(" ")}
      >
        Drag-and-drop. Sem código. Sem
        <br className="hidden xl:block" />
        dependência de TI.
      </h2>

      <p
        data-concierge-studio-description
        className={productSectionDescriptionBaseClassName}
      >
        Marketing constrói, testa e publica jornadas sozinho. Trigger,
        condicionais,
        <br className="hidden xl:block" />
        splits,
        <br className="hidden xl:block" />
        A/B testing — tudo visual.
      </p>

      <p
        data-concierge-studio-behavior-description
        className={productSectionDescriptionBaseClassName}
      >
        E ao contrário de Braze ou Klaviyo, o Studio usa o{" "}
        <strong className="font-bold text-[#27272A]">Behavior Engine</strong>{" "}
        nativo:
        <br className="hidden xl:block" />
        você
        <br className="hidden xl:block" />
        não precisa exportar segmentos, atualizar audiências ou esperar sync.
      </p>
    </div>
  );
}
