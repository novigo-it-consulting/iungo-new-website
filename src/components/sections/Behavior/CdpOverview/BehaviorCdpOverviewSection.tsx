import PageContainer from "@/components/layout/PageContainer";

import BehaviorCdpComparison from "./BehaviorCdpComparison";
import BehaviorRevenueCalculatorCard from "./BehaviorRevenueCalculatorCard";

export default function BehaviorCdpOverviewSection() {
  return (
    <section
      data-behavior-cdp-overview-section
      aria-label="Visão geral do Iungo Behavior CDP"
      className="w-full min-w-0 bg-white xl:min-h-[942px]"
    >
      <PageContainer
        data-behavior-cdp-overview-container
        size="content1280"
        className="box-border flex min-w-0 flex-col py-[80px] xl:min-h-[942px]"
      >
        <div
          data-behavior-cdp-overview-content
          className="flex min-h-0 w-full min-w-0 flex-1 flex-col"
        >
          <BehaviorRevenueCalculatorCard />
          <BehaviorCdpComparison />
        </div>
      </PageContainer>
    </section>
  );
}
