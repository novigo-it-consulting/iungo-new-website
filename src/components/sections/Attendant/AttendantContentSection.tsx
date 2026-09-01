import PageContainer from "@/components/layout/PageContainer";

import AttendantCompliance from "./Compliance/AttendantCompliance";
import AttendantSupportedOperations from "./SupportedOperations/AttendantSupportedOperations";
import AttendantSystemScreens from "./SystemScreens/AttendantSystemScreens";
import AttendantTestimonials from "./Testimonials/AttendantTestimonials";

export default function AttendantContentSection() {
  return (
    <section
      data-attendant-content-section
      aria-label="Conteúdo do Iungo Attendant"
      className="box-border w-full min-w-0 bg-white pt-[60px]"
    >
      <div className="mx-auto w-[calc(100%_-_48px)] min-w-0 max-w-[960px] sm:w-[calc(100%_-_64px)]">
        <AttendantCompliance />
      </div>

      <PageContainer
        data-attendant-system-screens-container
        size="content1280"
        className="min-w-0 mt-[120px]"
      >
        <AttendantSystemScreens />
      </PageContainer>

      <PageContainer
        data-attendant-testimonials-container
        size="content1152"
        className="min-w-0 mt-[281px]"
      >
        <AttendantTestimonials />
      </PageContainer>

      <PageContainer
        data-attendant-supported-operations-container
        size="content1152"
        className="min-w-0 mt-[155px]"
      >
        <AttendantSupportedOperations />
      </PageContainer>
    </section>
  );
}
