import PageContainer from "@/components/layout/PageContainer";
import ConciergeTriggerCard from "./ConciergeTriggerCard";
import ConciergeTriggersHeader from "./ConciergeTriggersHeader";
import { CONCIERGE_TRIGGERS } from "./conciergeTriggers.constants";

export default function ConciergeTriggersSection() {
  return (
    <section
      data-concierge-triggers-section
      aria-labelledby="concierge-triggers-title"
      className="w-full min-w-0 bg-white py-12 md:py-16 xl:min-h-[442px] xl:py-[74.1px]"
    >
      <PageContainer
        data-concierge-triggers-container
        size="content1280"
        className="min-h-[220px] sm:min-h-[260px] xl:min-h-[293.8px]"
      >
        <ConciergeTriggersHeader />

        <div className="mt-16 w-full px-4 sm:px-6 xl:px-8">
          <ul
            data-concierge-triggers-grid
            className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
          >
            {CONCIERGE_TRIGGERS.map((trigger) => (
              <ConciergeTriggerCard
                key={trigger.id}
                value={trigger.value}
                title={trigger.title}
                description={trigger.description}
              />
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
