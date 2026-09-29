import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  RESOLVE_SYSTEM_SCREEN_BADGES,
  RESOLVE_SYSTEM_SCREEN_GRID_ITEMS,
  RESOLVE_SYSTEM_SCREEN_MAIN,
} from "./resolveSystemScreens.constants";

const RESOLVE_INACTIVE_BADGE_BORDER = "border-[rgba(200,79,4,0.35)]";

export default function ResolveSystemScreens() {
  return (
    <section aria-labelledby="resolve-system-screens-title">
      <ProductSystemScreensBody
        productSlug="resolve"
        title="O console que o supervisor de CX olha o dia inteiro."
        description="Console de operação, treinamento via PIM, métricas de qualidade e supervisão de handoff."
        ariaLabel="Telas do sistema Iungo Resolve"
        badges={RESOLVE_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={RESOLVE_INACTIVE_BADGE_BORDER}
        main={RESOLVE_SYSTEM_SCREEN_MAIN}
        gridItems={RESOLVE_SYSTEM_SCREEN_GRID_ITEMS}
        mainSizes="(max-width: 1216px) 100vw, 1216px"
        framed
      />
    </section>
  );
}
