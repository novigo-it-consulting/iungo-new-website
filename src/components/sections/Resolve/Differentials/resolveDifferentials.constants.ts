export type ResolveDifferentialTitleIcon = "organizer" | "behavior";

export interface ResolveDifferentialCardData {
  id: string;
  number: number;
  title: string;
  titleClassName?: string;
  titleIcon?: ResolveDifferentialTitleIcon;
  description: string;
}

export const RESOLVE_DIFFERENTIAL_CARDS = [
  {
    id: "differential-1",
    number: 1,
    titleClassName: "text-[#1E9F67]",
    titleIcon: "organizer",
  },
  {
    id: "differential-2",
    number: 2,
    titleClassName: "text-[#5B6C7C]",
    titleIcon: "behavior",
  },
  { id: "differential-3", number: 3 },
  { id: "differential-4", number: 4 },
  { id: "differential-5", number: 5 },
  { id: "differential-6", number: 6 },
] as const;

export type ResolveDifferentialCardId =
  (typeof RESOLVE_DIFFERENTIAL_CARDS)[number]["id"];
