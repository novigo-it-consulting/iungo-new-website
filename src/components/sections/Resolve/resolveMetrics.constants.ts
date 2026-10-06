export interface ResolveMetric {
  id: string;
  value: string;
  description: string;
  complement: string;
}

export const RESOLVE_METRICS = [
  { id: "automated-resolution", value: "87%" },
  { id: "response-time", value: "< 8s" },
  { id: "ticket-cost", value: "−65%" },
] as const;
