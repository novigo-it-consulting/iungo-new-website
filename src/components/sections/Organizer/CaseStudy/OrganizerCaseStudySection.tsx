import PageContainer from "@/components/layout/PageContainer";

export default function OrganizerCaseStudySection() {
  return (
    <section
      data-organizer-case-study
      className="w-full bg-[#FAFAF9] py-14 sm:py-16 lg:py-20"
    >
      <PageContainer size="organizerComparison">
        <div
          data-organizer-case-study-content
          className="w-full min-w-0"
        >
          {/* O card será implementado na próxima etapa */}
        </div>
      </PageContainer>
    </section>
  );
}
