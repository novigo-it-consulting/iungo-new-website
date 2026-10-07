/**
 * Percorre Tab, Escape e troca de largura do menu mobile.
 */
import { AUDIT_BASE_URL, runSequentially } from "./audit.shared.mjs";
import { OPEN_MENU_SELECTOR, CLOSE_MENU_SELECTOR } from "./mobile-nav-audit.shared.mjs";
import {
  recordCloseSnapshot,
  recordClosedInert,
  recordFocusStaysInside,
  recordIsolation,
} from "./mobile-nav-focus.checks.shared.mjs";
import {
  readCloseSnapshot,
  readClosedInert,
  readDesktopFocus,
  readFocusStop,
  buildMenuIsolation,
  readMenuIsolationRaw,
  readNavigationOverflow,
} from "./mobile-nav-focus.measure.shared.mjs";

const TAB_PRESSES = Array.from({ length: 16 }, (_, index) => index);

async function openMenu(page) {
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(OPEN_MENU_SELECTOR, { timeout: 10000 });
  await page.click(OPEN_MENU_SELECTOR);
  await page.waitForSelector(CLOSE_MENU_SELECTOR, { timeout: 8000 });
}

async function collectStops(page, press) {
  const stops = [];
  await runSequentially(TAB_PRESSES, async () => {
    await press(page);
    stops.push(await page.evaluate(readFocusStop));
  });
  return stops;
}

async function pressTab(page) {
  await page.keyboard.press("Tab");
}

async function pressShiftTab(page) {
  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  await page.keyboard.up("Shift");
}

export async function inspectOpenMenu(page, record) {
  await openMenu(page);
  recordIsolation(record, buildMenuIsolation(await page.evaluate(readMenuIsolationRaw)));
  const tabStops = await collectStops(page, pressTab);
  recordFocusStaysInside(record, "open:tab-stays-inside", tabStops, {
    stops: "tabStops",
    escaped: "tabEscaped",
  });
  record(
    "open:tab-reaches-menu-items",
    tabStops.some((stop) => stop.label.includes("Soluções")) &&
      tabStops.some((stop) => stop.label.includes("Solicitar Demonstração")),
    tabStops.map((stop) => stop.label),
  );
  const shiftStops = await collectStops(page, pressShiftTab);
  recordFocusStaysInside(record, "open:shift-tab-stays-inside", shiftStops, {
    stops: "shiftStops",
    escaped: "shiftEscaped",
  });
  await page.keyboard.press("Escape");
  await page.waitForSelector(OPEN_MENU_SELECTOR, { timeout: 5000 });
  recordClosedInert(record, await page.evaluate(readClosedInert));
}

async function closeByControl(page, record, control, prefix) {
  await page.click(OPEN_MENU_SELECTOR);
  await page.waitForSelector(CLOSE_MENU_SELECTOR, { timeout: 8000 });
  if (control === "escape") {
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
  } else {
    await page.click(CLOSE_MENU_SELECTOR);
  }
  await page.waitForSelector(OPEN_MENU_SELECTOR, { timeout: 5000 });
  recordCloseSnapshot(record, prefix, await page.evaluate(readCloseSnapshot));
}

async function closeByNavigation(page, record) {
  await page.click(OPEN_MENU_SELECTOR);
  await page.waitForSelector(CLOSE_MENU_SELECTOR, { timeout: 8000 });
  await page.evaluate(() => {
    const demo = [...document.querySelectorAll("#mobile-navigation-menu a")].find(
      (element) => element.textContent?.trim() === "Solicitar Demonstração",
    );
    if (demo instanceof HTMLElement) {
      demo.focus();
      demo.click();
    }
  });
  await page.waitForFunction(() => location.pathname.includes("solicitar-demonstracao"), {
    timeout: 8000,
  });
  const afterNavigate = await page.evaluate(readNavigationOverflow);
  record("close-navigate:page-changed", afterNavigate.path.includes("solicitar-demonstracao"), afterNavigate);
  record("close-navigate:overflow-restored", afterNavigate.bodyOverscroll !== "none", afterNavigate);
}

async function closeByDesktopResize(page, record) {
  await openMenu(page);
  await page.keyboard.press("Tab");
  await page.setViewport({ width: 1280, height: 800 });
  await page.waitForFunction(() => document.body.style.overscrollBehavior !== "none", {
    timeout: 5000,
  });
  const afterDesktop = await page.evaluate(readDesktopFocus);
  record("close-desktop:overflow-restored", afterDesktop.bodyOverscroll !== "none", afterDesktop);
  record("close-desktop:not-hidden-hamburger", afterDesktop.focusOnHiddenHamburger === false, afterDesktop);
  record("close-desktop:panel-inert", afterDesktop.panelInert, afterDesktop);
}

export async function inspectClosePaths(page, record, consoleMessages) {
  const start = consoleMessages.length;
  await openMenu(page);
  await page.click(CLOSE_MENU_SELECTOR);
  await page.waitForSelector(OPEN_MENU_SELECTOR, { timeout: 5000 });
  recordCloseSnapshot(record, "close-x", await page.evaluate(readCloseSnapshot));
  await closeByControl(page, record, "escape", "close-escape");
  await closeByNavigation(page, record);
  await closeByDesktopResize(page, record);
  const ariaWarnings = consoleMessages.slice(start).filter((text) => text.includes("aria-hidden"));
  record("console:no-aria-hidden-warning", ariaWarnings.length === 0, ariaWarnings);
}

export async function inspectHmr(page, record, consoleMessages) {
  const start = consoleMessages.length;
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const later = consoleMessages.slice(start);
  const websocketClosed = later.filter((text) =>
    text.includes("WebSocket is closed before the connection is established"),
  );
  const hmrConnected = later.filter((text) => text.includes("[HMR] connected"));
  record("hmr:websocket-closed-after-load", websocketClosed.length === 0, {
    websocketClosed,
    hmrConnected: hmrConnected.length,
    messages: later.slice(0, 20),
  });
}
