import PageContainer from "@/components/layout/PageContainer";

import AttendantCompliance from "./Compliance/AttendantCompliance";
import AttendantSystemScreens from "./SystemScreens/AttendantSystemScreens";

export default function AttendantContentSection() {
  return (
    <section
      data-attendant-content-section
      aria-label="Conteúdo do Iungo Attendant"
      // Reserva provisória de altura no desktop; reavaliar quando os containers internos estiverem completos.
      className="box-border w-full min-w-0 bg-white pt-[60px] xl:min-h-[3176px]"
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
    </section>
  );
}