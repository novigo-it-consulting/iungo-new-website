import PageContainer from "@/components/layout/PageContainer";
import OrganizerCaseStudyCard from "./OrganizerCaseStudyCard";

export default function OrganizerCaseStudySection() {
  return (
    <section
      data-organizer-case-study
      className="w-full bg-[#FAFAF9] py-14 sm:py-16 lg:py-20"
    >
      <PageContainer size="organizerComparison">
        <OrganizerCaseStudyCard />
      </PageContainer>
    </section>
  );
}
