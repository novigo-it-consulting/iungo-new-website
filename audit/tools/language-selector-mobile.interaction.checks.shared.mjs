/**
 * Checagens de interação do seletor de idioma mobile.
 */
import {
  DESKTOP_TRIGGER,
  LANGUAGE_SELECTOR,
  MOBILE_LIST,
  MOBILE_OPTION_EN,
} from "./language-selector-audit.selectors.shared.mjs";
import {
  clickMenuToggle,
  clickMobileSelector,
  prepareViewport,
  waitForMenuExpanded,
  waitForSelectorGone,
} from "./language-selector-audit.measure.shared.mjs";
import {
  measureMobileHeader,
  readMobileEscapeState,
  readMobileMenuClosedState,
  readSharedDesktopLanguage,
} from "./language-selector-mobile.measure.shared.mjs";
import {
  capture375,
  checkClosedMenu,
  openListAndMeasure,
  openMenuAndMeasure,
} from "./language-selector-mobile.checks.shared.mjs";
import { checkLocaleSwitch } from "./language-selector-locale.checks.shared.mjs";

export async function checkClickPanelClosesList(page, prefix, record) {
  const panelClick = await page.evaluate((panelSelector) => {
    const panel = document.querySelector(panelSelector);
    const rect = panel?.getBoundingClientRect();
    if (!rect) {
      return null;
    }
    return { x: rect.left + 12, y: rect.top + 8 };
  }, LANGUAGE_SELECTOR.menuPanel);
  if (panelClick) {
    await page.mouse.click(panelClick.x, panelClick.y);
    await waitForSelectorGone(page, MOBILE_LIST);
  }
  const afterPanelClick = await measureMobileHeader(page);
  record(
    `${prefix}-click-panel-closes-list-keeps-menu`,
    afterPanelClick.list === null && afterPanelClick.menuExpanded === true,
    {
      hasList: Boolean(afterPanelClick.list),
      menuExpanded: afterPanelClick.menuExpanded,
    },
  );
}

export async function checkTwoStepEscape(page, prefix, record) {
  await clickMobileSelector(page);
  await page.waitForSelector(MOBILE_LIST, { timeout: 5000 });
  await page.keyboard.press("Escape");
  await waitForSelectorGone(page, MOBILE_LIST);
  const afterFirstEscape = await readMobileEscapeState(page);
  record(
    `${prefix}-escape-closes-list-only`,
    afterFirstEscape.listClosed &&
      afterFirstEscape.menuExpanded &&
      afterFirstEscape.triggerFocused,
    afterFirstEscape,
  );
  await page.keyboard.press("Escape");
  await waitForMenuExpanded(page, false);
  const afterSecondEscape = await readMobileMenuClosedState(page);
  record(
    `${prefix}-second-escape-closes-menu`,
    afterSecondEscape.menuClosed &&
      afterSecondEscape.toggleFocused &&
      afterSecondEscape.selectorGone,
    afterSecondEscape,
  );
}

export async function checkSelectionKeepsMenuOpen(page, prefix, record) {
  await clickMenuToggle(page);
  await waitForMenuExpanded(page, true);
  await clickMobileSelector(page);
  await page.waitForSelector(MOBILE_OPTION_EN, { timeout: 5000 });
  await Promise.all([
    page.waitForFunction(() => document.documentElement.lang === "en", {
      timeout: 10000,
    }),
    page.click(MOBILE_OPTION_EN),
  ]);
  const afterSelect = await measureMobileHeader(page);
  record(
    `${prefix}-select-en-navigates`,
    afterSelect.menuExpanded === false &&
      afterSelect.list === null &&
      afterSelect.mobileSelectorInDom === false,
    { menuExpanded: afterSelect.menuExpanded, label: afterSelect.triggerLabel },
  );
}

export async function checkCloseMenuRemovesSelector(page, prefix, record) {
  const current = await measureMobileHeader(page);
  if (!current.menuExpanded) {
    await clickMenuToggle(page);
    await waitForMenuExpanded(page, true);
  }
  await clickMenuToggle(page);
  await waitForMenuExpanded(page, false);
  const afterMenuClose = await measureMobileHeader(page);
  record(
    `${prefix}-close-menu-removes-selector-and-list`,
    afterMenuClose.mobileSelectorInDom === false &&
      afterMenuClose.list === null &&
      afterMenuClose.menuExpanded === false,
    {
      inDom: afterMenuClose.mobileSelectorInDom,
      menuExpanded: afterMenuClose.menuExpanded,
    },
  );
}

export async function checkSharedStateAfterResize(page, record) {
  await prepareViewport(page, {
    name: "375",
    width: 375,
    height: 800,
    isMobile: true,
  }, LANGUAGE_SELECTOR.headerLogo);
  await clickMenuToggle(page);
  await waitForMenuExpanded(page, true);
  await clickMobileSelector(page);
  await page.waitForSelector(MOBILE_OPTION_EN, { timeout: 5000 });
  await Promise.all([
    page.waitForFunction(() => document.documentElement.lang === "en", {
      timeout: 10000,
    }),
    page.click(MOBILE_OPTION_EN),
  ]);
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  await page.waitForFunction(
    (desktopTrigger) => {
      const desktop = document.querySelector(desktopTrigger);
      return (desktop?.getClientRects().length ?? 0) > 0;
    },
    { timeout: 5000 },
    DESKTOP_TRIGGER,
  );
  const shared = await readSharedDesktopLanguage(page);
  record(
    "shared-state-en-after-resize-to-1440",
    shared.desktopLabel.includes("EN") &&
      shared.desktopAria === "Language: English" &&
      shared.desktopFlag === "en" &&
      shared.mobileGone,
    shared,
  );
}

export async function runMobileViewport(page, viewport, ctx) {
  const { record, measurements } = ctx;
  await prepareViewport(page, viewport, LANGUAGE_SELECTOR.headerLogo);
  const prefix = viewport.name;
  const closed = await measureMobileHeader(page);
  measurements.push({ viewport: `${prefix}-closed`, ...closed });
  if (checkClosedMenu(prefix, viewport, closed, record) === "desktop") {
    return;
  }
  await capture375(
    page,
    viewport,
    "language-selector-mobile-375-menu-closed.png",
    `${prefix}-screenshot-menu-closed`,
    record,
  );
  const opened = await openMenuAndMeasure(page, prefix, closed, record);
  measurements.push({ viewport: `${prefix}-open`, ...opened });
  await capture375(
    page,
    viewport,
    "language-selector-mobile-375-menu-open.png",
    `${prefix}-screenshot-menu-open`,
    record,
  );
  await openListAndMeasure(page, prefix, opened.headerHeight, record);
  await capture375(
    page,
    viewport,
    "language-selector-mobile-375-menu-open-list.png",
    `${prefix}-screenshot-menu-open-list`,
    record,
  );
  await checkClickPanelClosesList(page, prefix, record);
  await checkTwoStepEscape(page, prefix, record);
  await checkSelectionKeepsMenuOpen(page, prefix, record);
  await checkCloseMenuRemovesSelector(page, prefix, record);
  if (viewport.name === "375") {
    await checkLocaleSwitch(page, viewport, record);
  }
}
