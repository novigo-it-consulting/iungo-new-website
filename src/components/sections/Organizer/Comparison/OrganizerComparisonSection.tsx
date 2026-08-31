import Image from "next/image";
import PageContainer from "@/components/layout/PageContainer";
import SectionHeader from "@/components/ui/SectionHeader";
import OrganizerComparisonTable from "./OrganizerComparisonTable";

function OrganizerIconBadge() {
  return (
    <span
      aria-hidden="true"
      className="box-border block size-5 shrink-0 rounded-[5px] bg-[#1E9F67] p-[3px]"
    >
      <span className="relative block size-full">
        <Image
          src="/icons/products/organizer.svg"
          alt=""
          fill
          sizes="14px"
          className="object-contain"
        />
      </span>
    </span>
  );
}

export default function OrganizerComparisonSection() {
  return (
    <section
      aria-labelledby="organizer-comparison-title"
      className="w-full bg-white py-16 lg:py-20 2xl:py-24"
    >
      <PageContainer
        data-organizer-comparison-container
        size="organizerComparison"
        className="flex min-w-0 flex-col items-center justify-start gap-0"
      >
        <SectionHeader
          titleId="organizer-comparison-title"
          eyebrow="IUNGO ORGANIZER AI PIM VS CONCORRENTES"
          eyebrowIcon={<OrganizerIconBadge />}
          title="Por que enterprise BR escolhe Iungo"
          titleSize="comparison"
        />

        <OrganizerComparisonTable />
      </PageContainer>
    </section>
  );
}
