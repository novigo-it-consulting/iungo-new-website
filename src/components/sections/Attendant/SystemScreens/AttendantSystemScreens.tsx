import { getTranslations } from "next-intl/server";

import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  ATTENDANT_SYSTEM_SCREEN_BADGES,
  ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS,
  ATTENDANT_SYSTEM_SCREEN_MAIN,
} from "./attendantSystemScreens.constants";

const ATTENDANT_INACTIVE_BADGE_BORDER = "border-[#3B37C0]/[0.35]";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.attendant.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof ATTENDANT_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "live-operations":
      return t("badges.liveOperations");
    case "connectors":
      return t("badges.connectors");
    case "audit-log":
      return t("badges.auditLog");
    case "exceptions-panel":
      return t("badges.exceptions");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS)[number]["id"],
) {
  switch (id) {
    case "connectors":
      return t("alts.connectors");
    case "audit-log":
      return t("alts.auditLog");
    case "exceptions-panel":
      return t("alts.exceptions");
  }
}

export default async function AttendantSystemScreens() {
  const t = await getTranslations("productPages.attendant.systemScreens");

  return (
    <section aria-labelledby="attendant-system-screens-title">
      <ProductSystemScreensBody
        productSlug="attendant"
        title={t("title")}
        description={t("description")}
        ariaLabel={t("ariaLabel")}
        badges={ATTENDANT_SYSTEM_SCREEN_BADGES.map((badge) => ({
          ...badge,
          label: badgeLabel(t, badge.id),
        }))}
        inactiveBorderClassName={ATTENDANT_INACTIVE_BADGE_BORDER}
        main={{ ...ATTENDANT_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
        gridItems={ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS.map((item) => ({
          ...item,
          alt: gridAlt(t, item.id),
        }))}
        framed
      />
    </section>
  );
}
