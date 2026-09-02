import PageContainer from "@/components/layout/PageContainer";

import IoTSystemScreens from "@/components/sections/IoT/SystemScreens/IoTSystemScreens";

import IoTCaseStudyCard from "./IoTCaseStudyCard";

export default function IoTCaseStudySection() {
  return (
    <section
      data-iot-case-study-section
      aria-label="Case Raia Drogasil e telas do Iungo Asset Cloud IoT"
      className="box-border w-full min-w-0 bg-white py-[96px]"
    >
      <PageContainer data-iot-case-study-container size="organizerComparison">
        <IoTCaseStudyCard />
      </PageContainer>

      <PageContainer
        data-iot-system-screens-container
        size="content1280"
        className="mt-[132px] min-w-0"
      >
        <div
          data-iot-system-screens-content
          className="mx-auto flex w-full max-w-[1280px] min-w-0 flex-col"
        >
          <IoTSystemScreens />
        </div>
      </PageContainer>
    </section>
  );
}
