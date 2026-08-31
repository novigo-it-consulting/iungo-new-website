import OrganizerCaseStudyIndicator from "./OrganizerCaseStudyIndicator";
import { CASE_STUDY_INDICATORS } from "./organizerCaseStudy.constants";

export default function OrganizerCaseStudyIndicators() {
  return (
    <div
      data-organizer-case-study-indicators
      className="flex w-full min-w-0 gap-4"
    >
      {CASE_STUDY_INDICATORS.map((indicator) => (
        <OrganizerCaseStudyIndicator
          key={indicator.id}
          value={indicator.value}
          label={indicator.label}
        />
      ))}
    </div>
  );
}
