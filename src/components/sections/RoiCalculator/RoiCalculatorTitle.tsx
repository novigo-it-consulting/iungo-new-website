import { getTranslations } from "next-intl/server";

import { homeRoiTitleClassName } from "@/components/ui/sectionTitle.styles";

function renderRoiLineBreak() {
  return <br />;
}

export default async function RoiCalculatorTitle() {
  const t = await getTranslations("home.roi");

  return (
    <h2 id="roi-title" data-roi="title" className={homeRoiTitleClassName}>
      {t.rich("title", {
        br: renderRoiLineBreak,
      })}
    </h2>
  );
}
