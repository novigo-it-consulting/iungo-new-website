import { getTranslations } from "next-intl/server";

import OrganizerCaseStudyIndicator from "./OrganizerCaseStudyIndicator";
import { CASE_STUDY_INDICATORS } from "./organizerCaseStudy.constants";
import { organizerCaseStudyIndicatorsClassName } from "./organizerCaseStudy.styles";

function indicatorLabel(
  t: Awaited<ReturnType<typeof getTranslations<"productPages.organizer.caseStudy">>>,
  id: (typeof CASE_STUDY_INDICATORS)[number]["id"],
) {
  switch (id) {
    case "automation":
      return t("automation");
    case "new-offers":
      return t("newOffers");
    case "updates":
      return t("updates");
  }
}

export default async function OrganizerCaseStudyIndicators() {
  const t = await getTranslations("productPages.organizer.caseStudy");

  return (
    <div
      data-organizer-case-study-indicators
      className={organizerCaseStudyIndicatorsClassName}
    >
      {CASE_STUDY_INDICATORS.map((indicator) => (
        <OrganizerCaseStudyIndicator
          key={indicator.id}
          value={indicator.value}
          label={indicatorLabel(t, indicator.id)}
        />
      ))}
    </div>
  );
}
