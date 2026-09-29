import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import { CONCIERGE_SYSTEM_SCREEN_BADGES } from "./conciergeSystemScreens.constants";

const CONCIERGE_INACTIVE_BADGE_BORDER = "border-[rgba(167,33,33,0.35)]";

export default function ConciergeSystemScreensFilters() {
  return (
    <ProductSystemScreensBadges
      productSlug="concierge"
      ariaLabel="Recursos do canvas"
      badges={CONCIERGE_SYSTEM_SCREEN_BADGES}
      inactiveBorderClassName={CONCIERGE_INACTIVE_BADGE_BORDER}
      wrapperClassName="mt-6 w-full xl:min-h-[62px]"
    />
  );
}
