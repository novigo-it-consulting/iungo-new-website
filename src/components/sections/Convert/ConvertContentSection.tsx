import PageContainer from "@/components/layout/PageContainer";

import ConvertHandoff from "./Handoff/ConvertHandoff";
import ConvertSystemScreens from "./SystemScreens/ConvertSystemScreens";
import ConvertTestimonials from "./Testimonials/ConvertTestimonials";
import ConvertWhySellsMore from "./WhySellsMore/ConvertWhySellsMore";

export default function ConvertContentSection() {
  return (
    <section
      data-convert-content-section
      aria-label="Conteúdo do Iungo Convert"
      className="box-border w-full min-w-0 bg-white pt-[76px]"
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

      <PageContainer
        data-convert-testimonials-container
        size="content1152"
        className="min-w-0 mt-[204px]"
      >
        <ConvertTestimonials />
      </PageContainer>

      <PageContainer
        data-convert-why-sells-more-container
        size="content1152"
        className="min-w-0 mt-[160px]"
      >
        <ConvertWhySellsMore />
      </PageContainer>
    </section>
  );
}
