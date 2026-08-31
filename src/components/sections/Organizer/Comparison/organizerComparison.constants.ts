export type ComparisonValue =
  | { type: "text"; value: string }
  | { type: "check"; tone: "brand" | "neutral" }
  | { type: "cross" };

export interface ComparisonRow {
  criterion: string;
  iungo: ComparisonValue;
  akeneo: ComparisonValue;
  salsify: ComparisonValue;
  height: number;
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: "Onboarding",
    iungo: { type: "text", value: "14 dias" },
    akeneo: { type: "text", value: "3-6 meses" },
    salsify: { type: "text", value: "2-4 meses" },
    height: 54,
  },
  {
    criterion: "Integração ML + Amazon BR nativa",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text", value: "App Store" },
    salsify: { type: "cross" },
    height: 62,
  },
  {
    criterion: "IA Generativa nativa",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text", value: "Add-on" },
    salsify: { type: "text", value: "Add-on" },
    height: 62,
  },
  {
    criterion: "DAM incluído",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text", value: "Add-on" },
    salsify: { type: "check", tone: "neutral" },
    height: 62,
  },
  {
    criterion: "Pricing transparente em BRL",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text", value: "USD, sob consulta" },
    salsify: { type: "text", value: "USD, sob consulta" },
    height: 62,
  },
  {
    criterion: "LGPD nativo",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text", value: "GDPR" },
    salsify: { type: "text", value: "GDPR" },
    height: 61.5,
  },
];
