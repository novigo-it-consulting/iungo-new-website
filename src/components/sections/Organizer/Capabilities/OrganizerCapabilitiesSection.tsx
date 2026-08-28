import SectionHeader from "@/components/ui/SectionHeader";
import PageContainer from "@/components/layout/PageContainer";
import OrganizerCapabilitiesGrid from "./OrganizerCapabilitiesGrid";

export default function OrganizerCapabilitiesSection() {
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
          eyebrow="CAPACIDADES"
          title="Tudo que um PIM moderno precisa ter."
          titleId="organizer-capabilities-title"
        />

        <OrganizerCapabilitiesGrid />
      </PageContainer>
    </section>
  );
}
