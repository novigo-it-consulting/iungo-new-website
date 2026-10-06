import { getTranslations } from "next-intl/server";

import PlainProductSystemScreensSection from "@/components/sections/shared/SystemScreens/PlainProductSystemScreensSection";

import {
  ORGANIZER_INACTIVE_BADGE_BORDER,
  ORGANIZER_SYSTEM_SCREEN_BADGES,
  ORGANIZER_SYSTEM_SCREEN_GRID,
  ORGANIZER_SYSTEM_SCREEN_MAIN,
} from "./organizerSystemScreens.constants";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.organizer.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof ORGANIZER_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "product-sheet":
      return t("badges.productSheet");
    case "editorial-workflow":
      return t("badges.editorialWorkflow");
    case "attributes-taxonomy":
      return t("badges.attributesTaxonomy");
    case "channels-publication":
      return t("badges.channelsPublication");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof ORGANIZER_SYSTEM_SCREEN_GRID)[number]["id"],
) {
  switch (id) {
    case "editorial-workflow":
      return t("alts.editorialWorkflow");
    case "attributes-taxonomy":
      return t("alts.attributesTaxonomy");
    case "ai-panel":
      return t("alts.aiPanel");
  }
}

export default async function OrganizerSystemScreensSection() {
  const t = await getTranslations("productPages.organizer.systemScreens");

  return (
    <PlainProductSystemScreensSection
      productSlug="organizer"
      title={t("title")}
      description={t("description")}
      ariaLabel={t("ariaLabel")}
      inactiveBorderClassName={ORGANIZER_INACTIVE_BADGE_BORDER}
      badges={ORGANIZER_SYSTEM_SCREEN_BADGES.map((badge) => ({
        ...badge,
        label: badgeLabel(t, badge.id),
      }))}
      main={{ ...ORGANIZER_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
      gridItems={ORGANIZER_SYSTEM_SCREEN_GRID.map((item) => ({
        ...item,
        alt: gridAlt(t, item.id),
      }))}
    />
  );
}
