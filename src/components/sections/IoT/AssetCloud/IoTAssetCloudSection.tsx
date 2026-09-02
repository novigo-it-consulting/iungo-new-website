import PageContainer from "@/components/layout/PageContainer";

import IoTAssetCloudContent from "./IoTAssetCloudContent";
import IoTAssetCloudVisual from "./IoTAssetCloudVisual";

export default function IoTAssetCloudSection() {
  return (
    <section
      data-iot-asset-cloud-section
      aria-labelledby="iot-asset-cloud-title"
      className="box-border w-full min-w-0 bg-[#0A0B14] py-[96px]"
    >
      <PageContainer
        data-iot-asset-cloud-container
        size="content1280"
        className="min-w-0"
      >
        <div
          data-iot-asset-cloud-content
          className="mx-auto grid w-full max-w-[1216px] grid-cols-1 gap-16 xl:grid-cols-[minmax(0,551px)_601px] xl:items-start"
        >
          <IoTAssetCloudContent />

          <IoTAssetCloudVisual />
        </div>
      </PageContainer>
    </section>
  );
}
