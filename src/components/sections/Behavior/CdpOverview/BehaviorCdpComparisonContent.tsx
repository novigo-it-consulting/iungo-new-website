import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import BehaviorFeatureCheckIcon from "./BehaviorFeatureCheckIcon";
import { BEHAVIOR_CDP_FEATURE_IDS } from "./behaviorCdpComparison.constants";
import {
  homeSectionTitleMobileClassName,
  productSectionDescriptionBaseClassName,
} from "@/components/ui/sectionTitle.styles";

const miniContainerClassName = "flex w-full min-w-0 max-w-[567px] flex-col";

const titleClassName = [
  "m-0 w-full font-reddit font-bold text-[#27272A] tracking-[-0.56px]",
  homeSectionTitleMobileClassName,
  "xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]",
].join(" ");

const featureClassName =
  "font-reddit text-[14px] font-normal leading-[20px] text-[#27272A]";

type CdpTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.behavior.cdp">>
>;

function featureLabel(t: CdpTranslator, id: (typeof BEHAVIOR_CDP_FEATURE_IDS)[number]) {
  switch (id) {
    case "ingestion":
      return t("ingestion");
    case "identity":
      return t("identity");
    case "predictions":
      return t("predictions");
    case "lgpd":
      return t("lgpd");
    case "integrations":
      return t("integrations");
  }
}

function Emphasis({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-[#27272A]">{children}</strong>;
}

export default async function BehaviorCdpComparisonContent() {
  const t = await getTranslations("productPages.behavior.cdp");

  return (
    <div
      data-behavior-cdp-comparison-content
      className="flex min-w-0 w-full max-w-[567px] flex-col gap-4"
    >
      <div
        data-behavior-cdp-comparison-title-block
        className={miniContainerClassName}
      >
        <h2
          id="behavior-cdp-comparison-title"
          data-behavior-cdp-comparison-title
          className={titleClassName}
        >
          {t("title")}
        </h2>
      </div>

      <div
        data-behavior-cdp-comparison-paragraph-1-block
        className={miniContainerClassName}
      >
        <p data-behavior-cdp-comparison-paragraph-1 className={productSectionDescriptionBaseClassName}>
          {t("batch")}
        </p>
      </div>

      <div
        data-behavior-cdp-comparison-paragraph-2-block
        className={miniContainerClassName}
      >
        <p data-behavior-cdp-comparison-paragraph-2 className={productSectionDescriptionBaseClassName}>
          {t.rich("live", {
            strong: (chunks: ReactNode) => <Emphasis>{chunks}</Emphasis>,
          })}
        </p>
      </div>

      <div
        data-behavior-cdp-comparison-features-block
        className={miniContainerClassName}
      >
        <ul
          data-behavior-cdp-comparison-features
          className="m-0 flex list-none flex-col gap-3 p-0 pr-2"
        >
          {BEHAVIOR_CDP_FEATURE_IDS.map((featureId) => (
            <li
              key={featureId}
              data-behavior-cdp-comparison-feature-item
              className="flex w-full min-w-0 items-start gap-3"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-[22px] w-5 shrink-0 items-center justify-center"
              >
                <BehaviorFeatureCheckIcon className="h-[10px] w-[14px] shrink-0" />
              </span>
              <span className={featureClassName}>{featureLabel(t, featureId)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
