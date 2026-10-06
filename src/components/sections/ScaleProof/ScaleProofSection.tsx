import { getTranslations } from "next-intl/server";
import { Fragment } from "react";

import PageContainer from "@/components/layout/PageContainer";
import { homeSectionTitleClassName } from "@/components/ui/sectionTitle.styles";

import { SCALE_PROOF_ITEMS } from "./scaleProof.constants";
import "./homeScaleProof.css";

type ScaleProofEmphasis = (typeof SCALE_PROOF_ITEMS)[number]["emphasis"];
type ScaleProofLabelKey = (typeof SCALE_PROOF_ITEMS)[number]["labelKey"];
type ScaleProofTranslator = Awaited<
  ReturnType<typeof getTranslations<"home.scaleProof">>
>;

type ScaleProofView = {
  id: string;
  label: string;
  emphasis: ScaleProofEmphasis;
};

function itemClassName(emphasis: ScaleProofEmphasis): string {
  if (emphasis === "strong") {
    return "shrink-0 whitespace-nowrap font-reddit text-2xl font-bold leading-8 text-[#27272A]/70";
  }
  if (emphasis === "strong-italic") {
    return "shrink-0 whitespace-nowrap font-reddit text-2xl font-bold italic leading-8 text-[#27272A]/70";
  }
  return "shrink-0 whitespace-nowrap font-reddit text-sm font-normal leading-5 text-[#71717A]";
}

function scaleProofLabel(labelKey: ScaleProofLabelKey, t: ScaleProofTranslator): string {
  switch (labelKey) {
    case "trackedAssets":
      return t("items.trackedAssets");
    case "deploymentValue":
      return t("items.deploymentValue");
    case "simultaneousBrands":
      return t("items.simultaneousBrands");
    case "raiaDrogasil":
      return t("items.raiaDrogasil");
    case "premiumFashionLeader":
      return t("items.premiumFashionLeader");
    default: {
      const exhaustive: never = labelKey;
      return exhaustive;
    }
  }
}

function scaleProofViews(t: ScaleProofTranslator): readonly ScaleProofView[] {
  return SCALE_PROOF_ITEMS.map((item) => ({
    id: item.id,
    emphasis: item.emphasis,
    label: scaleProofLabel(item.labelKey, t),
  }));
}

function ScaleProofItems({
  groupId,
  items,
}: {
  readonly groupId: string;
  readonly items: readonly ScaleProofView[];
}) {
  return (
    <>
      {items.map((item) => (
        <Fragment key={`${groupId}-${item.id}`}>
          <span className={`${itemClassName(item.emphasis)} px-6`}>
            {item.label}
          </span>
          <span aria-hidden="true" className="shrink-0 px-15 text-[#71717A]">
            ·
          </span>
        </Fragment>
      ))}
    </>
  );
}

export default async function ScaleProofSection() {
  const t = await getTranslations("home.scaleProof");
  const items = scaleProofViews(t);

  return (
    <section
      aria-labelledby="home-scale-proof-title"
      data-scale-proof-section
      className="w-full bg-white py-12"
    >
      <PageContainer size="content1264">
        <h2
          id="home-scale-proof-title"
          data-scale-proof-title
          className={`mb-8 ${homeSectionTitleClassName}`}
        >
          {t("title")}
        </h2>

        <div data-scale-proof-viewport className="overflow-hidden">
          <div data-scale-proof-track className="flex w-max items-center">
            {/* Grupo 1 — acessível para leitores de tela */}
            <div data-scale-proof-group className="flex shrink-0 items-center">
              <ScaleProofItems groupId="primary" items={items} />
            </div>

            {/* Grupo 2 — cópia decorativa, oculta de leitores de tela */}
            <div
              data-scale-proof-group
              aria-hidden="true"
              className="flex shrink-0 items-center"
            >
              <ScaleProofItems groupId="duplicate" items={items} />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
