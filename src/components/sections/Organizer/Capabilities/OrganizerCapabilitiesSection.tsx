import PageContainer from "@/components/layout/PageContainer";

export default function OrganizerCapabilitiesSection() {
  return (
    <section
      aria-label="Capacidades do Iungo Organizer"
      className="w-full min-w-0 bg-[#FBFBFB] py-12 sm:py-14 md:py-16 xl:py-20 2xl:py-24"
    >
      <PageContainer
        data-organizer-capabilities-container
        size="organizerCapabilities"
        className="flex min-w-0 flex-col items-start justify-start gap-0"
      >
        {/* Organizer capabilities content */}
      </PageContainer>
    </section>
  );
}
