import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

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
    <ProductSystemScreensBody
      productSlug="iot"
      title={title}
      description={description}
      ariaLabel="Telas do sistema Iungo Asset Cloud"
      badges={IOT_SYSTEM_SCREEN_BADGES}
      inactiveBorderClassName={IOT_INACTIVE_BADGE_BORDER}
      main={IOT_SYSTEM_SCREEN_MAIN}
      gridItems={IOT_SYSTEM_SCREEN_GRID_ITEMS}
      mainSizes="(max-width: 1280px) 100vw, 1280px"
      framed
    />
  );
}
