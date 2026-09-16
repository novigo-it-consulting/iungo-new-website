import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import ProductSystemScreensHeader from "@/components/sections/shared/SystemScreens/ProductSystemScreensHeader";
import ProductSystemScreensVisuals from "@/components/sections/shared/SystemScreens/ProductSystemScreensVisuals";

import {
  CONVERT_SYSTEM_SCREEN_BADGES,
  CONVERT_SYSTEM_SCREEN_GRID_ITEMS,
  CONVERT_SYSTEM_SCREEN_MAIN,
} from "./convertSystemScreens.constants";

const CONVERT_INACTIVE_BADGE_BORDER = "border-[#0078AA]/[0.35]";

export default function ConvertSystemScreens() {
  return (
    <>
      <ProductSystemScreensHeader
        productSlug="convert"
        title="Onde o time comercial vê o pipeline com IA."
        description="Pipeline gerado por IA, conversas em curso, briefings de handoff e métricas por vendedor."
      />

      <ProductSystemScreensBadges
        productSlug="convert"
        ariaLabel="Telas do sistema Iungo Convert"
        badges={CONVERT_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={CONVERT_INACTIVE_BADGE_BORDER}
      />

      <ProductSystemScreensVisuals
        productSlug="convert"
        main={CONVERT_SYSTEM_SCREEN_MAIN}
        gridItems={CONVERT_SYSTEM_SCREEN_GRID_ITEMS}
        framed
      />
    </>
  );
}
