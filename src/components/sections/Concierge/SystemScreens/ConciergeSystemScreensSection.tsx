import { getTranslations } from "next-intl/server";

import PageContainer from "@/components/layout/PageContainer";
import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";
import ConciergeSystemScreensCards from "./ConciergeSystemScreensCards";
import ConciergeSystemScreensFilters from "./ConciergeSystemScreensFilters";
import ConciergeSystemScreensVisual from "./ConciergeSystemScreensVisual";

export default async function ConciergeSystemScreensSection() {
  const t = await getTranslations("productPages.concierge.systemScreens");

  return (
    <section
      data-concierge-system-screens-section
      aria-labelledby="concierge-system-screens-title"
      className="w-full min-w-0 bg-white py-16 xl:min-h-[1158.8px] xl:py-[96px]"
    >
      <PageContainer
        size="content1280"
        className="min-w-0 xl:min-h-[966.8px]"
      >
        <div
          data-concierge-system-screens-container
          className="min-w-0 xl:min-h-[966.8px]"
        >
          <div
            data-concierge-system-screens-header
            className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-3 pb-6 xl:min-h-[80px]"
          >
            <div
              data-concierge-system-screens-title-frame
              className="flex w-full items-start justify-center xl:h-[40px]"
            >
              <h2
                id="concierge-system-screens-title"
                data-concierge-system-screens-title
                className={`${productSectionTitleClassName} w-full max-w-[621px]`}
              >
                {t("title")}
              </h2>
            </div>

            <p
              data-concierge-system-screens-description
              className={`${productSectionDescriptionClassName} max-w-[604px]`}
            >
              {t("description")}
            </p>
          </div>

          <div
            data-concierge-system-screens-content
            className="sm:px-8"
          >
            <ConciergeSystemScreensFilters />

            <ConciergeSystemScreensVisual />

            <ConciergeSystemScreensCards />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
