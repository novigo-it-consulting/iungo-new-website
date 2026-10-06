import { getTranslations } from "next-intl/server";

import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import ConvertWhySellsMoreCard from "./ConvertWhySellsMoreCard";
import {
  CONVERT_WHY_SELLS_MORE_CARD_IDS,
  type ConvertWhySellsMoreCardItem,
} from "./whySellsMore.constants";

type WhyTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.convert.why">>
>;

function whyCards(t: WhyTranslator): ConvertWhySellsMoreCardItem[] {
  return [
    {
      id: CONVERT_WHY_SELLS_MORE_CARD_IDS[0],
      category: t("catalog.category"),
      title: t("catalog.title"),
      description: t("catalog.description"),
    },
    {
      id: CONVERT_WHY_SELLS_MORE_CARD_IDS[1],
      category: t("profile.category"),
      title: t("profile.title"),
      description: t("profile.description"),
    },
    {
      id: CONVERT_WHY_SELLS_MORE_CARD_IDS[2],
      category: t("moment.category"),
      title: t("moment.title"),
      description: t("moment.description"),
    },
  ];
}

export default async function ConvertWhySellsMore() {
  const t = await getTranslations("productPages.convert.why");

  return (
    <div
      data-convert-why-sells-more
      aria-labelledby="convert-why-sells-more-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductSectionHeader
        blockSlug="convert-why-sells-more"
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleId="convert-why-sells-more-title"
        description={t("description")}
      />

      <div
        data-convert-why-sells-more-cards
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {whyCards(t).map((card) => (
          <ConvertWhySellsMoreCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
