import { getTranslations } from "next-intl/server";

import SectionHeader from "@/components/ui/SectionHeader";
import PageContainer from "@/components/layout/PageContainer";
import OrganizerCapabilitiesGrid from "./OrganizerCapabilitiesGrid";

export default async function OrganizerCapabilitiesSection() {
  const t = await getTranslations("productPages.organizer.capabilities");

  return (
    <section
      aria-labelledby="organizer-capabilities-title"
      className="w-full min-w-0 bg-[#FBFBFB] py-12 sm:py-14 md:py-16 xl:py-20 2xl:py-24"
    >
      <PageContainer
        data-organizer-capabilities-container
        size="organizerCapabilities"
        className="flex min-w-0 flex-col items-center justify-start gap-16"
      >
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          titleId="organizer-capabilities-title"
        />

        <OrganizerCapabilitiesGrid />
      </PageContainer>
    </section>
  );
}
