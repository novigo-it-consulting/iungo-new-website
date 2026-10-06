export interface IoTMetric {
  id: string;
  value: string;
  label: string;
}

export const IOT_METRIC_IDS = [
  "tracked-assets",
  "connected-stores",
  "inventory-accuracy",
  "counting-cost",
] as const;
