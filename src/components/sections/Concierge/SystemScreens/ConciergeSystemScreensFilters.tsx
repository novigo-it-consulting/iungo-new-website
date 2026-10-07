import { getTranslations } from "next-intl/server";

import ProductSystemScreensBadges from "@/components/sections/shared/SystemScreens/ProductSystemScreensBadges";
import { CONCIERGE_SYSTEM_SCREEN_BADGES } from "./conciergeSystemScreens.constants";

const CONCIERGE_INACTIVE_BADGE_BORDER = "border-[rgba(167,33,33,0.35)]";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.concierge.systemScreens">>
>;

function badgeLabel(
  t: ScreensTranslator,
  id: (typeof CONCIERGE_SYSTEM_SCREEN_BADGES)[number]["id"],
) {
  switch (id) {
    case "canvas-drag-drop":
      return t("badges.canvas");
    case "templates-regua":
      return t("badges.templates");
    case "ab-test":
      return t("badges.abTest");
    case "metricas-etapa":
      return t("badges.stepMetrics");
  }
}

export default async function ConciergeSystemScreensFilters() {
  const t = await getTranslations("productPages.concierge.systemScreens");

  return (
    <ProductSystemScreensBadges
      productSlug="concierge"
      ariaLabel={t("filtersAria")}
      badges={CONCIERGE_SYSTEM_SCREEN_BADGES.map((badge) => ({
        ...badge,
        label: badgeLabel(t, badge.id),
      }))}
      inactiveBorderClassName={CONCIERGE_INACTIVE_BADGE_BORDER}
      wrapperClassName="mt-6 w-full xl:min-h-[62px]"
    />
  );
}
