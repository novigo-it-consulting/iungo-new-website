"use client";

import { useTranslations } from "next-intl";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import SolucoesMegaMenuMobileCategories from "./SolucoesMegaMenuMobileCategories";
import {
  solucoesMobileGroupButtonClassName,
  solucoesMegaMenuChevronClassName,
} from "./solucoesMegaMenu.styles";

type SolucoesMobileNavGroupProps = {
  onNavigate: () => void;
};

export default function SolucoesMobileNavGroup({
  onNavigate,
}: Readonly<SolucoesMobileNavGroupProps>) {
  const t = useTranslations("header");
  const panelId = "mobile-solucoes-nav-group";

  return (
    <li>
      <details className="group/details">
        <summary
          className={`${solucoesMobileGroupButtonClassName} list-none [&::-webkit-details-marker]:hidden`}
          aria-controls={panelId}
        >
          <span>{t("nav.solutions")}</span>
          <ChevronDownIcon
            className={`${solucoesMegaMenuChevronClassName} group-open/details:rotate-180 group-open/details:text-[#0024AE]`}
          />
        </summary>

        <div id={panelId}>
          <SolucoesMegaMenuMobileCategories onProductNavigate={onNavigate} />
        </div>
      </details>
    </li>
  );
}
