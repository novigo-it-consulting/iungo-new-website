import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import AttendantOperationCard from "./AttendantOperationCard";
import {
  ATTENDANT_SUPPORTED_OPERATIONS_CARDS,
  ATTENDANT_SUPPORTED_OPERATIONS_HEADER,
} from "./attendantSupportedOperations.constants";

export default function AttendantSupportedOperations() {
  return (
    <div
      data-attendant-supported-operations
      aria-labelledby="attendant-supported-operations-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductSectionHeader
        blockSlug="attendant-supported-operations"
        eyebrow={ATTENDANT_SUPPORTED_OPERATIONS_HEADER.eyebrow}
        title={ATTENDANT_SUPPORTED_OPERATIONS_HEADER.title}
        titleId="attendant-supported-operations-title"
        description={ATTENDANT_SUPPORTED_OPERATIONS_HEADER.description}
      />

      <div
        data-attendant-supported-operations-cards
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {ATTENDANT_SUPPORTED_OPERATIONS_CARDS.map((category) => (
          <AttendantOperationCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
