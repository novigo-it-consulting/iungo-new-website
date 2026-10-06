/**
 * Abre o menu, rola o painel e confere o desktop.
 */
import { AUDIT_BASE_URL, repeatUntil } from "./audit.shared.mjs";
import {
  CLOSE_MENU_SELECTOR,
  MOBILE_MENU_SELECTOR,
  OPEN_MENU_SELECTOR,
  openAuditMobileMenu,
} from "./mobile-nav-audit.shared.mjs";
import { readDesktopNav, readMegaMenu, readAfterResize, readResizeLock } from "./mobile-nav-scroll.desktop.measure.shared.mjs";
import {
  buildExpandedMetrics,
  collectExpandedMenuRaw,
} from "./mobile-nav-scroll.expanded.measure.shared.mjs";
import {
  expandSolucoesInPage,
  readClosedMenu,
  readCollapsedBanner,
  readPanelBox,
  readScrollBack,
  toggleDetailsBeforeClose,
} from "./mobile-nav-scroll.panel.measure.shared.mjs";
import {
  isCollapsedBannerValid,
  isCollapsedNotFullPage,
  recordExpandedMetrics,
  recordFullyVisibleGroup,
} from "./mobile-nav-scroll.checks.shared.mjs";

const DESKTOP_TRIGGER = '[data-header-nav-item="solucoes"]';
const MEGA_PANEL = "[data-solucoes-mega-menu-panel]";

async function openMobileMenu(page, record, viewport) {
  const opened = await openAuditMobileMenu(page);
  if (!opened) {
    record(`${viewport.name}:hamburger`, false, "missing");
    return false;
  }
  await page.waitForSelector(MOBILE_MENU_SELECTOR, { timeout: 5000 });
  await page.waitForFunction(
    (selector) => {
      const panel = document.querySelector(selector);
      return panel instanceof HTMLElement && getComputedStyle(panel).visibility === "visible";
    },
    { timeout: 5000 },
    MOBILE_MENU_SELECTOR,
  );
  return true;
}

async function wheelPanel(page, panelBox, deltaY, stopAtTop) {
  await page.mouse.move(panelBox.x, panelBox.y);
  await new Promise((resolve) => setTimeout(resolve, 100));
  let previousScrollTop = -1;
  await repeatUntil(
    async (step) => {
      const scrollTop = await page.$eval(MOBILE_MENU_SELECTOR, (element) => element.scrollTop);
      const reachedTop = stopAtTop && scrollTop === 0;
      const stuck = !stopAtTop && step > 0 && scrollTop === previousScrollTop;
      if (reachedTop || stuck) {
        return true;
      }
      previousScrollTop = scrollTop;
      await page.mouse.wheel({ deltaY });
      await new Promise((resolve) => setTimeout(resolve, 40));
      return false;
    },
    (done) => done === true,
    24,
  );
}

async function waitForPanelScrollEnd(page) {
  await page
    .waitForFunction(
      (selector) => {
        const panel = document.querySelector(selector);
        if (!(panel instanceof HTMLElement)) {
          return false;
        }
        const maxScroll = panel.scrollHeight - panel.clientHeight;
        return maxScroll <= 1 || panel.scrollTop >= maxScroll - 2;
      },
      { timeout: 4000 },
      MOBILE_MENU_SELECTOR,
    )
    .catch(() => {});
}

async function recordCollapsed(page, record, viewport) {
  const collapsed = await page.evaluate(readCollapsedBanner);
  record(`${viewport.name}:collapsed-banner-ends-after-buttons`, isCollapsedBannerValid(collapsed), collapsed);
  record(`${viewport.name}:collapsed-not-full-page`, isCollapsedNotFullPage(collapsed, viewport), collapsed);
}

