export interface ResolveMetric {
  id: string;
  value: string;
  description: string;
  complement: string;
}

export const RESOLVE_METRICS: readonly ResolveMetric[] = [
  {
    id: "automated-resolution",
    value: "87%",
    description: "Resolução automatizada",
    complement: "sem escalada para humano",
  },
  {
    id: "response-time",
    value: "< 8s",
    description: "Resposta L1/L2",
    complement: "vs. 4min do humano",
  },
  {
    id: "ticket-cost",
    value: "−65%",
    description: "Custo por ticket",
    complement: "primeiros 90 dias",
  },
] as const;
