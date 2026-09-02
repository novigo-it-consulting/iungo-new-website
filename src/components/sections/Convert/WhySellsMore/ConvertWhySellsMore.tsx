import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import ConvertWhySellsMoreCard from "./ConvertWhySellsMoreCard";
import {
  CONVERT_WHY_SELLS_MORE_CARDS,
  CONVERT_WHY_SELLS_MORE_HEADER,
} from "./whySellsMore.constants";

export default function ConvertWhySellsMore() {
  return (
    <div
      data-convert-why-sells-more
      aria-labelledby="convert-why-sells-more-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductSectionHeader
        blockSlug="convert-why-sells-more"
        eyebrow={CONVERT_WHY_SELLS_MORE_HEADER.eyebrow}
        title={CONVERT_WHY_SELLS_MORE_HEADER.title}
        titleId="convert-why-sells-more-title"
        description={CONVERT_WHY_SELLS_MORE_HEADER.description}
      />

      <div
        data-convert-why-sells-more-cards
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {CONVERT_WHY_SELLS_MORE_CARDS.map((card) => (
          <ConvertWhySellsMoreCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
