import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";

import SectionEyebrow from "@/components/ui/SectionEyebrow";

import BehaviorRevenueCalculatorButton from "./BehaviorRevenueCalculatorButton";

export default async function BehaviorRevenueCalculatorCard() {
  const t = await getTranslations("productPages.behavior.calculator");

  return (
    <section
      data-behavior-revenue-calculator-card
      aria-labelledby="behavior-revenue-calculator-title"
      className="mx-auto box-border w-full max-w-[896px] rounded-[16px] bg-[#F4F4F5]"
    >
      <div className="flex w-full flex-col items-center gap-4 px-[48px] py-[48px]">
        <SectionEyebrow variant="compact">
          {t("eyebrow")}
        </SectionEyebrow>

        <div
          data-behavior-revenue-calculator-title-container
          className="flex w-full max-w-[800px] flex-col items-center xl:min-h-[36px]"
        >
          <h2
            id="behavior-revenue-calculator-title"
            data-behavior-revenue-calculator-title
            className="m-0 w-full text-center font-reddit text-[30px] font-bold leading-[36px] tracking-[-0.6px] text-[#27272A]"
          >
            {t("title")}
          </h2>
        </div>

        <div
          data-behavior-revenue-calculator-subtitle-container
          className="flex w-full max-w-[672px] flex-col items-center pb-2 xl:min-h-[56px]"
        >
          <p
            data-behavior-revenue-calculator-subtitle
            className="m-0 w-full text-center font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
          >
            {t.rich("description", {
              strong: (chunks: ReactNode) => (
                <strong className="font-bold text-[#27272A]">{chunks}</strong>
              ),
            })}
          </p>
        </div>

        <BehaviorRevenueCalculatorButton />
      </div>
    </section>
  );
}
