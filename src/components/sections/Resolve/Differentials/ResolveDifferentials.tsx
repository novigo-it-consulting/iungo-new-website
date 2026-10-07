import { getTranslations } from "next-intl/server";

import ResolveDifferentialCard from "./ResolveDifferentialCard";
import {
  RESOLVE_DIFFERENTIAL_CARDS,
  type ResolveDifferentialCardData,
} from "./resolveDifferentials.constants";
import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

type DifferentialsTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.resolve.differentials">>
>;

function differentialCopy(t: DifferentialsTranslator) {
  return {
    "differential-1": {
      title: t("catalog.title"),
      description: t("catalog.description"),
    },
    "differential-2": {
      title: t("profile.title"),
      description: t("profile.description"),
    },
    "differential-3": {
      title: t("handoff.title"),
      description: t("handoff.description"),
    },
    "differential-4": {
      title: t("channels.title"),
      description: t("channels.description"),
    },
    "differential-5": {
      title: t("citations.title"),
      description: t("citations.description"),
    },
    "differential-6": {
      title: t("learning.title"),
      description: t("learning.description"),
    },
  };
}

function differentialCards(t: DifferentialsTranslator): ResolveDifferentialCardData[] {
  const copy = differentialCopy(t);

  return RESOLVE_DIFFERENTIAL_CARDS.map((card) => ({
    ...card,
    title: copy[card.id].title,
    description: copy[card.id].description,
  }));
}

export default async function ResolveDifferentials() {
  const t = await getTranslations("productPages.resolve.differentials");

  return (
    <div
      data-resolve-differentials
      className="mx-auto mt-[117px] w-full min-w-0"
    >
      <div
        data-resolve-differentials-header
        className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-4 text-center"
      >
        <span
          data-resolve-differentials-eyebrow
          className="inline-flex items-center justify-center rounded-[999px] border border-[#0024AE]/[0.18] bg-[#0024AE]/[0.07] px-[14px] py-[6px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]"
        >
          {t("eyebrow")}
        </span>

        <h2
          id="resolve-differentials-title"
          data-resolve-differentials-title
          className={productSectionTitleClassName}
        >
          {t("title")}
        </h2>

        <p
          data-resolve-differentials-subtitle
          className={productSectionDescriptionClassName}
        >
          {t("subtitle")}
        </p>
      </div>

      <div
        data-resolve-differentials-grid
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 md:grid-cols-2"
      >
        {differentialCards(t).map((card) => (
          <ResolveDifferentialCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
