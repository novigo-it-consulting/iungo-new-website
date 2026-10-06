import { getTranslations } from "next-intl/server";

export default async function RoiCalculatorBadge() {
  const t = await getTranslations("home.roi");

  return (
    <span
      data-roi="badge"
      className="box-border inline-flex h-[31.8px] shrink-0 items-center justify-center overflow-visible rounded-[999px] border border-white/15 bg-white/7 px-[14.4px] py-[6.4px] backdrop-blur-sm"
    >
      <span
        data-roi="badge-text"
        className="whitespace-nowrap font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0] text-white/92"
      >
        {t("badge")}
      </span>
    </span>
  );
}
