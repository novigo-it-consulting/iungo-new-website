import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import IoTApplicationAreasCard from "./IoTApplicationAreasCard";
import {
  IOT_APPLICATION_AREA_LAYOUT,
  type IoTApplicationAreaCard,
} from "./iotApplicationAreas.constants";

type AreasTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.areas">>
>;

function areaCopy(
  t: AreasTranslator,
  id: (typeof IOT_APPLICATION_AREA_LAYOUT)[number]["id"],
): Pick<IoTApplicationAreaCard, "title" | "description"> {
  switch (id) {
    case "asset-monitoring":
      return {
        title: t("assetMonitoring.title"),
        description: t("assetMonitoring.description"),
      };
    case "people-monitoring":
      return {
        title: t("peopleMonitoring.title"),
        description: t("peopleMonitoring.description"),
      };
    case "nr-36-security":
      return { title: t("nr36.title"), description: t("nr36.description") };
    case "cold-chain":
      return {
        title: t("coldChain.title"),
        description: t("coldChain.description"),
      };
    case "milk-run":
      return { title: t("milkRun.title"), description: t("milkRun.description") };
    case "ppe-compliance":
      return { title: t("ppe.title"), description: t("ppe.description") };
    case "hospitality":
      return {
        title: t("hospitality.title"),
        description: t("hospitality.description"),
      };
    case "high-value":
      return {
        title: t("highValue.title"),
        description: t("highValue.description"),
      };
  }
}

export default async function IoTApplicationAreasSection() {
  const t = await getTranslations("productPages.iot.areas");

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
            eyebrow={t("eyebrow")}
            title={t("title")}
            titleId="iot-application-areas-title"
            description={t("description")}
          />

          <div
            data-iot-application-areas-cards
            className="mt-16 grid w-full max-w-[1216px] grid-cols-1 gap-5 sm:grid-cols-2 xl:h-[352px] xl:grid-cols-4"
          >
            {IOT_APPLICATION_AREA_LAYOUT.map((card) => (
              <IoTApplicationAreasCard
                key={card.id}
                card={{ ...card, ...areaCopy(t, card.id) }}
              />
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
