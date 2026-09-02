import type { IoTApplicationAreaCard } from "./iotApplicationAreas.constants";

type IoTApplicationAreasCardProps = {
  card: IoTApplicationAreaCard;
  variant: "top" | "bottom";
};

const CARD_HEIGHT_CLASSES = {
  top: "xl:h-[174px]",
  bottom: "xl:h-[158px]",
} as const;

export default function IoTApplicationAreasCard({
  card,
  variant,
}: IoTApplicationAreasCardProps) {
  return (
    <article
      data-iot-application-areas-card={card.id}
      data-iot-application-areas-card-row={variant}
      className={`box-border flex h-auto w-full min-w-0 flex-col gap-2 rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-none xl:w-[289px] ${CARD_HEIGHT_CLASSES[variant]}`}
    >
      <span
        data-iot-application-areas-card-emoji={card.id}
        aria-hidden="true"
        className="block w-full max-w-[239px] text-[24px] !leading-8"
      >
        {card.emoji}
      </span>

      <h3
        data-iot-application-areas-card-title={card.id}
        className="m-0 w-full max-w-[239px] font-reddit text-base font-bold !leading-6 tracking-[-0.32px] text-[#27272A]"
      >
        {card.title}
      </h3>

      <p
        data-iot-application-areas-card-description={card.id}
        className="m-0 w-full max-w-[239px] font-reddit text-xs font-normal !leading-4 tracking-[0px] text-[#71717A]"
      >
        {card.description}
      </p>
    </article>
  );
}
