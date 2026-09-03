import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import ProductSystemScreensHeader from "@/components/sections/shared/SystemScreens/ProductSystemScreensHeader";
import FramedProductSystemScreensVisuals from "@/components/sections/shared/SystemScreens/FramedProductSystemScreensVisuals";

import {
  RESOLVE_SYSTEM_SCREEN_BADGES,
  RESOLVE_SYSTEM_SCREEN_GRID_ITEMS,
  RESOLVE_SYSTEM_SCREEN_MAIN,
} from "./resolveSystemScreens.constants";

const RESOLVE_INACTIVE_BADGE_BORDER = "border-[rgba(200,79,4,0.35)]";

export default function ResolveSystemScreens() {
  return (
    <section aria-labelledby="resolve-system-screens-title">
      <ProductSystemScreensHeader
        productSlug="resolve"
        title="O console que o supervisor de CX olha o dia inteiro."
        description="Console de operação, treinamento via PIM, métricas de qualidade e supervisão de handoff."
      />

      <ProductSystemScreensBadges
        productSlug="resolve"
        ariaLabel="Telas do sistema Iungo Resolve"
        badges={RESOLVE_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={RESOLVE_INACTIVE_BADGE_BORDER}
      />

      <FramedProductSystemScreensVisuals
        productSlug="resolve"
        main={RESOLVE_SYSTEM_SCREEN_MAIN}
        gridItems={RESOLVE_SYSTEM_SCREEN_GRID_ITEMS}
        mainSizes="(max-width: 1216px) 100vw, 1216px"
      />
    </section>
  );
}
