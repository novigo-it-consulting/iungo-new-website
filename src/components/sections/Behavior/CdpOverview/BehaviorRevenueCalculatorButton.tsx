import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import { solidButtonHoverClassName } from "@/components/ui/buttonInteraction.styles";
import { ctaMobileTypographyAndShapeClassName } from "@/components/ui/ctaButton.styles";

/**
 * Variante do CTA de produto: compartilha forma e tipografia via
 * ctaMobileTypographyAndShapeClassName; px-[26px] e cor #000D3F são próprios
 * desta variante (o px padrão é px-7, mas este botão usa 26px por design).
 */
const behaviorRevenueCalculatorButtonClassName = [
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-reddit bg-[#000D3F] px-[26px] py-[14px] text-white",
  ctaMobileTypographyAndShapeClassName,
  solidButtonHoverClassName,
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000D3F] focus-visible:ring-offset-2",
].join(" ");

export default async function BehaviorRevenueCalculatorButton() {
  const t = await getTranslations("productPages.behavior.calculator");

  return (
    <Link
      href={SOLICITAR_DEMONSTRACAO_HREF}
      data-behavior-revenue-calculator-cta
      className={behaviorRevenueCalculatorButtonClassName}
    >
      {t("cta")}
    </Link>
  );
}
