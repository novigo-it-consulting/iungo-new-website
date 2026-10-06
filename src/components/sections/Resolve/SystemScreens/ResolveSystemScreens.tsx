import { getTranslations } from "next-intl/server";

import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  RESOLVE_SYSTEM_SCREEN_BADGES,
  RESOLVE_SYSTEM_SCREEN_GRID_ITEMS,
  RESOLVE_SYSTEM_SCREEN_MAIN,
} from "./resolveSystemScreens.constants";

const RESOLVE_INACTIVE_BADGE_BORDER = "border-[rgba(200,79,4,0.35)]";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.resolve.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof RESOLVE_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "console":
      return t("badges.console");
    case "training":
      return t("badges.training");
    case "quality-assurance":
      return t("badges.quality");
    case "supervision-handoff":
      return t("badges.supervision");
  }
}

function gridAlt(
  t: ScreensTranslator,
  id: (typeof RESOLVE_SYSTEM_SCREEN_GRID_ITEMS)[number]["id"],
) {
  switch (id) {
    case "pim-training":
      return t("alts.training");
    case "quality-assurance":
      return t("alts.quality");
    case "supervision-handoff":
      return t("alts.supervision");
  }
}

export default async function ResolveSystemScreens() {
  const t = await getTranslations("productPages.resolve.systemScreens");

  return (
    <section aria-labelledby="resolve-system-screens-title">
      <ProductSystemScreensBody
        productSlug="resolve"
        title={t("title")}
        description={t("description")}
        ariaLabel={t("ariaLabel")}
        badges={RESOLVE_SYSTEM_SCREEN_BADGES.map((badge) => ({
          ...badge,
          label: badgeLabel(t, badge.id),
        }))}
        inactiveBorderClassName={RESOLVE_INACTIVE_BADGE_BORDER}
        main={{ ...RESOLVE_SYSTEM_SCREEN_MAIN, alt: t("alts.main") }}
        gridItems={RESOLVE_SYSTEM_SCREEN_GRID_ITEMS.map((item) => ({
          ...item,
          alt: gridAlt(t, item.id),
        }))}
        mainSizes="(max-width: 1216px) 100vw, 1216px"
        framed
      />
    </section>
  );
}
