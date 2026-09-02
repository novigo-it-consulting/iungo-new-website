import { IOT_APPLICATION_AREAS_CARDS } from "./iotApplicationAreas.constants";
import IoTApplicationAreasCard from "./IoTApplicationAreasCard";

export default function IoTApplicationAreasCards() {
  return (
    <div
      data-iot-application-areas-cards
      className="mt-16 grid w-full max-w-[1216px] grid-cols-1 gap-5 sm:grid-cols-2 xl:h-[352px] xl:grid-cols-4"
    >
      {IOT_APPLICATION_AREAS_CARDS.map((card, index) => (
        <IoTApplicationAreasCard
          key={card.id}
          card={card}
          variant={index < 4 ? "top" : "bottom"}
        />
      ))}
    </div>
  );
}
