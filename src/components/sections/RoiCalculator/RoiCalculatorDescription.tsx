import { getTranslations } from "next-intl/server";

import { homeRoiSubtitleClassName } from "@/components/ui/sectionTitle.styles";

export default async function RoiCalculatorDescription() {
  const t = await getTranslations("home.roi");

  return (
    <p data-roi="description" className={homeRoiSubtitleClassName}>
      {t("description")}
    </p>
  );
}
