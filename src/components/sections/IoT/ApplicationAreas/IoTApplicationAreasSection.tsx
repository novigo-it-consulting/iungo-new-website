import PageContainer from "@/components/layout/PageContainer";
import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import IoTApplicationAreasCard from "./IoTApplicationAreasCard";
import {
  IOT_APPLICATION_AREAS_CARDS,
  IOT_APPLICATION_AREAS_HEADER,
} from "./iotApplicationAreas.constants";

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
        <div
          data-iot-application-areas-content
          className="flex w-full min-w-0 flex-col items-center"
        >
          <ProductSectionHeader
            blockSlug="iot-application-areas"
            eyebrow={IOT_APPLICATION_AREAS_HEADER.eyebrow}
            title={IOT_APPLICATION_AREAS_HEADER.title}
            titleId="iot-application-areas-title"
            description={IOT_APPLICATION_AREAS_HEADER.description}
          />

          <div
            data-iot-application-areas-cards
            className="mt-16 grid w-full max-w-[1216px] grid-cols-1 gap-5 sm:grid-cols-2 xl:h-[352px] xl:grid-cols-4"
          >
            {IOT_APPLICATION_AREAS_CARDS.map((card) => (
              <IoTApplicationAreasCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
