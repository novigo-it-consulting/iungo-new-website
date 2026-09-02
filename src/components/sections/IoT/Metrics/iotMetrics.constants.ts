export interface IoTMetric {
  id: string;
  value: string;
  label: string;
}

export const IOT_METRICS_TITLE = "OPERAÇÃO EM PRODUÇÃO";

export const IOT_METRICS: readonly IoTMetric[] = [
  {
    id: "tracked-assets",
    value: "70.000+",
    label: "ativos rastreados",
  },
  {
    id: "connected-stores",
    value: "3.000+",
    label: "lojas conectadas",
  },
  {
    id: "inventory-accuracy",
    value: "98,7%",
    label: "acurácia inventário",
  },
  {
    id: "counting-cost",
    value: "-90%",
    label: "custo de contagem",
  },
] as const;
