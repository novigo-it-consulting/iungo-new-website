import { getTranslations } from "next-intl/server";

import ConvertHandoffCard from "./ConvertHandoffCard";
import {
  CONVERT_HANDOFF_CARD_IDS,
  type ConvertHandoffCardItem,
} from "./convertHandoff.constants";

type HandoffTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.convert.handoff">>
>;

function handoffCards(t: HandoffTranslator): ConvertHandoffCardItem[] {
  return [
    {
      id: CONVERT_HANDOFF_CARD_IDS[0],
      title: t("summary.title"),
      description: t("summary.description"),
    },
    {
      id: CONVERT_HANDOFF_CARD_IDS[1],
      title: t("products.title"),
      description: t("products.description"),
    },
    {
      id: CONVERT_HANDOFF_CARD_IDS[2],
      title: t("profile.title"),
      description: t("profile.description"),
    },
    {
      id: CONVERT_HANDOFF_CARD_IDS[3],
      title: t("nextAction.title"),
      description: t("nextAction.description"),
    },
  ];
}

export default async function ConvertHandoff() {
  const t = await getTranslations("productPages.convert.handoff");

  return (
    <div
      data-convert-handoff-container
      aria-labelledby="convert-handoff-title"
      className="box-border flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-[#E4E4E7] bg-white p-12"
    >
      <span
        data-convert-handoff-badge
        className="m-0 inline-flex w-fit shrink-0 items-center justify-center self-start rounded-[999px] border border-[#96989A]/[0.30] bg-[#96989A]/[0.12] px-[14.4px] py-[6.4px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#4D7C0F]"
      >
        {t("eyebrow")}
      </span>

      <h2
        id="convert-handoff-title"
        data-convert-handoff-title
        className="m-0 w-full min-w-0 font-reddit text-2xl font-bold leading-8 tracking-[-0.48px] text-[#27272A]"
      >
        {t("title")}
      </h2>

      <p
        data-convert-handoff-description
        className="m-0 w-full min-w-0 font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
      >
        {t("description")}
      </p>

      <div
        data-convert-handoff-cards
        className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
      >
        {handoffCards(t).map((item) => (
          <ConvertHandoffCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
