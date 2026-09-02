import type { IoTCaseStudyPhase } from "./iotCaseStudy.constants";

type IoTCaseStudyPhaseDateBadgeProps = {
  label: string;
};

function IoTCaseStudyPhaseDateBadge({ label }: IoTCaseStudyPhaseDateBadgeProps) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center justify-center rounded bg-[#B8860B]/[0.12] px-2 py-1 font-reddit text-xs font-normal leading-4 tracking-[0px] text-[#B8860B]">
      {label}
    </span>
  );
}

type IoTCaseStudyPhaseRowProps = {
  phase: IoTCaseStudyPhase;
};

function IoTCaseStudyPhaseRow({ phase }: IoTCaseStudyPhaseRowProps) {
  const { dateLabel, phaseTitle, description } = phase;

  return (
    <li
      data-iot-case-study-details-phase-item
      className="flex h-6 w-full min-w-0 items-center gap-4"
    >
      <IoTCaseStudyPhaseDateBadge label={dateLabel} />
      <p className="m-0 min-w-0 flex-1 font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#27272A]">
        <strong className="font-bold">{phaseTitle}</strong>
        {` · ${description}`}
      </p>
    </li>
  );
}

type IoTCaseStudyDetailsPhasesProps = {
  phases: readonly IoTCaseStudyPhase[];
};

export default function IoTCaseStudyDetailsPhases({
  phases,
}: IoTCaseStudyDetailsPhasesProps) {
  return (
    <div
      data-iot-case-study-details-phases
      className="w-full min-w-0 py-2"
    >
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {phases.map((phase) => (
          <IoTCaseStudyPhaseRow key={phase.id} phase={phase} />
        ))}
      </ul>
    </div>
  );
}
