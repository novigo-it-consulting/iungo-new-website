import PageContainer from "@/components/layout/PageContainer";
import OrganizerStepsHeader from "./OrganizerStepsHeader";
import OrganizerStepsList from "./OrganizerStepsList";

export default function OrganizerStepsSection() {
  return (
    <section
      aria-labelledby="organizer-steps-title"
      className="w-full min-w-0 bg-white pt-12 pb-12 sm:pt-14 sm:pb-14 md:pt-16 md:pb-16 xl:pt-20 xl:pb-20 2xl:pt-[87px] 2xl:pb-24"
    >
      <PageContainer
        data-organizer-steps-container
        size="organizerSteps"
        className="flex min-w-0 flex-col items-center justify-start gap-16"
      >
        <OrganizerStepsHeader />
        <OrganizerStepsList />
      </PageContainer>
    </section>
  );
}
