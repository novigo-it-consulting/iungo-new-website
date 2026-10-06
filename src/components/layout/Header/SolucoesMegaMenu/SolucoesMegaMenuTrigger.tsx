"use client";

import { useTranslations } from "next-intl";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon";
import {
  SOLUCOES_MEGA_MENU_PANEL_ID,
} from "./solucoesMegaMenu.constants";
import { useSolucoesMegaMenu } from "./SolucoesMegaMenuContext";
import {
  solucoesMegaMenuChevronClassName,
  solucoesMegaMenuChevronOpenClassName,
  solucoesMegaMenuTriggerClassName,
  solucoesMegaMenuTriggerOpenClassName,
} from "./solucoesMegaMenu.styles";

export default function SolucoesMegaMenuTrigger() {
  const {
    isOpen,
    open,
    toggle,
    scheduleClose,
    cancelScheduledClose,
    triggerRef,
  } = useSolucoesMegaMenu();
  const t = useTranslations("header");

  return (
    <button
      ref={triggerRef}
      type="button"
      data-header-nav-item="solucoes"
      aria-expanded={isOpen}
      aria-controls={SOLUCOES_MEGA_MENU_PANEL_ID}
      className={[
        solucoesMegaMenuTriggerClassName,
        isOpen ? solucoesMegaMenuTriggerOpenClassName : "",
      ].join(" ")}
      onMouseEnter={open}
      onMouseLeave={scheduleClose}
      onFocus={cancelScheduledClose}
      onClick={toggle}
    >
      <span>{t("nav.solutions")}</span>
      <ChevronDownIcon
        className={[
          solucoesMegaMenuChevronClassName,
          isOpen ? solucoesMegaMenuChevronOpenClassName : "",
        ].join(" ")}
      />
    </button>
  );
}
