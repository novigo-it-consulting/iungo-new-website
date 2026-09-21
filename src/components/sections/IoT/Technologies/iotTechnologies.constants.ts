import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export const IOT_TECHNOLOGIES_HEADER = {
  eyebrow: "TECNOLOGIAS",
  title: "A tecnologia certa para cada cenário.",
  description:
    "Não vendemos um chip — escolhemos o stack ideal para sua operação.",
} as const;

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

type IoTTechnologyTableRowData = readonly [
  id: string,
  technology: string,
  range: string,
  idealCase: string,
  cost: string,
];

const IOT_TECHNOLOGIES_TABLE_DATA = [
  [
    "rfid-uhf-passive",
    "RFID UHF passivo",
    "até 12m",
    "Inventário de loja, CD, têxtil",
    "R$ 0,15–0,80",
  ],
  [
    "rfid-hf-nfc",
    "RFID HF / NFC",
    "até 10cm",
    "Autenticação, anti-falsificação, joias",
    "R$ 0,80–4,00",
  ],
  [
    "ble",
    "BLE (Bluetooth LE)",
    "até 50m",
    "Localização indoor, RTLS, pessoas",
    "R$ 25–80",
  ],
  [
    "lora",
    "LoRa / LoRaWAN",
    "até 10km",
    "Sensores remotos, agro, frota",
    "R$ 60–180",
  ],
  [
    "gps-gsm",
    "GPS / GSM",
    "global",
    "Veículos, contêineres, milk run",
    "R$ 200–600",
  ],
  [
    "barcode",
    "Barcode 2D / QR",
    "visual",
    "Onboarding, processos pontuais",
    "R$ 0,01",
  ],
] as const satisfies readonly IoTTechnologyTableRowData[];

export const IOT_TECHNOLOGIES_TABLE_ROWS: readonly IoTTechnologyTableRow[] =
  IOT_TECHNOLOGIES_TABLE_DATA.map(
    ([id, technology, range, idealCase, cost]) => ({
      id,
      technology,
      range,
      idealCase,
      cost,
    }),
  );
