import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import ProductSystemScreensHeader from "@/components/sections/shared/SystemScreens/ProductSystemScreensHeader";
import FramedProductSystemScreensVisuals from "@/components/sections/shared/SystemScreens/FramedProductSystemScreensVisuals";

import {
  ATTENDANT_SYSTEM_SCREEN_BADGES,
  ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS,
  ATTENDANT_SYSTEM_SCREEN_MAIN,
} from "./attendantSystemScreens.constants";

const ATTENDANT_INACTIVE_BADGE_BORDER = "border-[#3B37C0]/[0.35]";

export default function AttendantSystemScreens() {
  return (
    <>
      <ProductSystemScreensHeader
        productSlug="attendant"
        title="A operação que não exige humano para tarefas mecânicas."
        description="Console de transações, conectores, log de auditoria e painel de exceções."
      />

      <ProductSystemScreensBadges
        productSlug="attendant"
        ariaLabel="Telas do sistema Iungo Attendant"
        badges={ATTENDANT_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={ATTENDANT_INACTIVE_BADGE_BORDER}
      />

      <FramedProductSystemScreensVisuals
        productSlug="attendant"
        main={ATTENDANT_SYSTEM_SCREEN_MAIN}
        gridItems={ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS}
        mainSizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
        includeMainImageDataAttribute
      />
    </>
  );
}
