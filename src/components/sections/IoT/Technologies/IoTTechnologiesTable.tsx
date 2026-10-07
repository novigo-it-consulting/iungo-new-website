import { getTranslations } from "next-intl/server";

import ProductTextTable, {
  type ProductTextTableColumn,
} from "@/components/sections/shared/DataTable/ProductTextTable";

import {
  IOT_TECHNOLOGY_ROW_IDS,
  type IoTTechnologyTableRow,
} from "./iotTechnologies.constants";

type IoTTechnologyTableColumnKey =
  | "technology"
  | "range"
  | "idealCase"
  | "cost";

type TechnologiesTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.technologies">>
>;

function technologyColumns(
  t: TechnologiesTranslator,
): readonly ProductTextTableColumn<IoTTechnologyTableColumnKey>[] {
  return [
    {
      key: "technology",
      label: t("columns.technology"),
      align: "left",
      width: "24.081%",
      cellClassName: "whitespace-nowrap text-[#27272A]",
    },
    {
      key: "range",
      label: t("columns.range"),
      align: "left",
      width: "14.706%",
      cellClassName: "whitespace-nowrap text-[#71717A]",
    },
    {
      key: "idealCase",
      label: t("columns.idealCase"),
      align: "left",
      width: "44.118%",
    },
    {
      key: "cost",
      label: t("columns.cost"),
      align: "right",
      headerAlign: "right",
      width: "17.095%",
      cellClassName: "whitespace-nowrap text-[#27272A]",
    },
  ];
}

function technologyRow(
  t: TechnologiesTranslator,
  id: (typeof IOT_TECHNOLOGY_ROW_IDS)[number],
): IoTTechnologyTableRow {
  switch (id) {
    case "rfid-uhf-passive":
      return {
        id,
        technology: t("rfidUhf.technology"),
        range: t("rfidUhf.range"),
        idealCase: t("rfidUhf.idealCase"),
        cost: t("rfidUhf.cost"),
      };
    case "rfid-hf-nfc":
      return {
        id,
        technology: t("rfidHf.technology"),
        range: t("rfidHf.range"),
        idealCase: t("rfidHf.idealCase"),
        cost: t("rfidHf.cost"),
      };
    case "ble":
      return {
        id,
        technology: t("ble.technology"),
        range: t("ble.range"),
        idealCase: t("ble.idealCase"),
        cost: t("ble.cost"),
      };
    case "lora":
      return {
        id,
        technology: t("lora.technology"),
        range: t("lora.range"),
        idealCase: t("lora.idealCase"),
        cost: t("lora.cost"),
      };
    case "gps-gsm":
      return {
        id,
        technology: t("gps.technology"),
        range: t("gps.range"),
        idealCase: t("gps.idealCase"),
        cost: t("gps.cost"),
      };
    case "barcode":
      return {
        id,
        technology: t("barcode.technology"),
        range: t("barcode.range"),
        idealCase: t("barcode.idealCase"),
        cost: t("barcode.cost"),
      };
  }
}

export default async function IoTTechnologiesTable() {
  const t = await getTranslations("productPages.iot.technologies");

  return (
    <ProductTextTable
      blockSlug="iot-technologies"
      caption={t("caption")}
      ariaLabel={t("ariaLabel")}
      columns={technologyColumns(t)}
      rows={IOT_TECHNOLOGY_ROW_IDS.map((id) => technologyRow(t, id))}
      getRowKey={(row: IoTTechnologyTableRow) => row.id}
      rowHeaderKey="technology"
      className="mt-16 max-w-[1088px]"
      containerClassName="min-w-[1088px] xl:h-[371px]"
    />
  );
}
