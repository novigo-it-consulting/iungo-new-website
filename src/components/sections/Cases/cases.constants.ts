export type CaseTagTone = "blue" | "red" | "yellow";

export interface CaseMetric {
  value: string;
  label: string;
}

export interface CaseImage {
  src: string;
  alt: string;
}

export interface CaseTagItem {
  label: string;
  tone: CaseTagTone;
}

export interface CaseData {
  id: string;
  accessibleName: string;
  title: string;
  description: string;
  tags: readonly CaseTagItem[];
  metrics: readonly CaseMetric[];
  metricsValueClassName: string;
  image?: CaseImage;
}

function caseImage(src: string): CaseImage {
  return { src, alt: "" };
}

export const CASES: readonly CaseData[] = [
  {
    id: "lider-moda-premium",
    accessibleName: "Caso de sucesso Líder Moda Premium",
    title: "+R$ 600 mil em 15 dias, em 6 marcas simultâneas",
    description:
      "A maior holding de moda premium da AL ativou Concierge em 6 marcas e dobrou a CVR vs média do site, projetando R$ 14M de receita incremental anual.",
    tags: [
      { label: "MODA", tone: "blue" },
      { label: "CONCIERGE", tone: "red" },
      { label: "CDP", tone: "blue" },
    ],
    metrics: [
      { value: "R$ 600k", label: "vendas em 15 dias" },
      { value: "2,5x", label: "CVR vs site" },
      { value: "6", label: "marcas ativas" },
    ],
    metricsValueClassName: "text-[#A72121]",
    image: caseImage("/images/cases/case-moda.png"),
  },
  {
    id: "raia-drogasil",
    accessibleName: "Caso de sucesso Raia Drogasil",
    title: "70.000+ ativos rastreados, do notebook ao terminal de loja",
    description:
      "A maior rede de farmácias do Brasil estruturou gestão de patrimônio com Iungo IoT (RFID + RTLS), eliminando perdas e otimizando operações em 3.000 lojas.",
    tags: [
      { label: "FARMA & SAÚDE", tone: "blue" },
      { label: "IOT", tone: "yellow" },
      { label: "RFID", tone: "blue" },
    ],
    metrics: [
      { value: "70K+", label: "ativos rastreados" },
      { value: "18m", label: "de PoC ao rollout" },
      { value: "3K+", label: "lojas atendidas" },
    ],
    metricsValueClassName: "text-[#B8860B]",
    image: caseImage("/images/cases/case-farma.png"),
  },
];
