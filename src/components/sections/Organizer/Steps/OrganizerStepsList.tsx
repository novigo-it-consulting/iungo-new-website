import OrganizerStepItem from "./OrganizerStepItem";
import { ORGANIZER_STEPS } from "./organizerSteps.constants";

export default function OrganizerStepsList() {
  return (
    <ol className="m-0 grid w-full min-w-0 list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 xl:grid-cols-3">
      {ORGANIZER_STEPS.map((step) => (
        <OrganizerStepItem
          key={step.number}
          number={step.number}
          title={step.title}
          description={step.description}
        />
      ))}
    </ol>
  );
}
