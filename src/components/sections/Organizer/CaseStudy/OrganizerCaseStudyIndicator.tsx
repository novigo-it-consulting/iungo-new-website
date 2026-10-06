import {
  organizerCaseStudyIndicatorClassName,
  organizerCaseStudyIndicatorLabelClassName,
  organizerCaseStudyIndicatorValueClassName,
} from "./organizerCaseStudy.styles";

interface OrganizerCaseStudyIndicatorProps {
  value: string;
  label: string;
}

export default function OrganizerCaseStudyIndicator({
  value,
  label,
}: Readonly<OrganizerCaseStudyIndicatorProps>) {
  return (
    <div className={organizerCaseStudyIndicatorClassName}>
      <span className={organizerCaseStudyIndicatorValueClassName}>{value}</span>
      <span className={organizerCaseStudyIndicatorLabelClassName}>{label}</span>
    </div>
  );
}
