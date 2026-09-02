import PageContainer from "@/components/layout/PageContainer";
import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import {
  IOT_TECHNOLOGIES_DESCRIPTION_CLASS,
  IOT_TECHNOLOGIES_HEADER,
  IOT_TECHNOLOGIES_TITLE_CLASS,
} from "./iotTechnologies.constants";
import IoTTechnologiesTable from "./IoTTechnologiesTable";

export default function IoTTechnologiesSection() {
  return (
    <section
      data-iot-technologies-section
      aria-labelledby="iot-technologies-title"
      className="box-border w-full min-w-0 bg-white py-[96px]"
    >
      <PageContainer
        data-iot-technologies-container
        size="content1152"
        className="min-w-0"
      >
        <div
          data-iot-technologies-content
          className="flex w-full min-w-0 flex-col items-center"
        >
          <ProductSectionHeader
            blockSlug="iot-technologies"
            eyebrow={IOT_TECHNOLOGIES_HEADER.eyebrow}
            title={IOT_TECHNOLOGIES_HEADER.title}
            titleId="iot-technologies-title"
            description={IOT_TECHNOLOGIES_HEADER.description}
            titleClassName={IOT_TECHNOLOGIES_TITLE_CLASS}
            descriptionClassName={IOT_TECHNOLOGIES_DESCRIPTION_CLASS}
          />

          <IoTTechnologiesTable />
        </div>
      </PageContainer>
    </section>
  );
}
