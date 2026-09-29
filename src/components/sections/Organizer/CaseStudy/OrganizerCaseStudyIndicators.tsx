import OrganizerCaseStudyIndicator from "./OrganizerCaseStudyIndicator";
import { CASE_STUDY_INDICATORS } from "./organizerCaseStudy.constants";
import { organizerCaseStudyIndicatorsClassName } from "./organizerCaseStudy.styles";

export default function OrganizerCaseStudyIndicators() {
  return (
    <div
      data-organizer-case-study-indicators
      className={organizerCaseStudyIndicatorsClassName}
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
