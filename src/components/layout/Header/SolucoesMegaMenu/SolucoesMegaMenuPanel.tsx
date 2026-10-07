"use client";

import { focusMovedOutside } from "@/components/ui/focusMovedOutside";

import {
  SOLUCOES_MEGA_MENU_PANEL_ID,
  SOLUCOES_MEGA_MENU_PANEL_MIN_HEIGHT_PX,
} from "./solucoesMegaMenu.constants";
import { useSolucoesMegaMenu } from "./SolucoesMegaMenuContext";
import {
  solucoesMegaMenuPanelClassName,
  solucoesMegaMenuPanelInnerClassName,
  solucoesMegaMenuContainerClassName,
} from "./solucoesMegaMenu.styles";
import SolucoesMegaMenuColumns from "./SolucoesMegaMenuColumns";

export default function SolucoesMegaMenuPanel() {
  const {
    isOpen,
    panelRef,
    triggerRef,
    cancelScheduledClose,
    scheduleClose,
  } = useSolucoesMegaMenu();

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id={SOLUCOES_MEGA_MENU_PANEL_ID}
      ref={panelRef}
      data-solucoes-mega-menu-panel
      className={solucoesMegaMenuPanelClassName}
      style={{ minHeight: `${SOLUCOES_MEGA_MENU_PANEL_MIN_HEIGHT_PX}px` }}
      onMouseEnter={cancelScheduledClose}
      onMouseLeave={scheduleClose}
      onFocusCapture={cancelScheduledClose}
      onBlurCapture={(event) => {
        if (
          focusMovedOutside(
            event.relatedTarget,
            panelRef.current,
            triggerRef.current,
          )
        ) {
          scheduleClose();
        }
      }}
    >
      <div
        className={solucoesMegaMenuPanelInnerClassName}
        data-solucoes-mega-menu-panel-inner
      >
        <div
          className={solucoesMegaMenuContainerClassName}
          data-solucoes-mega-menu-container
        >
          <SolucoesMegaMenuColumns />
        </div>
      </div>
    </div>
  );
}
