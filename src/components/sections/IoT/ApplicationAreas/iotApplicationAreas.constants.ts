export type IoTApplicationAreaCardRow = "top" | "bottom";

export interface IoTApplicationAreaCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  row: IoTApplicationAreaCardRow;
}

export const IOT_APPLICATION_AREA_LAYOUT = [
  { id: "asset-monitoring", emoji: "📦", row: "top" },
  { id: "people-monitoring", emoji: "👥", row: "top" },
  { id: "nr-36-security", emoji: "🦺", row: "top" },
  { id: "cold-chain", emoji: "🌡️", row: "top" },
  { id: "milk-run", emoji: "🚚", row: "bottom" },
  { id: "ppe-compliance", emoji: "⛑️", row: "bottom" },
  { id: "hospitality", emoji: "🏨", row: "bottom" },
  { id: "high-value", emoji: "💎", row: "bottom" },
] as const;
