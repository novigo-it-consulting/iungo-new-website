import { getTranslations } from "next-intl/server";

import PlainProductSystemScreensSection from "@/components/sections/shared/SystemScreens/PlainProductSystemScreensSection";

import {
  BEHAVIOR_INACTIVE_BADGE_BORDER,
  BEHAVIOR_SYSTEM_SCREEN_BADGES,
  BEHAVIOR_SYSTEM_SCREEN_GRID,
  BEHAVIOR_SYSTEM_SCREEN_HEADER_CLASS_NAMES,
  BEHAVIOR_SYSTEM_SCREEN_MAIN,
} from "./behaviorSystemScreens.constants";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.behavior.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof BEHAVIOR_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "profile-360":
      return t("badges.profile360");
    case "live-segments":
      return t("badges.liveSegments");
    case "stream-events":
      return t("badges.streamEvents");
    case "activations":
      return t("badges.activations");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof BEHAVIOR_SYSTEM_SCREEN_GRID)[number]["id"],
) {
  switch (id) {
    case "segment-builder":
      return t("alts.segmentBuilder");
    case "unified-identity":
      return t("alts.identity");
    case "activation-destinations":
      return t("alts.destinations");
  }
}

export default async function BehaviorSystemScreensSection() {
  const t = await getTranslations("productPages.behavior.systemScreens");

  return (
    <PlainProductSystemScreensSection
      productSlug="behavior"
      title={t("title")}
      description={t("description")}
      ariaLabel={t("ariaLabel")}
      inactiveBorderClassName={BEHAVIOR_INACTIVE_BADGE_BORDER}
      headerClassNames={BEHAVIOR_SYSTEM_SCREEN_HEADER_CLASS_NAMES}
      badges={BEHAVIOR_SYSTEM_SCREEN_BADGES.map((badge) => ({
        ...badge,
        label: badgeLabel(t, badge.id),
      }))}
      main={{ ...BEHAVIOR_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
      gridItems={BEHAVIOR_SYSTEM_SCREEN_GRID.map((item) => ({
        ...item,
        alt: gridAlt(t, item.id),
      }))}
    />
  );
}
