import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export const IOT_TECHNOLOGIES_TITLE_CLASS = [
  productSectionTitleClassName,
  "w-full max-w-[588px]",
].join(" ");

export const IOT_TECHNOLOGIES_DESCRIPTION_CLASS = [
  productSectionDescriptionClassName,
  "max-w-[504px]",
].join(" ");

export interface IoTTechnologyTableRow {
  id: string;
  technology: string;
  range: string;
  idealCase: string;
  cost: string;
}

export const IOT_TECHNOLOGY_ROW_IDS = [
  "rfid-uhf-passive",
  "rfid-hf-nfc",
  "ble",
  "lora",
  "gps-gsm",
  "barcode",
] as const;
