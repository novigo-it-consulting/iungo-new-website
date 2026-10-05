/**
 * Leitura do DOM do Header no fluxo mobile do seletor de idioma.
 */
import { LANGUAGE_SELECTOR } from "./language-selector-audit.selectors.shared.mjs";

function readMobileLayout(sel) {
  const boxOf = (el) => {
    if (!el) {
      return null;
    }
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    return {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
      right: rect.right,
      bottom: rect.bottom,
      display: style.display,
      visibility: style.visibility,
      zIndex: style.zIndex,
    };
  };
  const header = document.querySelector(sel.header);
  const logo =
    document.querySelector(`${sel.headerLogo} img`) ??
    document.querySelector(sel.headerLogo);
  const toggle = document.querySelector(sel.menuToggle);
  const list = document.querySelector(`${sel.mobileInstance} ${sel.list}`);
  const listRect = list?.getBoundingClientRect();
  return {
    headerHeight: header?.getBoundingClientRect().height ?? null,
    pageOverflowX: document.documentElement.scrollWidth - window.innerWidth,
    logo: boxOf(logo),
    toggle: boxOf(toggle),
    selector: boxOf(
      document.querySelector(`${sel.mobileInstance} ${sel.trigger}`),
    ),
    desktopSelector: boxOf(
      document.querySelector(`${sel.desktopInstance} ${sel.trigger}`),
    ),
    list: list
      ? {
          ...boxOf(list),
          inViewport:
            listRect.left >= -0.5 &&
            listRect.right <= window.innerWidth + 0.5 &&
            listRect.top >= -0.5 &&
            listRect.bottom <= window.innerHeight + 0.5,
        }
      : null,
    panel: boxOf(document.querySelector(sel.menuPanel)),
    footerLogoWidth:
      document.querySelector(sel.footerLogoImg)?.getBoundingClientRect()
        .width ?? null,
  };
}

function readMobileMeta(sel) {
  const mobileRoot = document.querySelector(sel.mobileInstance);
  const mobileTrigger = mobileRoot?.querySelector(sel.trigger);
  const desktopTrigger = document.querySelector(
    `${sel.desktopInstance} ${sel.trigger}`,
  );
  const toggle = document.querySelector(sel.menuToggle);
  const tabbableSelector = [
    "a[href]",
    "button:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(",");
  const headerTabbables = [
    ...(document.querySelector(sel.header)?.querySelectorAll(tabbableSelector) ??
      []),
  ].filter((el) => {
    const style = getComputedStyle(el);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      el.getClientRects().length > 0 &&
      !el.closest("[inert]")
    );
  });
  return {
    innerWidth: window.innerWidth,
    mobileSelectorInDom: Boolean(mobileRoot),
    mobileTriggerTabbable: headerTabbables.includes(mobileTrigger),
    menuExpanded: toggle?.getAttribute("aria-expanded") === "true",
    triggerLabel:
      mobileTrigger?.textContent?.replace(/\s+/g, " ").trim() ??
      desktopTrigger?.textContent?.replace(/\s+/g, " ").trim() ??
      "",
    ids: [...document.querySelectorAll("[id]")]
      .map((el) => el.id)
      .filter(Boolean),
  };
}

export async function measureMobileHeader(page) {
  const layout = await page.evaluate(readMobileLayout, LANGUAGE_SELECTOR);
  const meta = await page.evaluate(readMobileMeta, LANGUAGE_SELECTOR);
  return { ...layout, ...meta };
}

export async function readMobileEscapeState(page) {
  return page.evaluate((sel) => {
    const trigger = document.querySelector(
      `${sel.mobileInstance} ${sel.trigger}`,
    );
    const toggle = document.querySelector(sel.menuToggle);
    return {
      listClosed:
        document.querySelector(`${sel.mobileInstance} ${sel.list}`) === null,
      menuExpanded: toggle?.getAttribute("aria-expanded") === "true",
      triggerFocused: document.activeElement === trigger,
    };
  }, LANGUAGE_SELECTOR);
}

export async function readMobileMenuClosedState(page) {
  return page.evaluate((sel) => {
    const toggle = document.querySelector(sel.menuToggle);
    return {
      menuClosed: toggle?.getAttribute("aria-expanded") === "false",
      toggleFocused: document.activeElement === toggle,
      selectorGone: document.querySelector(sel.mobileInstance) === null,
    };
  }, LANGUAGE_SELECTOR);
}

export async function readSharedDesktopLanguage(page) {
  return page.evaluate((sel) => {
    const desktop = document.querySelector(
      `${sel.desktopInstance} ${sel.trigger}`,
    );
    return {
      desktopLabel: desktop?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      desktopAria: desktop?.getAttribute("aria-label") ?? "",
      desktopFlag: desktop
        ?.querySelector(sel.flag)
        ?.getAttribute("data-header-language-flag"),
      mobileGone: document.querySelector(sel.mobileInstance) === null,
    };
  }, LANGUAGE_SELECTOR);
}
