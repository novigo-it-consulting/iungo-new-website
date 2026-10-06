export type ComparisonCell =
  | { type: "text" }
  | { type: "check"; tone: "brand" | "neutral" }
  | { type: "cross" };

export interface ComparisonRow {
  id: ComparisonRowId;
  criterion: string;
  iungo: ComparisonValue;
  akeneo: ComparisonValue;
  salsify: ComparisonValue;
  height: number;
}

export type ComparisonValue =
  | { type: "text"; value: string }
  | { type: "check"; tone: "brand" | "neutral" }
  | { type: "cross" };

export type ComparisonRowId =
  | "onboarding"
  | "nativeIntegration"
  | "generativeAi"
  | "dam"
  | "pricing"
  | "lgpd";

export const COMPARISON_ROWS: readonly {
  id: ComparisonRowId;
  iungo: ComparisonCell;
  akeneo: ComparisonCell;
  salsify: ComparisonCell;
  height: number;
}[] = [
  {
    id: "onboarding",
    iungo: { type: "text" },
    akeneo: { type: "text" },
    salsify: { type: "text" },
    height: 54,
  },
  {
    id: "nativeIntegration",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text" },
    salsify: { type: "cross" },
    height: 62,
  },
  {
    id: "generativeAi",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text" },
    salsify: { type: "text" },
    height: 62,
  },
  {
    id: "dam",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text" },
    salsify: { type: "check", tone: "neutral" },
    height: 62,
  },
  {
    id: "pricing",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text" },
    salsify: { type: "text" },
    height: 62,
  },
  {
    id: "lgpd",
    iungo: { type: "check", tone: "brand" },
    akeneo: { type: "text" },
    salsify: { type: "text" },
    height: 61.5,
  },
];
