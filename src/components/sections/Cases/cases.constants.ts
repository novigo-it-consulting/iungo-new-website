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

interface CaseTagSource {
  readonly tone: CaseTagTone;
}

interface CaseMetricSource {
  readonly value: string;
}

export interface CaseSource {
  readonly id: string;
  readonly metricsValueClassName: string;
  readonly tags: readonly [CaseTagSource, CaseTagSource, CaseTagSource];
  readonly metrics: readonly [CaseMetricSource, CaseMetricSource, CaseMetricSource];
  readonly image?: CaseImage;
}

function caseImage(src: string): CaseImage {
  return { src, alt: "" };
}

export const CASES: readonly CaseSource[] = [
  {
    id: "lider-moda-premium",
    tags: [{ tone: "blue" }, { tone: "red" }, { tone: "blue" }],
    metrics: [{ value: "R$ 600k" }, { value: "2,5x" }, { value: "6" }],
    metricsValueClassName: "text-[#A72121]",
    image: caseImage("/images/cases/case-moda.png"),
  },
  {
    id: "raia-drogasil",
    tags: [{ tone: "blue" }, { tone: "yellow" }, { tone: "blue" }],
    metrics: [{ value: "70K+" }, { value: "18m" }, { value: "3K+" }],
    metricsValueClassName: "text-[#B8860B]",
    image: caseImage("/images/cases/case-farma.png"),
  },
];
