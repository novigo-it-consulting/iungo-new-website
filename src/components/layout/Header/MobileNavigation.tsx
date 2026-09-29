"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";

import { NAV_LINK_ITEMS, HEADER_BUTTONS } from "./header.constants";
import {
  mobileNavActionsClassName,
  mobileNavClientButtonClassName,
  mobileNavDemoButtonClassName,
  mobileNavItemClassName,
  mobileNavPanelClassName,
  mobileNavPanelInnerClassName,
  mobileNavToggleBarClassName,
  mobileNavToggleBarMiddleClassName,
  mobileNavToggleClassName,
} from "./header.styles";
import SolucoesMobileNavGroup from "./SolucoesMegaMenu/SolucoesMobileNavGroup";

/** Mesmo ponto do `xl:hidden` deste menu (breakpoint `xl` padrão do Tailwind). */
const HEADER_DESKTOP_MEDIA_QUERY = "(min-width: 80rem)";

const TABBABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "summary",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type MobileNavCloseReason = "toggle" | "escape" | "navigate" | "desktop";

function getTabbableElements(root: HTMLElement) {
  return [...root.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)].filter(
    (element) => {
      if (element.tabIndex < 0) {
        return false;
      }

      if (element.closest("[inert]")) {
        return false;
      }

      const style = getComputedStyle(element);

      if (style.visibility === "hidden" || style.display === "none") {
        return false;
      }

      return element.getClientRects().length > 0;
    },
  );
}

