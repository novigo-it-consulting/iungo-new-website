import { getTranslations } from "next-intl/server";

import { homeRoiTitleClassName } from "@/components/ui/sectionTitle.styles";

export default async function RoiCalculatorTitle() {
  const t = await getTranslations("home.roi");

  return (
    <h2 id="roi-title" data-roi="title" className={homeRoiTitleClassName}>
      {t.rich("title", {
        br: () => <br />,
      })}
    </h2>
  );
}
