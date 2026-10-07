import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";

import ConvertHandoff from "./Handoff/ConvertHandoff";
import ConvertSystemScreens from "./SystemScreens/ConvertSystemScreens";
import ProductTestimonialsSection from "@/components/sections/shared/Testimonials/ProductTestimonialsSection";

import { CONVERT_TESTIMONIALS } from "./Testimonials/convertTestimonials.constants";
import ConvertWhySellsMore from "./WhySellsMore/ConvertWhySellsMore";

export default async function ConvertContentSection() {
  const t = await getTranslations("productPages.convert");
  const tQuotes = await getTranslations("productPages.convert.testimonials");
  const [daniel, vivian] = CONVERT_TESTIMONIALS;

  return (
    <section
      data-convert-content-section
      aria-label={t("contentAria")}
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
        <ProductTestimonialsSection
          productSlug="convert"
          title={tQuotes("title")}
          description={tQuotes("description")}
          testimonials={[
            {
              ...daniel,
              quote: tQuotes("daniel.quote"),
              name: tQuotes("daniel.name"),
              role: tQuotes("daniel.role"),
              metricLabel: tQuotes("daniel.metricLabel"),
            },
            {
              ...vivian,
              quote: tQuotes("vivian.quote"),
              name: tQuotes("vivian.name"),
              role: tQuotes("vivian.role"),
              metricLabel: tQuotes("vivian.metricLabel"),
            },
          ]}
          variant="convert"
        />
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
