export const CASE_STUDY_INDICATORS = [
  {
    id: "automation",
    value: "98,52%",
    label: "automação",
  },
  {
    id: "new-offers",
    value: "94k",
    label: "ofertas novas/mês",
  },
  {
    id: "updates",
    value: "330k",
    label: "updates/mês",
  },
] as const;

export const CASE_STUDY_DESCRIPTION =
  "Classificação, padronização e proteção de marca em catálogo 3P de hiper-escala — apenas 1,48% requer curadoria humana.";

export const CASE_STUDY_CTA: {
  label: string;
  arrow: string;
  /** Defina o path quando a página do case existir. */
  href: string | null;
} = {
  label: "Ler case completo",
  arrow: "→",
  href: null,
};