/** `aria-modal` avisa leitores de tela, mas não tira o fundo da ordem de Tab. */
function isolateFromBackground(keep: HTMLElement) {
  const previousInert = new Map<HTMLElement, boolean>();
  let current: HTMLElement | null = keep;

  while (current) {
    const parent: HTMLElement | null = current.parentElement;

    if (!parent) {
      break;
    }

    for (const sibling of parent.children) {
      if (sibling === current || !(sibling instanceof HTMLElement)) {
        continue;
      }

      previousInert.set(sibling, sibling.inert);
      sibling.inert = true;
    }

    if (parent === document.body) {
      break;
    }

    current = parent;
  }

  return () => {
    for (const [element, wasInert] of previousInert) {
      element.inert = wasInert;
    }
  };
}

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = "mobile-navigation-menu";
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isOpenRef = useRef(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const closeMenu = useCallback((reason: MobileNavCloseReason) => {
    if (!isOpenRef.current) {
      return;
    }

    const panel = panelRef.current;
    const active = document.activeElement;
    const focusInsidePanel = Boolean(
      panel && active instanceof Node && panel.contains(active),
    );

    if (reason === "escape" || reason === "toggle") {
      toggleRef.current?.focus({ preventScroll: true });
    } else if (
      reason === "desktop" &&
      (focusInsidePanel || active === toggleRef.current)
    ) {
      const logo = document.querySelector<HTMLElement>("[data-header-logo]");
      logo?.focus({ preventScroll: true });
    }

    setIsOpen(false);
  }, []);

  const closeByNavigate = useCallback(() => {
    closeMenu("navigate");
  }, [closeMenu]);

  useEffect(() => {
    const desktopQuery = window.matchMedia(HEADER_DESKTOP_MEDIA_QUERY);

    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        closeMenu("desktop");
      }
    };

    closeOnDesktop();
    desktopQuery.addEventListener("change", closeOnDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [closeMenu]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    const { body, documentElement } = document;
    const root = rootRef.current;
    const panel = panelRef.current;
    const previousBodyOverscroll = body.style.overscrollBehavior;
    const previousHtmlOverscroll = documentElement.style.overscrollBehavior;

    body.style.overscrollBehavior = "none";
    documentElement.style.overscrollBehavior = "none";

    const restoreBackground = root ? isolateFromBackground(root) : undefined;

    const isInsidePanel = (event: Event) => {
      if (!panel) {
        return false;
      }

      if (event.target instanceof Node && panel.contains(event.target)) {
        return true;
      }

      if (event instanceof WheelEvent) {
        const hit = document.elementFromPoint(event.clientX, event.clientY);
        return Boolean(hit && panel.contains(hit));
      }

      if (event instanceof TouchEvent) {
        const touch = event.touches[0] ?? event.changedTouches[0];

        if (!touch) {
          return false;
        }

        const hit = document.elementFromPoint(touch.clientX, touch.clientY);
        return Boolean(hit && panel.contains(hit));
      }

      return false;
    };

    const stopBackgroundScroll = (event: Event) => {
      if (isInsidePanel(event)) {
        return;
      }

      event.preventDefault();
    };

    document.addEventListener("wheel", stopBackgroundScroll, { passive: false });
    document.addEventListener("touchmove", stopBackgroundScroll, {
      passive: false,
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu("escape");
        return;
      }

      if (event.key !== "Tab" || !root) {
        return;
      }

      const tabbable = getTabbableElements(root);

      if (tabbable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = tabbable[0];
      const last = tabbable.at(-1);
      if (!first || !last) {
        event.preventDefault();
        return;
      }

      const active = document.activeElement;
      const isInside = active instanceof Node && root.contains(active);

      if (event.shiftKey) {
        if (!isInside || active === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!isInside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      body.style.overscrollBehavior = previousBodyOverscroll;
      documentElement.style.overscrollBehavior = previousHtmlOverscroll;
      restoreBackground?.();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", stopBackgroundScroll);
      document.removeEventListener("touchmove", stopBackgroundScroll);
    };
  }, [closeMenu, isOpen]);

  const areaClienteHref = HEADER_BUTTONS.areaCliente.href;

  return (
    <div ref={rootRef} data-mobile-navigation className="xl:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => {
          if (isOpen) {
            closeMenu("toggle");
            return;
          }

          setIsOpen(true);
        }}
        className={mobileNavToggleClassName}
      >
        <span
          aria-hidden="true"
          className={[
            mobileNavToggleBarClassName,
            isOpen ? "translate-y-[7px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          aria-hidden="true"
          className={[
            mobileNavToggleBarMiddleClassName,
            isOpen ? "opacity-0" : "",
          ].join(" ")}
        />
        <span
          aria-hidden="true"
          className={[
            mobileNavToggleBarClassName,
            isOpen ? "-translate-y-[7px] -rotate-45" : "",
          ].join(" ")}
        />
      </button>

      <div
        ref={panelRef}
        id={menuId}
        role="dialog"
        aria-label="Menu de navegação"
        aria-modal={isOpen}
        inert={!isOpen}
        className={[
          mobileNavPanelClassName,
          isOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className={mobileNavPanelInnerClassName}>
          <nav aria-label="Navegação mobile">
            <ul className="mb-6 flex flex-col">
              <SolucoesMobileNavGroup onNavigate={closeByNavigate} />
              {NAV_LINK_ITEMS.map((item) => (
                <li key={item.id}>
                  {isAvailableHref(item.href) ? (
                    <Link
                      href={item.href}
                      onClick={closeByNavigate}
                      className={mobileNavItemClassName}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={mobileNavItemClassName}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={mobileNavActionsClassName}>
            {isAvailableHref(areaClienteHref) ? (
              <Link
                href={areaClienteHref}
                onClick={closeByNavigate}
                className={mobileNavClientButtonClassName}
              >
                {HEADER_BUTTONS.areaCliente.label}
              </Link>
            ) : (
              <span className={mobileNavClientButtonClassName}>
                {HEADER_BUTTONS.areaCliente.label}
              </span>
            )}
            <Link
              href={HEADER_BUTTONS.solicitarDemo.href}
              onClick={closeByNavigate}
              className={mobileNavDemoButtonClassName}
            >
              {HEADER_BUTTONS.solicitarDemo.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
