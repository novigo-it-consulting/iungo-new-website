export const CASE_STUDY_INDICATORS = [
  { id: "automation", value: "98,52%" },
  { id: "new-offers", value: "94k" },
  { id: "updates", value: "330k" },
] as const;

export const CASE_STUDY_CTA: {
  arrow: string;
  /** Defina o path quando a página do case existir. */
  href: string | null;
} = {
  arrow: "→",
  href: null,
};
