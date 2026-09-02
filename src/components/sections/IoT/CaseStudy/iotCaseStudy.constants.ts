export const IOT_CASE_STUDY_SUMMARY = {
  eyebrow: "CASE",
  title: "Raia Drogasil",
  description:
    "Maior rede farmacêutica do Brasil. 3.000+ lojas. R$ 26,5 bi de receita anual.",
} as const;

export const IOT_CASE_STUDY_DETAILS = {
  title: "Da auditoria de notebooks à operação total.",
  description:
    "De 2.500 notebooks em janeiro de 2023 a mais de 70.000 ativos rastreados hoje — crescimento contínuo sem trocar a plataforma, sem rebobinar dados históricos, sem disrupção de operação.",
} as const;

export const IOT_CASE_STUDY_CTA = {
  label: "Ler case completo",
  arrow: "→",
  href: "#",
} as const;

export interface IoTCaseStudyPhase {
  id: string;
  dateLabel: string;
  phaseTitle: string;
  description: string;
}

type IoTCaseStudyPhaseData = readonly [
  id: string,
  dateLabel: string,
  phaseTitle: string,
  description: string,
];

const IOT_CASE_STUDY_PHASES_DATA = [
  ["phase-1", "JAN/23", "Fase 1", "2.500 notebooks · piloto controlado"],
  ["phase-2", "JUN/23", "Fase 2", "+6.000 corporativos · expansão TI"],
  ["phase-3", "DEZ/23", "Fase 3", "+4.000 equipamentos · cobertura completa"],
  ["phase-4", "JUN/24", "Fase 4", "+12.000 ativos · escala total"],
] as const satisfies readonly IoTCaseStudyPhaseData[];

export const IOT_CASE_STUDY_PHASES: readonly IoTCaseStudyPhase[] =
  IOT_CASE_STUDY_PHASES_DATA.map(([id, dateLabel, phaseTitle, description]) => ({
    id,
    dateLabel,
    phaseTitle,
    description,
  }));

export interface IoTCaseStudySummaryMetric {
  id: string;
  label: string;
  value: string;
  highlighted?: boolean;
}

type IoTCaseStudySummaryMetricData = readonly [
  id: string,
  label: string,
  value: string,
  highlighted?: boolean,
];

const IOT_CASE_STUDY_SUMMARY_METRICS_DATA = [
  ["notebooks", "Notebooks", "2.500"],
  ["corporate-assets", "Ativos corporativos", "6.000"],
  ["it-equipment", "Equipamentos TI", "4.000"],
  ["phase-4-expansion", "Expansão fase 4", "12.000"],
  ["current-operation", "Operação hoje", "70.000+", true],
] as const satisfies readonly IoTCaseStudySummaryMetricData[];

export const IOT_CASE_STUDY_SUMMARY_METRICS: readonly IoTCaseStudySummaryMetric[] =
  IOT_CASE_STUDY_SUMMARY_METRICS_DATA.map(
    ([id, label, value, highlighted]) => ({
      id,
      label,
      value,
      ...(highlighted ? { highlighted: true } : {}),
    }),
  );
