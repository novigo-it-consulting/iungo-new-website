"use client";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";

import { SOLUCOES_NAV_LABEL } from "../header.constants";
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
  const panelId = "mobile-solucoes-nav-group";

  return (
    <li>
      <details className="group/details">
        <summary
          className={`${solucoesMobileGroupButtonClassName} list-none [&::-webkit-details-marker]:hidden`}
          aria-controls={panelId}
        >
          <span>{SOLUCOES_NAV_LABEL}</span>
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
