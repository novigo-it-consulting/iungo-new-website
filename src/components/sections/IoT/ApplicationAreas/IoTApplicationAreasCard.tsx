import type { IoTApplicationAreaCard } from "./iotApplicationAreas.constants";

type IoTApplicationAreasCardProps = {
  card: IoTApplicationAreaCard;
};

const CARD_HEIGHT_CLASSES = {
  top: "xl:h-[174px]",
  bottom: "xl:h-[158px]",
} as const;

const CARD_CONTENT_CLASS = "m-0 w-full max-w-[239px] font-reddit";

export default function IoTApplicationAreasCard({
  card,
}: IoTApplicationAreasCardProps) {
  return (
    <article
      data-iot-application-areas-card={card.id}
      data-iot-application-areas-card-row={card.row}
      className={`box-border flex h-auto w-full min-w-0 flex-col gap-2 rounded-xl border border-[#E4E4E7] bg-white p-6 shadow-none xl:w-[289px] ${CARD_HEIGHT_CLASSES[card.row]}`}
    >
      <span
        data-iot-application-areas-card-emoji={card.id}
        aria-hidden="true"
        className={`block ${CARD_CONTENT_CLASS} text-[24px] !leading-8`}
      >
        {card.emoji}
      </span>

      <h3
        data-iot-application-areas-card-title={card.id}
        className={`${CARD_CONTENT_CLASS} text-base font-bold !leading-6 tracking-[-0.32px] text-[#27272A]`}
      >
        {card.title}
      </h3>

      <p
        data-iot-application-areas-card-description={card.id}
        className={`${CARD_CONTENT_CLASS} text-xs font-normal !leading-4 tracking-[0px] text-[#71717A]`}
      >
        {card.description}
      </p>
    </article>
  );
}
