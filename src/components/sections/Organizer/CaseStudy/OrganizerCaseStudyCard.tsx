import DarkSectionEyebrow from "@/components/sections/shared/SectionHeader/DarkSectionEyebrow";

import OrganizerCaseStudyDescription from "./OrganizerCaseStudyDescription";
import OrganizerCaseStudyIndicators from "./OrganizerCaseStudyIndicators";
import OrganizerCaseStudyLink from "./OrganizerCaseStudyLink";

export default function OrganizerCaseStudyCard() {
  return (
    <article
      data-organizer-case-study-card
      className="grid min-h-[225px] w-full min-w-0 overflow-hidden rounded-[24px] border border-[#E4E4E7] bg-white lg:grid-cols-5"
    >
      <div
        data-organizer-case-study-summary
        className="min-w-0 bg-[#0A0B14] p-6 sm:p-8 lg:col-span-2 lg:px-10 lg:pt-10 lg:pb-[43.42px]"
      >
        <div className="flex w-full flex-col items-start gap-2">
          <DarkSectionEyebrow label="CASE STUDY" />
          <h2 className="m-0 w-full pt-2 pr-2 font-reddit text-[24px] font-bold leading-8 tracking-[-0.48px] text-white">
            Marketplace de moda em hiper-escala
          </h2>
          <p className="m-0 w-full font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-white/60">
            6,49 milhões de SKUs sob governança ativa
          </p>
        </div>
      </div>

      <div
        data-organizer-case-study-results
        className="min-w-0 bg-white p-10 lg:col-span-3"
      >
        <div className="flex w-full min-w-0 flex-col gap-4">
          <OrganizerCaseStudyIndicators />
          <OrganizerCaseStudyDescription />
          <OrganizerCaseStudyLink />
        </div>
      </div>
    </article>
  );
}
