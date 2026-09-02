import PageContainer from "@/components/layout/PageContainer";

import IoTApplicationAreasContent from "./IoTApplicationAreasContent";

export default function IoTApplicationAreasSection() {
  return (
    <section
      data-iot-application-areas-section
      aria-labelledby="iot-application-areas-title"
      className="box-border w-full min-w-0 bg-[#FAFAF9] py-[96px]"
    >
      <PageContainer
        data-iot-application-areas-container
        size="content1280"
        className="min-w-0"
      >
        <IoTApplicationAreasContent />
      </PageContainer>
    </section>
  );
}
