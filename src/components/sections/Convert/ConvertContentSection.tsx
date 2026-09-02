import PageContainer from "@/components/layout/PageContainer";

import ConvertHandoff from "./Handoff/ConvertHandoff";
import ConvertSystemScreens from "./SystemScreens/ConvertSystemScreens";

export default function ConvertContentSection() {
  return (
    <section
      data-convert-content-section
      aria-label="Conteúdo do Iungo Convert"
      // Reserva provisória de altura enquanto a seção branca ainda está incompleta.
      // Reavaliar xl:min-h-[3201px] quando todos os blocos estiverem implementados.
      className="box-border w-full min-w-0 bg-white pt-[76px] xl:min-h-[3201px]"
    >
      <div className="mx-auto w-[calc(100%_-_48px)] min-w-0 max-w-[960px] sm:w-[calc(100%_-_64px)]">
        <ConvertHandoff />
      </div>

      <PageContainer
        data-convert-system-screens-container
        size="content1280"
        className="min-w-0 mt-[120px]"
      >
        <ConvertSystemScreens />
      </PageContainer>
    </section>
  );
}
