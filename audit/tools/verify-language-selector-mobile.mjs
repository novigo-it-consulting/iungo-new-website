/**
 * Seletor de idioma mobile: visível só com o menu aberto; lista não fecha o menu.
 * Viewports: 320, 375, 768 e 1440.
 * Executar com o dev server: node verify-language-selector-mobile.mjs
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const SIZE_TOLERANCE_PX = 0.6;
const POSITION_TOLERANCE_PX = 1.5;
const SCREENSHOT_DIR = "C:/iungo-website/audit/tools";

const VIEWPORTS = [
  { name: "320", width: 320, height: 800, isMobile: true, expectedLogo: 107 },
  { name: "375", width: 375, height: 800, isMobile: true, expectedLogo: 130 },
  { name: "768", width: 768, height: 800, isMobile: true, expectedLogo: 145 },
  { name: "1440", width: 1440, height: 900, isMobile: false, expectedLogo: 150 },
];

const results = [];
const measurements = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
}

function near(actual, expected, tolerance = SIZE_TOLERANCE_PX) {
  return Math.abs(actual - expected) <= tolerance;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

async function wait(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function gotoHome(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page
    .waitForNetworkIdle({ idleTime: 500, timeout: 10000 })
    .catch(() => {});
  await page.waitForSelector("[data-header-logo]", { timeout: 10000 });
}

async function setView(page, viewport) {
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    isMobile: viewport.isMobile,
    hasTouch: viewport.isMobile,
  });
}

async function measure(page) {
  return page.evaluate(() => {
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

    const header = document.querySelector("[data-header]");
    const logoImg =
      document.querySelector("[data-header-logo] img") ??
      document.querySelector("[data-header-logo]");
    const toggle = document.querySelector("[data-mobile-navigation-toggle]");
    const mobileRoot = document.querySelector(
      '[data-header-language-instance="mobile"]',
    );
    const mobileTrigger = mobileRoot?.querySelector(
      "[data-header-language-selector]",
    );
    const desktopTrigger = document.querySelector(
      '[data-header-language-instance="desktop"] [data-header-language-selector]',
    );
    const list = document.querySelector(
      '[data-header-language-instance="mobile"] [data-header-language-list]',
    );
    const panel = document.querySelector("#mobile-navigation-menu");
    const footerLogo = document.querySelector("[data-footer-logo] img");

    const tabbableSelector = [
      "a[href]",
      "button:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const headerTabbables = [
      ...(document.querySelector("[data-header]")?.querySelectorAll(tabbableSelector) ??
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
      headerHeight: header?.getBoundingClientRect().height ?? null,
      pageOverflowX:
        document.documentElement.scrollWidth - window.innerWidth,
      logo: boxOf(logoImg),
      toggle: boxOf(toggle),
      selector: boxOf(mobileTrigger),
      desktopSelector: boxOf(desktopTrigger),
      mobileSelectorInDom: Boolean(mobileRoot),
      mobileTriggerTabbable: headerTabbables.includes(mobileTrigger),
      menuExpanded:
        toggle?.getAttribute("aria-expanded") === "true",
      list: list
        ? {
            ...boxOf(list),
            inViewport:
              list.getBoundingClientRect().left >= -0.5 &&
              list.getBoundingClientRect().right <= window.innerWidth + 0.5 &&
              list.getBoundingClientRect().top >= -0.5 &&
              list.getBoundingClientRect().bottom <= window.innerHeight + 0.5,
          }
        : null,
      panel: boxOf(panel),
      footerLogoWidth: footerLogo?.getBoundingClientRect().width ?? null,
      triggerLabel:
        mobileTrigger?.textContent?.replace(/\s+/g, " ").trim() ??
        desktopTrigger?.textContent?.replace(/\s+/g, " ").trim() ??
        "",
      ids: [...document.querySelectorAll("[id]")]
        .map((el) => el.id)
        .filter(Boolean),
    };
  });
}

async function clickToggle(page) {
  await page.waitForSelector("[data-mobile-navigation-toggle]", {
    visible: true,
    timeout: 5000,
  });
  await page.click("[data-mobile-navigation-toggle]");
}

async function clickMobileSelector(page) {
  const selector =
    '[data-header-language-instance="mobile"] [data-header-language-selector]';
  await page.waitForSelector(selector, { visible: true, timeout: 5000 });
  await page.click(selector);
}

async function headerClip(page, extraBottom = 16) {
  return page.evaluate((extra) => {
    const header = document.querySelector("[data-header]");
    const list = document.querySelector("[data-header-language-list]");
    const panel = document.querySelector("#mobile-navigation-menu");
    const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
    const listBottom = list?.getBoundingClientRect().bottom ?? 0;
    const panelBottom = panel?.getBoundingClientRect().bottom ?? 0;
    const menuOpen =
      document
        .querySelector("[data-mobile-navigation-toggle]")
        ?.getAttribute("aria-expanded") === "true";
    const bottom = Math.max(
      headerBottom,
      listBottom,
      menuOpen ? Math.min(panelBottom, headerBottom + 280) : 0,
    );
    return {
      x: 0,
      y: 0,
      width: Math.ceil(window.innerWidth),
      height: Math.min(window.innerHeight, Math.ceil(bottom + extra)),
    };
  }, extraBottom);
}

let chrome;
let browser;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });
  browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
  });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => {
    pageErrors.push(String(error));
  });

  for (const viewport of VIEWPORTS) {
    await setView(page, viewport);
    await gotoHome(page);
    await wait(200);
    const prefix = viewport.name;
    const closed = await measure(page);
    measurements.push({ viewport: `${prefix}-closed`, ...closed });

    const duplicateIds = closed.ids.filter(
      (id, index) => closed.ids.indexOf(id) !== index,
    );
    record(
      `${prefix}-no-overflow-x`,
      closed.pageOverflowX <= 0.5,
      closed.pageOverflowX,
    );
    record(
      `${prefix}-logo-width`,
      Boolean(closed.logo && near(closed.logo.width, viewport.expectedLogo, 1)),
      { actual: closed.logo?.width, expected: viewport.expectedLogo },
    );
    record(
      `${prefix}-footer-logo-unchanged`,
      closed.footerLogoWidth !== null &&
        near(closed.footerLogoWidth, 127.13, 1),
      closed.footerLogoWidth,
    );
    record(
      `${prefix}-no-duplicate-ids`,
      duplicateIds.length === 0,
      duplicateIds,
    );

    if (viewport.width >= 1280) {
      record(
        `${prefix}-mobile-selector-absent`,
        closed.mobileSelectorInDom === false,
        { inDom: closed.mobileSelectorInDom },
      );
      record(
        `${prefix}-desktop-selector-89x42`,
        Boolean(
          closed.desktopSelector &&
            near(closed.desktopSelector.width, 89) &&
            near(closed.desktopSelector.height, 42),
        ),
        closed.desktopSelector,
      );
      continue;
    }

    record(
      `${prefix}-closed-selector-absent`,
      closed.mobileSelectorInDom === false &&
        closed.selector === null &&
        closed.mobileTriggerTabbable === false,
      {
        inDom: closed.mobileSelectorInDom,
        tabbable: closed.mobileTriggerTabbable,
      },
    );
    record(
      `${prefix}-closed-toggle-44`,
      Boolean(
        closed.toggle &&
          near(closed.toggle.width, 44) &&
          near(closed.toggle.height, 44),
      ),
      closed.toggle,
    );

    if (viewport.name === "375") {
      const clipClosed = await headerClip(page, 8);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/language-selector-mobile-375-menu-closed.png`,
        clip: clipClosed,
        captureBeyondViewport: true,
      });
      record(`${prefix}-screenshot-menu-closed`, true, clipClosed);
    }

    await clickToggle(page);
    await page.waitForFunction(
      () =>
        document
          .querySelector("[data-mobile-navigation-toggle]")
          ?.getAttribute("aria-expanded") === "true",
      { timeout: 5000 },
    );
    await wait(150);
    const opened = await measure(page);
    measurements.push({ viewport: `${prefix}-open`, ...opened });

    record(
      `${prefix}-open-selector-present`,
      opened.mobileSelectorInDom === true &&
        Boolean(
          opened.selector &&
            near(opened.selector.width, 89) &&
            near(opened.selector.height, 42),
        ),
      opened.selector,
    );
    record(
      `${prefix}-logo-position-stable`,
      Boolean(
        closed.logo &&
          opened.logo &&
          near(closed.logo.x, opened.logo.x, POSITION_TOLERANCE_PX) &&
          near(closed.logo.y, opened.logo.y, POSITION_TOLERANCE_PX) &&
          near(closed.logo.width, opened.logo.width, 1),
      ),
      { closed: closed.logo, opened: opened.logo },
    );
    record(
      `${prefix}-toggle-position-stable`,
      Boolean(
        closed.toggle &&
          opened.toggle &&
          near(closed.toggle.x, opened.toggle.x, POSITION_TOLERANCE_PX) &&
          near(closed.toggle.y, opened.toggle.y, POSITION_TOLERANCE_PX),
      ),
      { closed: closed.toggle, opened: opened.toggle },
    );
    record(
      `${prefix}-selector-left-of-toggle`,
      Boolean(
        opened.selector &&
          opened.toggle &&
          opened.selector.right <= opened.toggle.x + 0.5,
      ),
      { selectorRight: opened.selector?.right, toggleX: opened.toggle?.x },
    );
    record(
      `${prefix}-gap-selector-toggle-16`,
      Boolean(
        opened.selector &&
          opened.toggle &&
          near(
            opened.toggle.x - opened.selector.right,
            16,
            POSITION_TOLERANCE_PX,
          ),
      ),
      opened.selector && opened.toggle
        ? opened.toggle.x - opened.selector.right
        : null,
    );
    record(
      `${prefix}-selector-not-inert`,
      opened.mobileTriggerTabbable === true,
      { tabbable: opened.mobileTriggerTabbable },
    );

    if (viewport.name === "375") {
      const clipOpen = await headerClip(page, 16);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/language-selector-mobile-375-menu-open.png`,
        clip: clipOpen,
        captureBeyondViewport: true,
      });
      record(`${prefix}-screenshot-menu-open`, true, clipOpen);
    }

    const headerHeightMenuOpen = opened.headerHeight;
    await clickMobileSelector(page);
    await page.waitForSelector(
      '[data-header-language-instance="mobile"] [data-header-language-list]',
      { timeout: 5000 },
    );
    await wait(150);
    const listOpen = await measure(page);
    record(
      `${prefix}-open-list-keeps-menu-open`,
      listOpen.menuExpanded === true && listOpen.list !== null,
      { menuExpanded: listOpen.menuExpanded, hasList: Boolean(listOpen.list) },
    );
    record(
      `${prefix}-list-header-height-unchanged`,
      near(listOpen.headerHeight ?? 0, headerHeightMenuOpen ?? -1, 0.5),
      { menu: headerHeightMenuOpen, list: listOpen.headerHeight },
    );
    record(
      `${prefix}-list-in-viewport`,
      listOpen.list?.inViewport === true,
      listOpen.list,
    );
    record(
      `${prefix}-list-z-above-panel`,
      Number.parseInt(listOpen.list?.zIndex ?? "-1", 10) >= 60 &&
        Number.parseInt(listOpen.panel?.zIndex ?? "-1", 10) === 50,
      { listZ: listOpen.list?.zIndex, panelZ: listOpen.panel?.zIndex },
    );

    if (viewport.name === "375") {
      const clipList = await headerClip(page, 16);
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/language-selector-mobile-375-menu-open-list.png`,
        clip: clipList,
        captureBeyondViewport: true,
      });
      record(`${prefix}-screenshot-menu-open-list`, true, clipList);
    }

    const panelClick = await page.evaluate(() => {
      const panel = document.querySelector("#mobile-navigation-menu");
      const rect = panel?.getBoundingClientRect();
      if (!rect) {
        return null;
      }
      return { x: rect.left + 12, y: rect.top + 8 };
    });
    if (panelClick) {
      await page.mouse.click(panelClick.x, panelClick.y);
      await wait(150);
    }
    const afterPanelClick = await measure(page);
    record(
      `${prefix}-click-panel-closes-list-keeps-menu`,
      afterPanelClick.list === null && afterPanelClick.menuExpanded === true,
      {
        hasList: Boolean(afterPanelClick.list),
        menuExpanded: afterPanelClick.menuExpanded,
      },
    );

    await clickMobileSelector(page);
    await page.waitForSelector(
      '[data-header-language-instance="mobile"] [data-header-language-list]',
      { timeout: 5000 },
    );
    await page.keyboard.press("Escape");
    await wait(150);
    const afterFirstEscape = await page.evaluate(() => {
      const trigger = document.querySelector(
        '[data-header-language-instance="mobile"] [data-header-language-selector]',
      );
      const toggle = document.querySelector("[data-mobile-navigation-toggle]");
      return {
        listClosed:
          document.querySelector(
            '[data-header-language-instance="mobile"] [data-header-language-list]',
          ) === null,
        menuExpanded: toggle?.getAttribute("aria-expanded") === "true",
        triggerFocused: document.activeElement === trigger,
      };
    });
    record(
      `${prefix}-escape-closes-list-only`,
      afterFirstEscape.listClosed &&
        afterFirstEscape.menuExpanded &&
        afterFirstEscape.triggerFocused,
      afterFirstEscape,
    );

    await page.keyboard.press("Escape");
    await wait(150);
    const afterSecondEscape = await page.evaluate(() => {
      const toggle = document.querySelector("[data-mobile-navigation-toggle]");
      return {
        menuClosed: toggle?.getAttribute("aria-expanded") === "false",
        toggleFocused: document.activeElement === toggle,
        selectorGone:
          document.querySelector(
            '[data-header-language-instance="mobile"]',
          ) === null,
      };
    });
    record(
      `${prefix}-second-escape-closes-menu`,
      afterSecondEscape.menuClosed &&
        afterSecondEscape.toggleFocused &&
        afterSecondEscape.selectorGone,
      afterSecondEscape,
    );

    await clickToggle(page);
    await wait(150);
    await clickMobileSelector(page);
    await page.waitForSelector(
      '[data-header-language-instance="mobile"] [data-header-language-option="en"]',
      { timeout: 5000 },
    );
    await page.click(
      '[data-header-language-instance="mobile"] [data-header-language-option="en"]',
    );
    await wait(150);
    const afterSelect = await measure(page);
    record(
      `${prefix}-select-en-keeps-menu-open`,
      afterSelect.menuExpanded === true &&
        afterSelect.list === null &&
        afterSelect.triggerLabel.includes("EN"),
      {
        menuExpanded: afterSelect.menuExpanded,
        label: afterSelect.triggerLabel,
      },
    );

    await clickToggle(page);
    await wait(150);
    const afterMenuClose = await measure(page);
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

  await setView(page, VIEWPORTS.find((item) => item.name === "375"));
  await gotoHome(page);
  await clickToggle(page);
  await wait(150);
  await clickMobileSelector(page);
  await page.waitForSelector(
    '[data-header-language-instance="mobile"] [data-header-language-option="en"]',
    { timeout: 5000 },
  );
  await page.click(
    '[data-header-language-instance="mobile"] [data-header-language-option="en"]',
  );
  await page.waitForFunction(
    () => {
      const trigger = document.querySelector(
        '[data-header-language-instance="mobile"] [data-header-language-selector]',
      );
      return trigger?.textContent?.includes("EN");
    },
    { timeout: 5000 },
  );
  await page.setViewport({
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
  });
  await page.waitForFunction(
    () => {
      const desktop = document.querySelector(
        '[data-header-language-instance="desktop"] [data-header-language-selector]',
      );
      return Boolean(desktop && desktop.getClientRects().length > 0);
    },
    { timeout: 5000 },
  );
  const shared = await page.evaluate(() => {
    const desktop = document.querySelector(
      '[data-header-language-instance="desktop"] [data-header-language-selector]',
    );
    return {
      desktopLabel: desktop?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      desktopAria: desktop?.getAttribute("aria-label") ?? "",
      desktopFlag: desktop
        ?.querySelector("[data-header-language-flag]")
        ?.getAttribute("data-header-language-flag"),
      mobileGone:
        document.querySelector(
          '[data-header-language-instance="mobile"]',
        ) === null,
    };
  });
  record(
    "shared-state-en-after-resize-to-1440",
    shared.desktopLabel.includes("EN") &&
      shared.desktopAria === "Idioma: English" &&
      shared.desktopFlag === "en" &&
      shared.mobileGone,
    shared,
  );

  record("home-no-pageerror", pageErrors.length === 0, pageErrors);

  console.log(
    JSON.stringify(
      {
        measurements: measurements.map((item) => ({
          viewport: item.viewport,
          logo: item.logo
            ? {
                width: round(item.logo.width),
                x: round(item.logo.x),
                y: round(item.logo.y),
              }
            : null,
          toggle: item.toggle
            ? {
                width: round(item.toggle.width),
                x: round(item.toggle.x),
                y: round(item.toggle.y),
              }
            : null,
          selector: item.selector
            ? {
                width: round(item.selector.width),
                x: round(item.selector.x),
              }
            : null,
          mobileSelectorInDom: item.mobileSelectorInDom,
          menuExpanded: item.menuExpanded,
          pageOverflowX: round(item.pageOverflowX),
        })),
        results,
      },
      null,
      2,
    ),
  );

  const failed = results.filter((item) => !item.pass);
  if (failed.length > 0) {
    console.error("FAILED", JSON.stringify(failed, null, 2));
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  try {
    if (chrome) {
      await chrome.kill();
    }
  } catch {
    // ignore
  }
  if (process.exitCode === 1) {
    process.exit(1);
  }
}
