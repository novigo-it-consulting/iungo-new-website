/**
 * Leituras de foco do menu mobile.
 * As funções vão para page.evaluate.
 */
import {
  CLOSE_MENU_SELECTOR,
  MOBILE_MENU_SELECTOR,
  MOBILE_NAV_ROOT_SELECTOR,
  OPEN_MENU_SELECTOR,
} from "./mobile-nav-audit.shared.mjs";

export function readFocusStop() {
  const root = document.querySelector("[data-mobile-navigation]");
  const active = document.activeElement;
  let label = "";
  if (active instanceof HTMLElement) {
    label =
      active.getAttribute("aria-label") ||
      active.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ||
      active.id ||
      active.tagName;
  } else if (active instanceof Element) {
    label = active.getAttribute("aria-label") || active.id || active.tagName;
  } else if (active) {
    label = active.nodeName;
  }
  return {
    inside: root instanceof HTMLElement && active instanceof Node && root.contains(active),
    label,
  };
}

function backgroundInert(node, rootFound) {
  return Boolean(node?.isElement && node.inert && !(rootFound && node.insideRoot));
}

export function readMenuIsolationRaw() {
  const root = document.querySelector("[data-mobile-navigation]");
  const nodes = [
    document.querySelector("[data-header-logo]"),
    document.querySelector("footer a"),
    document.querySelector("main a, [data-page-main-content] a"),
  ];
  const described = [];
  for (const element of nodes) {
    described.push({
      isElement: element instanceof HTMLElement,
      inert: element instanceof HTMLElement && Boolean(element.closest("[inert]")),
      insideRoot: root instanceof HTMLElement && element instanceof Node && root.contains(element),
    });
  }
  const candidates = [
    ...document.querySelectorAll(
      'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
    ),
  ];
  const tabbables = [];
  for (const element of candidates) {
    if (!(element instanceof HTMLElement)) {
      continue;
    }
    const style = getComputedStyle(element);
    tabbables.push({
      tag: element.tagName,
      label:
        element.getAttribute("aria-label") ||
        element.textContent?.replace(/\s+/g, " ").trim().slice(0, 60),
      insideRoot: root instanceof HTMLElement && root.contains(element),
      inert: Boolean(element.closest("[inert]")),
      hidden: style.visibility === "hidden" || style.display === "none",
      visible: element.getClientRects().length > 0,
    });
  }
  return {
    rootFound: root instanceof HTMLElement,
    nodes: described,
    mainFound: nodes[2] instanceof HTMLElement,
    tabbables,
  };
}

export function buildMenuIsolation(raw) {
  const [logo, footerLink, mainLink] = raw.nodes;
  const tabbableOutside = [];
  for (const item of raw.tabbables) {
    if (item.insideRoot || item.inert || item.hidden || !item.visible) {
      continue;
    }
    tabbableOutside.push({ tag: item.tag, label: item.label });
  }
  return {
    rootFound: raw.rootFound,
    logoInert: backgroundInert(logo, raw.rootFound),
    footerInert: backgroundInert(footerLink, raw.rootFound),
    mainInert: raw.mainFound ? backgroundInert(mainLink, raw.rootFound) : true,
    tabbableOutside,
  };
}

export function readClosedInert() {
  const logo = document.querySelector("[data-header-logo]");
  const panel = document.getElementById("mobile-navigation-menu");
  const footerLink = document.querySelector("footer a");
  return {
    logoInert: logo instanceof HTMLElement && Boolean(logo.closest("[inert]")),
    panelInert: panel instanceof HTMLElement && panel.inert,
    footerInert: footerLink instanceof HTMLElement && Boolean(footerLink.closest("[inert]")),
  };
}

export function readCloseSnapshot() {
  const active = document.activeElement;
  const panel = document.getElementById("mobile-navigation-menu");
  return {
    label: active instanceof HTMLElement ? active.getAttribute("aria-label") || "" : "",
    panelInert: panel instanceof HTMLElement && panel.inert === true,
    scrollY: window.scrollY,
  };
}

export function readNavigationOverflow() {
  return {
    path: location.pathname,
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverscroll: document.body.style.overscrollBehavior,
  };
}

export function readDesktopFocus() {
  const active = document.activeElement;
  const hamburger = document.querySelector(
    '[aria-label="Abrir menu"], [aria-label="Fechar menu"]',
  );
  const panel = document.getElementById("mobile-navigation-menu");
  let activeLabelText = "";
  if (active instanceof HTMLElement) {
    activeLabelText = active.getAttribute("aria-label") || active.id || active.tagName;
  } else if (active instanceof Element) {
    activeLabelText = active.tagName;
  } else if (active) {
    activeLabelText = active.nodeName;
  }
  return {
    activeLabel: activeLabelText,
    hamburgerHidden: !(hamburger instanceof HTMLElement) || hamburger.offsetParent === null,
    focusOnHiddenHamburger:
      hamburger instanceof HTMLElement &&
      hamburger.offsetParent === null &&
      document.activeElement === hamburger,
    bodyOverscroll: document.body.style.overscrollBehavior,
    panelInert: panel instanceof HTMLElement && panel.inert === true,
  };
}

export const FOCUS_SELECTORS = {
  root: MOBILE_NAV_ROOT_SELECTOR,
  menu: MOBILE_MENU_SELECTOR,
  open: OPEN_MENU_SELECTOR,
  close: CLOSE_MENU_SELECTOR,
};
