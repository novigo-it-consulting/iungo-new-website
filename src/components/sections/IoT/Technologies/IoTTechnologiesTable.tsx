import ProductTextTable, {
  type ProductTextTableColumn,
} from "@/components/sections/shared/DataTable/ProductTextTable";

import {
  IOT_TECHNOLOGIES_TABLE_ROWS,
  type IoTTechnologyTableRow,
} from "./iotTechnologies.constants";

type IoTTechnologyTableColumnKey =
  | "technology"
  | "range"
  | "idealCase"
  | "cost";

const IOT_TECHNOLOGIES_TABLE_COLUMNS: readonly ProductTextTableColumn<IoTTechnologyTableColumnKey>[] =
  [
    {
      key: "technology",
      label: "Tecnologia",
      align: "left",
      width: "24.081%",
      cellClassName: "whitespace-nowrap text-[#27272A]",
    },
    {
      key: "range",
      label: "Alcance",
      align: "left",
      width: "14.706%",
      cellClassName: "whitespace-nowrap text-[#71717A]",
    },
    {
      key: "idealCase",
      label: "Caso ideal",
      align: "left",
      width: "44.118%",
    },
    {
      key: "cost",
      label: "Custo / tag",
      align: "right",
      headerAlign: "right",
      width: "17.095%",
      cellClassName: "whitespace-nowrap text-[#27272A]",
    },
  ] as const;

export default function IoTTechnologiesTable() {
  return (
    <ProductTextTable
      blockSlug="iot-technologies"
      caption="Comparativo de tecnologias IoT por alcance, caso de uso e custo por tag"
      ariaLabel="Tabela comparativa de tecnologias IoT"
      columns={IOT_TECHNOLOGIES_TABLE_COLUMNS}
      rows={IOT_TECHNOLOGIES_TABLE_ROWS}
      getRowKey={(row: IoTTechnologyTableRow) => row.id}
      rowHeaderKey="technology"
      className="mt-16 max-w-[1088px]"
      containerClassName="min-w-[1088px] xl:h-[371px]"
    />
  );
}
