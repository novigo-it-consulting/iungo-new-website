import { getTranslations } from "next-intl/server";

import OrganizerCapabilityCard from "./OrganizerCapabilityCard";
import { ORGANIZER_CAPABILITIES } from "./organizerCapabilities.constants";

function capabilityCopy(
  t: Awaited<ReturnType<typeof getTranslations<"productPages.organizer.capabilities">>>,
) {
  return {
    "generative-enrichment": {
      title: t("generativeEnrichment.title"),
      description: t("generativeEnrichment.description"),
    },
    "duplicate-detection": {
      title: t("duplicateDetection.title"),
      description: t("duplicateDetection.description"),
    },
    "auto-syndication": {
      title: t("autoSyndication.title"),
      description: t("autoSyndication.description"),
    },
    "native-dam": {
      title: t("nativeDam.title"),
      description: t("nativeDam.description"),
    },
    "approval-workflow": {
      title: t("approvalWorkflow.title"),
      description: t("approvalWorkflow.description"),
    },
    "px-insights": {
      title: t("pxInsights.title"),
      description: t("pxInsights.description"),
    },
  };
}

export default async function OrganizerCapabilitiesGrid() {
  const t = await getTranslations("productPages.organizer.capabilities");
  const copy = capabilityCopy(t);

  return (
    <ul className="m-0 grid w-full min-w-0 list-none grid-cols-1 auto-rows-fr gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {ORGANIZER_CAPABILITIES.map((capability) => (
        <OrganizerCapabilityCard
          key={capability.id}
          title={copy[capability.id].title}
          description={copy[capability.id].description}
          icon={capability.icon}
        />
      ))}
    </ul>
  );
}