async function recordExpanded(page, record, viewport, panelBox) {
  await wheelPanel(page, panelBox, 600, false);
  await waitForPanelScrollEnd(page);
  const rawMenu = await collectExpandedMenuRaw(page);
  const metrics = rawMenu ? buildExpandedMetrics(rawMenu) : null;
  if (!metrics) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }
  recordExpandedMetrics(record, viewport, metrics);
  await wheelPanel(page, panelBox, -600, true);
  const backAtTop = await page.evaluate(readScrollBack);
  record(`${viewport.name}:scroll-back-to-start`, backAtTop.scrollTop === 0 && backAtTop.summaryVisible === true, backAtTop);
}

async function recordAfterClose(page, record, viewport) {
  await page.evaluate(toggleDetailsBeforeClose);
  await page.click(CLOSE_MENU_SELECTOR);
  const afterClose = await page.evaluate(readClosedMenu);
  record(`${viewport.name}:scroll-lock-cleared-after-close`, afterClose.bodyOverscroll !== "none", afterClose);
  record(
    `${viewport.name}:closed-panel-inert`,
    afterClose.inert === true && afterClose.pointerEvents === "none",
    afterClose,
  );
}

export async function inspectViewport(page, record, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  if (!(await openMobileMenu(page, record, viewport))) {
    return;
  }
  await recordCollapsed(page, record, viewport);
  await page.evaluate(expandSolucoesInPage);
  const panelBox = await page.evaluate(readPanelBox);
  if (!panelBox) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }
  await recordExpanded(page, record, viewport, panelBox);
  await recordAfterClose(page, record, viewport);
}

function recordDesktopGroups(record, mega) {
  record("desktop:mega-menu-opens", Boolean(mega?.visible && mega?.withinViewport), mega);
  recordFullyVisibleGroup(record, "desktop:product-descriptions-visible", "descriptionCount", "visibleDescriptionCount", mega);
  recordFullyVisibleGroup(record, "desktop:category-subtitles-visible", "subtitleCount", "visibleSubtitleCount", mega);
  recordFullyVisibleGroup(record, "desktop:view-links-visible", "viewLinkCount", "visibleViewLinkCount", mega);
  record("desktop:no-mobile-product-dividers", Boolean(mega) && mega.hasMobileDividers === false, mega);
}

export async function inspectDesktop(page, record) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(DESKTOP_TRIGGER, { visible: true, timeout: 10000 });
  const desktop = await page.evaluate(readDesktopNav);
  record("desktop:hamburger-hidden", desktop.hamburgerHidden, desktop);
  record("desktop:mobile-panel-inert", desktop.mobilePanelHidden, desktop);
  record("desktop:solucoes-trigger", desktop.hasDesktopTrigger, desktop);
  await page.hover(DESKTOP_TRIGGER);
  await page.waitForSelector(MEGA_PANEL, { visible: true, timeout: 8000 });
  recordDesktopGroups(record, await page.evaluate(readMegaMenu));
}

export async function inspectDesktopAfterMobileOpen(page, record) {
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(
    (selector) => {
      const hamburger = document.querySelector(selector);
      return hamburger instanceof HTMLElement && hamburger.offsetParent !== null;
    },
    { timeout: 10000 },
    OPEN_MENU_SELECTOR,
  );
  await page.click(OPEN_MENU_SELECTOR);
  await page.waitForSelector(CLOSE_MENU_SELECTOR, { timeout: 8000 });
  const locked = await page.evaluate(readResizeLock);
  record("resize:menu-open-on-mobile", locked.hamburgerOpen === true && locked.bodyOverscroll === "none", locked);
  await page.setViewport({ width: 1280, height: 800 });
  await page.waitForFunction(
    (selector) =>
      document.querySelector(selector) === null && document.body.style.overscrollBehavior !== "none",
    { timeout: 5000 },
    CLOSE_MENU_SELECTOR,
  );
  const afterResize = await page.evaluate(readAfterResize);
  record("resize-to-desktop:overflow-restored", afterResize.bodyOverscroll !== "none", afterResize);
  record("resize-to-desktop:mobile-nav-hidden", afterResize.hamburgerHidden === true, afterResize);
}
