import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

type CaseTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.caseStudy">>
>;

function PhaseDateBadge({ label }: Readonly<{ label: string }>) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center justify-center rounded bg-[#B8860B]/[0.12] px-2 py-1 font-reddit text-xs font-normal leading-4 tracking-[0px] text-[#B8860B]">
      {label}
    </span>
  );
}

function renderPhaseStrong(chunks: ReactNode) {
  return <strong className="font-bold">{chunks}</strong>;
}

function phaseCopy(
  t: CaseTranslator,
  id: "phase-1" | "phase-2" | "phase-3" | "phase-4",
) {
  switch (id) {
    case "phase-1":
      return { date: t("phase1.date"), line: t.rich("phase1.line", { strong: renderPhaseStrong }) };
    case "phase-2":
      return { date: t("phase2.date"), line: t.rich("phase2.line", { strong: renderPhaseStrong }) };
    case "phase-3":
      return { date: t("phase3.date"), line: t.rich("phase3.line", { strong: renderPhaseStrong }) };
    case "phase-4":
      return {
        date: t("phase4Line.date"),
        line: t.rich("phase4Line.line", { strong: renderPhaseStrong }),
      };
  }
}

const PHASE_IDS = ["phase-1", "phase-2", "phase-3", "phase-4"] as const;

export default async function IoTCaseStudyDetailsPhases() {
  const t = await getTranslations("productPages.iot.caseStudy");

  return (
    <div data-iot-case-study-details-phases className="w-full min-w-0 py-2">
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {PHASE_IDS.map((id) => {
          const phase = phaseCopy(t, id);

          return (
            <li
              key={id}
              data-iot-case-study-details-phase-item
              className="flex h-6 w-full min-w-0 items-center gap-4"
            >
              <PhaseDateBadge label={phase.date} />
              <p className="m-0 min-w-0 flex-1 font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#27272A]">
                {phase.line}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
