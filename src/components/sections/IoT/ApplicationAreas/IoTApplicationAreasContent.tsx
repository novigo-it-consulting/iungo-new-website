import IoTApplicationAreasCards from "./IoTApplicationAreasCards";
import IoTApplicationAreasHeader from "./IoTApplicationAreasHeader";

export default function IoTApplicationAreasContent() {
  return (
    <div
      data-iot-application-areas-content
      className="flex w-full min-w-0 flex-col items-center"
    >
      <IoTApplicationAreasHeader />

      <IoTApplicationAreasCards />
    </div>
  );
}
