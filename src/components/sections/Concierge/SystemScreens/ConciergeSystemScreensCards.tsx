import { getTranslations } from "next-intl/server";

import ProductSystemScreensImageGrid from "@/components/sections/shared/SystemScreens/ProductSystemScreensImageGrid";

import { CONCIERGE_SYSTEM_SCREEN_CARDS } from "./conciergeSystemScreens.constants";

type ScreensTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.concierge.systemScreens">>
>;

function cardAlt(
  t: ScreensTranslator,
  id: (typeof CONCIERGE_SYSTEM_SCREEN_CARDS)[number]["id"],
) {
  switch (id) {
    case "templates-prontos":
      return t("alts.templates");
    case "ab-test-embarcado":
      return t("alts.abTest");
    case "funil-por-etapa":
      return t("alts.funnel");
  }
}

export default async function ConciergeSystemScreensCards() {
  const t = await getTranslations("productPages.concierge.systemScreens");

  return (
    <ProductSystemScreensImageGrid
      productSlug="concierge"
      items={CONCIERGE_SYSTEM_SCREEN_CARDS.map((card) => ({
        ...card,
        alt: cardAlt(t, card.id),
      }))}
      className="mt-6 xl:min-h-[301px]"
    />
  );
}
