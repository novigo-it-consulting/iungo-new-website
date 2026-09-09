import ProductSystemScreensImageGrid from "@/components/sections/shared/SystemScreens/ProductSystemScreensImageGrid";

import { CONCIERGE_SYSTEM_SCREEN_CARDS } from "./conciergeSystemScreens.constants";

export default function ConciergeSystemScreensCards() {
  return (
    <ProductSystemScreensImageGrid
      productSlug="concierge"
      items={CONCIERGE_SYSTEM_SCREEN_CARDS}
      className="mt-6 xl:min-h-[301px]"
    />
  );
}
