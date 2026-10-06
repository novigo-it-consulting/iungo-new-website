import { getTranslations } from "next-intl/server";

import DarkSectionEyebrow from "@/components/sections/shared/SectionHeader/DarkSectionEyebrow";

import type { IoTCaseStudySummaryMetric } from "./iotCaseStudy.constants";
import IoTCaseStudySummaryMetrics from "./IoTCaseStudySummaryMetrics";

type CaseTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.caseStudy">>
>;

function summaryMetrics(t: CaseTranslator): IoTCaseStudySummaryMetric[] {
  return [
    { id: "notebooks", label: t("notebooks"), value: t("notebooksValue") },
    {
      id: "corporate-assets",
      label: t("corporateAssets"),
      value: t("corporateAssetsValue"),
    },
    {
      id: "it-equipment",
      label: t("itEquipment"),
      value: t("itEquipmentValue"),
    },
    {
      id: "phase-4-expansion",
      label: t("phase4"),
      value: t("phase4Value"),
    },
    {
      id: "current-operation",
      label: t("currentOperation"),
      value: t("currentOperationValue"),
      highlighted: true,
    },
  ];
}

export default async function IoTCaseStudySummaryPanel() {
  const t = await getTranslations("productPages.iot.caseStudy");

  return (
    <div
      data-iot-case-study-summary
      className="flex min-h-[431.82px] min-w-0 flex-col gap-3 bg-[#0A0B14] p-10"
    >
      <div data-iot-case-study-summary-eyebrow>
        <DarkSectionEyebrow
          label={t("eyebrow")}
          dataAttribute="data-iot-case-study-summary-eyebrow-badge"
        />
      </div>

      <div data-iot-case-study-summary-title className="w-full min-w-0 pt-1">
        <h2 className="m-0 w-full font-reddit text-[30px] font-bold leading-9 tracking-[-0.6px] text-white">
          {t("title")}
        </h2>
      </div>

      <div data-iot-case-study-summary-description className="w-full min-w-0">
        <p className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-white/60">
          {t("summary")}
        </p>
      </div>

      <IoTCaseStudySummaryMetrics metrics={summaryMetrics(t)} />
    </div>
  );
}
