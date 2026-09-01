import PageContainer from "@/components/layout/PageContainer";
import PlainProductSystemScreensVisuals from "@/components/sections/shared/SystemScreens/PlainProductSystemScreensVisuals";
import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import ProductSystemScreensHeader from "@/components/sections/shared/SystemScreens/ProductSystemScreensHeader";

import {
  BEHAVIOR_SYSTEM_SCREEN_BADGES,
  BEHAVIOR_SYSTEM_SCREEN_GRID_ITEMS,
  BEHAVIOR_SYSTEM_SCREEN_MAIN,
} from "./behaviorSystemScreens.constants";

const BEHAVIOR_INACTIVE_BADGE_BORDER = "border-[#D3D5D8]";

export default function BehaviorSystemScreensSection() {
  return (
    <section
      data-behavior-system-screens-section
      aria-labelledby="behavior-system-screens-title"
      className="w-full min-w-0 bg-white py-16 xl:py-[96px]"
    >
      <PageContainer
        data-behavior-system-screens-container
        size="content1280"
        className="min-w-0"
      >
        <ProductSystemScreensHeader
          productSlug="behavior"
          title="A interface real, todo dia, em produção."
          description="Ficha de produto, workflow editorial, governança de atributos e publicação multi-canal."
        />

        <ProductSystemScreensBadges
          productSlug="behavior"
          ariaLabel="Telas do sistema Iungo Behavior"
          badges={BEHAVIOR_SYSTEM_SCREEN_BADGES}
          inactiveBorderClassName={BEHAVIOR_INACTIVE_BADGE_BORDER}
        />

        <PlainProductSystemScreensVisuals
          productSlug="behavior"
          main={BEHAVIOR_SYSTEM_SCREEN_MAIN}
          gridItems={BEHAVIOR_SYSTEM_SCREEN_GRID_ITEMS}
        />
      </PageContainer>
    </section>
  );
}
