import { getTranslations } from "next-intl/server";

export default async function OrganizerCaseStudyDescription() {
  const t = await getTranslations("productPages.organizer.caseStudy");

  return (
    <div
      data-organizer-case-study-description
      className="w-full min-w-0 pr-1"
    >
      <p className="m-0 w-full pt-1 font-reddit text-[14px] font-normal leading-[20px] tracking-[0px] text-[#27272A]">
        {t("description")}
      </p>
    </div>
  );
}
