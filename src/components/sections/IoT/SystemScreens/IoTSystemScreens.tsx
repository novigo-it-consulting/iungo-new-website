import { getTranslations } from "next-intl/server";

import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  IOT_INACTIVE_BADGE_BORDER,
  IOT_SYSTEM_SCREEN_BADGES,
  IOT_SYSTEM_SCREEN_GRID_ITEMS,
  IOT_SYSTEM_SCREEN_MAIN,
} from "./iotSystemScreens.constants";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.iot.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof IOT_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "map-zones":
      return t("badges.mapZones");
    case "blind-inventory":
      return t("badges.blindInventory");
    case "geofence-alerts":
      return t("badges.geofence");
    case "erp-reconciliation":
      return t("badges.erp");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof IOT_SYSTEM_SCREEN_GRID_ITEMS)[number]["id"],
) {
  switch (id) {
    case "blind-inventory":
      return t("alts.blindInventory");
    case "geofence-alerts":
      return t("alts.geofence");
    case "erp-reconciliation":
      return t("alts.erp");
  }
}

export default async function IoTSystemScreens() {
  const t = await getTranslations("productPages.iot.systemScreens");

  return (
    <ProductSystemScreensBody
      productSlug="iot"
      title={t("title")}
      description={t("description")}
      ariaLabel={t("ariaLabel")}
      badges={IOT_SYSTEM_SCREEN_BADGES.map((badge) => ({
        ...badge,
        label: badgeLabel(t, badge.id),
      }))}
      inactiveBorderClassName={IOT_INACTIVE_BADGE_BORDER}
      main={{ ...IOT_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
      gridItems={IOT_SYSTEM_SCREEN_GRID_ITEMS.map((item) => ({
        ...item,
        alt: gridAlt(t, item.id),
      }))}
      mainSizes="(max-width: 1280px) 100vw, 1280px"
      framed
    />
  );
}
