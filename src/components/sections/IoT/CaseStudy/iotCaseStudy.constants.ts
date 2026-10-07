export const IOT_CASE_STUDY_CTA: {
  arrow: string;
  /** Defina o path quando a página do case existir. */
  href: string | null;
} = {
  arrow: "→",
  href: null,
};

export interface IoTCaseStudySummaryMetric {
  id: string;
  label: string;
  value: string;
  highlighted?: boolean;
}
