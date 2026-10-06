import { getTranslations } from "next-intl/server";

import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  CONVERT_SYSTEM_SCREEN_BADGES,
  CONVERT_SYSTEM_SCREEN_GRID_ITEMS,
  CONVERT_SYSTEM_SCREEN_MAIN,
} from "./convertSystemScreens.constants";

const CONVERT_INACTIVE_BADGE_BORDER = "border-[#0078AA]/[0.35]";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.convert.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof CONVERT_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "pipeline-ia":
      return t("badges.pipeline");
    case "conversa-em-curso":
      return t("badges.conversation");
    case "briefing-handoff":
      return t("badges.briefing");
    case "performance-vendedor":
      return t("badges.performance");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof CONVERT_SYSTEM_SCREEN_GRID_ITEMS)[number]["id"],
) {
  switch (id) {
    case "conversa-ao-vivo":
      return t("alts.conversation");
    case "briefing-pro-vendedor":
      return t("alts.briefing");
    case "performance-do-time":
      return t("alts.performance");
  }
}

export default async function ConvertSystemScreens() {
  const t = await getTranslations("productPages.convert.systemScreens");

  return (
    <ProductSystemScreensBody
      productSlug="convert"
      title={t("title")}
      description={t("description")}
      ariaLabel={t("ariaLabel")}
      badges={CONVERT_SYSTEM_SCREEN_BADGES.map((badge) => ({
        ...badge,
        label: badgeLabel(t, badge.id),
      }))}
      inactiveBorderClassName={CONVERT_INACTIVE_BADGE_BORDER}
      main={{ ...CONVERT_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
      gridItems={CONVERT_SYSTEM_SCREEN_GRID_ITEMS.map((item) => ({
        ...item,
        alt: gridAlt(t, item.id),
      }))}
      framed
    />
  );
}
