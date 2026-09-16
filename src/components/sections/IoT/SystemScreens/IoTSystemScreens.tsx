import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import ProductSystemScreensHeader from "@/components/sections/shared/SystemScreens/ProductSystemScreensHeader";
import ProductSystemScreensVisuals from "@/components/sections/shared/SystemScreens/ProductSystemScreensVisuals";

import {
  IOT_INACTIVE_BADGE_BORDER,
  IOT_SYSTEM_SCREEN_BADGES,
  IOT_SYSTEM_SCREEN_GRID_ITEMS,
  IOT_SYSTEM_SCREEN_MAIN,
  IOT_SYSTEM_SCREENS_HEADER,
} from "./iotSystemScreens.constants";

export default function IoTSystemScreens() {
  const { title, description } = IOT_SYSTEM_SCREENS_HEADER;

  return (
    <>
      <ProductSystemScreensHeader
        productSlug="iot"
        title={title}
        description={description}
      />

      <ProductSystemScreensBadges
        productSlug="iot"
        ariaLabel="Telas do sistema Iungo Asset Cloud"
        badges={IOT_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={IOT_INACTIVE_BADGE_BORDER}
      />

      <ProductSystemScreensVisuals
        productSlug="iot"
        main={IOT_SYSTEM_SCREEN_MAIN}
        gridItems={IOT_SYSTEM_SCREEN_GRID_ITEMS}
        mainSizes="(max-width: 1280px) 100vw, 1280px"
        framed
      />
    </>
  );
}
