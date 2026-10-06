import ResolveDifferentialBehaviorIcon from "./ResolveDifferentialBehaviorIcon";
import type { ResolveDifferentialCardData } from "./resolveDifferentials.constants";
import ResolveDifferentialOrganizerIcon from "./ResolveDifferentialOrganizerIcon";

interface ResolveDifferentialCardProps {
  card: ResolveDifferentialCardData;
}

const differentialDescriptionClassName =
  "m-0 w-full min-w-0 font-reddit text-sm font-normal leading-5 tracking-normal text-[#71717A]";

const differentialTitleTypographyClassName =
  "font-reddit text-xl font-bold leading-7 tracking-[-0.4px]";

const differentialTitleDefaultColorClassName = "text-[#27272A]";

const titleIconComponents = {
  organizer: ResolveDifferentialOrganizerIcon,
  behavior: ResolveDifferentialBehaviorIcon,
} as const;

export default function ResolveDifferentialCard({
  card,
}: Readonly<ResolveDifferentialCardProps>) {
  const label = String(card.number).padStart(2, "0");
  const TitleIcon = card.titleIcon
    ? titleIconComponents[card.titleIcon]
    : null;
  const titleColorClassName =
    card.titleClassName ?? differentialTitleDefaultColorClassName;

  return (
    <div
      data-resolve-differential-card={card.id}
      className="box-border flex min-h-[210px] min-w-0 w-full flex-col items-start gap-3 rounded-2xl border border-[#E4E4E7] bg-white p-8"
    >
      <span
        data-resolve-differential-card-badge={card.id}
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-lg bg-[#C84F04]/[0.12] text-[#C84F04]"
      >
        <span
          data-resolve-differential-card-number={card.id}
          className="font-reddit text-[14px] font-semibold leading-6"
        >
          {label}
        </span>
      </span>

      {TitleIcon ? (
        <div
          data-resolve-differential-card-title-row={card.id}
          className="flex w-full min-w-0 items-start gap-2 pt-1"
        >
          <TitleIcon />

          <h3
            data-resolve-differential-card-title={card.id}
            className={`m-0 min-w-0 ${differentialTitleTypographyClassName} ${titleColorClassName}`}
          >
            {card.title}
          </h3>
        </div>
      ) : (
        <div
          data-resolve-differential-card-title-row={card.id}
          className="w-full min-w-0 pt-1"
        >
          <h3
            data-resolve-differential-card-title={card.id}
            className={`m-0 w-full min-w-0 ${differentialTitleTypographyClassName} ${titleColorClassName}`}
          >
            {card.title}
          </h3>
        </div>
      )}

      <p
        data-resolve-differential-card-description={card.id}
        className={differentialDescriptionClassName}
      >
        {card.description}
      </p>
    </div>
  );
}
