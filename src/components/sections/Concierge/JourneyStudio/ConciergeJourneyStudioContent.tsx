import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import SectionEyebrow from "@/components/ui/SectionEyebrow";
import {
  homeSectionTitleMobileClassName,
  productSectionDescriptionBaseClassName,
} from "@/components/ui/sectionTitle.styles";

function StudioBreak() {
  return <br className="hidden xl:block" />;
}

function StudioStrong({ children }: { children: ReactNode }) {
  return <strong className="font-bold text-[#27272A]">{children}</strong>;
}

export default async function ConciergeJourneyStudioContent() {
  const t = await getTranslations("productPages.concierge.studio");

  return (
    <div
      data-concierge-studio-content
      className="flex min-w-0 w-full flex-col gap-4"
    >
      <SectionEyebrow variant="compact">{t("eyebrow")}</SectionEyebrow>

      <h2
        id="concierge-studio-title"
        data-concierge-studio-title
        className={[
          "m-0 w-full font-reddit font-bold text-[#27272A] tracking-[-0.56px]",
          homeSectionTitleMobileClassName,
          "xl:text-[32px] xl:leading-[40px] xl:tracking-[-0.64px]",
        ].join(" ")}
      >
        {t.rich("title", { br: () => <StudioBreak /> })}
      </h2>

      <p
        data-concierge-studio-description
        className={productSectionDescriptionBaseClassName}
      >
        {t.rich("description", { br: () => <StudioBreak /> })}
      </p>

      <p
        data-concierge-studio-behavior-description
        className={productSectionDescriptionBaseClassName}
      >
        {t.rich("behavior", {
          strong: (chunks: ReactNode) => <StudioStrong>{chunks}</StudioStrong>,
          br: () => <StudioBreak />,
        })}
      </p>
    </div>
  );
}
