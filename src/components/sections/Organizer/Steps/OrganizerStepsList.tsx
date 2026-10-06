import { getTranslations } from "next-intl/server";

import OrganizerStepItem from "./OrganizerStepItem";
import { ORGANIZER_STEPS } from "./organizerSteps.constants";

function stepCopy(
  t: Awaited<ReturnType<typeof getTranslations<"productPages.organizer.steps">>>,
) {
  return {
    importCatalog: {
      title: t("importCatalog.title"),
      description: t("importCatalog.description"),
    },
    enrich: {
      title: t("enrich.title"),
      description: t("enrich.description"),
    },
    publish: {
      title: t("publish.title"),
      description: t("publish.description"),
    },
  };
}

export default async function OrganizerStepsList() {
  const t = await getTranslations("productPages.organizer.steps");
  const copy = stepCopy(t);

  return (
    <ol className="m-0 grid w-full min-w-0 list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 xl:grid-cols-3">
      {ORGANIZER_STEPS.map((step) => (
        <OrganizerStepItem
          key={step.number}
          number={step.number}
          title={copy[step.id].title}
          description={copy[step.id].description}
        />
      ))}
    </ol>
  );
}
