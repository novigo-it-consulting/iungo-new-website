export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseData {
  id: string;
  metrics: CaseMetric[];
  metricsValueClassName: string;
}

export const CASES: Record<string, CaseData> = {
  "lider-moda-premium": {
    id: "lider-moda-premium",
    metrics: [
      { value: "R$ 600k", label: "vendas em 15 dias" },
      { value: "2,5x", label: "CVR vs site" },
      { value: "6", label: "marcas ativas" },
    ],
    metricsValueClassName: "text-[#A72121]",
  },
  "raia-drogasil": {
    id: "raia-drogasil",
    metrics: [
      { value: "70K+", label: "ativos rastreados" },
      { value: "18m", label: "de PoC ao rollout" },
      { value: "3K+", label: "lojas atendidas" },
    ],
    metricsValueClassName: "text-[#B8860B]",
  },
};
