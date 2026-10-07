import { getTranslations } from "next-intl/server";

import { CASES, type CaseData, type CaseSource } from "./cases.constants";

type CasesTranslator = Awaited<ReturnType<typeof getTranslations<"home.cases">>>;

type CaseCopy = {
  readonly accessibleName: string;
  readonly title: string;
  readonly description: string;
  readonly tagLabels: readonly [string, string, string];
  readonly metricLabels: readonly [string, string, string];
};

function buildCase(source: CaseSource, copy: CaseCopy): CaseData {
  return {
    id: source.id,
    accessibleName: copy.accessibleName,
    title: copy.title,
    description: copy.description,
    tags: [
      { label: copy.tagLabels[0], tone: source.tags[0].tone },
      { label: copy.tagLabels[1], tone: source.tags[1].tone },
      { label: copy.tagLabels[2], tone: source.tags[2].tone },
    ],
    metrics: [
      { value: source.metrics[0].value, label: copy.metricLabels[0] },
      { value: source.metrics[1].value, label: copy.metricLabels[1] },
      { value: source.metrics[2].value, label: copy.metricLabels[2] },
    ],
    metricsValueClassName: source.metricsValueClassName,
    image: source.image,
  };
}

function caseSource(id: CaseSource["id"]): CaseSource {
  const source = CASES.find((item) => item.id === id);

  if (!source) {
    throw new Error(`Caso não cadastrado: ${id}`);
  }

  return source;
}

function liderModaCase(t: CasesTranslator): CaseData {
  return buildCase(caseSource("lider-moda-premium"), {
    accessibleName: t("liderModaPremium.accessibleName"),
    title: t("liderModaPremium.title"),
    description: t("liderModaPremium.description"),
    tagLabels: [
      t("liderModaPremium.tags.fashion"),
      t("liderModaPremium.tags.concierge"),
      t("liderModaPremium.tags.cdp"),
    ],
    metricLabels: [
      t("liderModaPremium.metrics.sales"),
      t("liderModaPremium.metrics.cvr"),
      t("liderModaPremium.metrics.brands"),
    ],
  });
}

function raiaDrogasilCase(t: CasesTranslator): CaseData {
  return buildCase(caseSource("raia-drogasil"), {
    accessibleName: t("raiaDrogasil.accessibleName"),
    title: t("raiaDrogasil.title"),
    description: t("raiaDrogasil.description"),
    tagLabels: [
      t("raiaDrogasil.tags.pharmaHealth"),
      t("raiaDrogasil.tags.iot"),
      t("raiaDrogasil.tags.rfid"),
    ],
    metricLabels: [
      t("raiaDrogasil.metrics.trackedAssets"),
      t("raiaDrogasil.metrics.rollout"),
      t("raiaDrogasil.metrics.stores"),
    ],
  });
}

export function homeCaseCards(t: CasesTranslator): readonly CaseData[] {
  return [liderModaCase(t), raiaDrogasilCase(t)];
}
