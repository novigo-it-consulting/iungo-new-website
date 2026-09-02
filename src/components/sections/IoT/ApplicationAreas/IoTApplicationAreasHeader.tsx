import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import { IOT_APPLICATION_AREAS_HEADER } from "./iotApplicationAreas.constants";

export default function IoTApplicationAreasHeader() {
  return (
    <ProductSectionHeader
      blockSlug="iot-application-areas"
      eyebrow={IOT_APPLICATION_AREAS_HEADER.eyebrow}
      title={IOT_APPLICATION_AREAS_HEADER.title}
      titleId="iot-application-areas-title"
      description={IOT_APPLICATION_AREAS_HEADER.description}
    />
  );
}
