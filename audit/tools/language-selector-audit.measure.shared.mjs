/**
 * Leitura auxiliar e ações do seletor de idioma (espera, clique, cor, clip).
 */
import {
  AUDIT_UI_SETTLE_MS,
  gotoAuditPage,
  round,
  saveClipScreenshot,
  setAuditViewport,
  wait,
} from "./audit.shared.mjs";
import {
  LANGUAGE_SELECTOR,
  MOBILE_LIST,
  MOBILE_TRIGGER,
} from "./language-selector-audit.selectors.shared.mjs";

export function box(rect) {
  return {
    width: round(rect.width),
    height: round(rect.height),
    x: round(rect.x),
    y: round(rect.y),
  };
}

export function parseRgb(value) {
  const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(
    value ?? "",
  );
  if (!match) {
    return null;
  }
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

export function isRgb(value, r, g, b) {
  const parsed = parseRgb(value);
  return Boolean(parsed?.r === r && parsed?.g === g && parsed?.b === b);
}

export function isTransparent(value) {
  if (!value || value === "transparent") {
    return true;
  }
  const parsed = parseRgb(value);
  return parsed?.a === 0;
}

export function isRotate180(style) {
  const rotate = style?.rotate ?? "";
  const transform = style?.transform ?? "";
  if (String(rotate).includes("180")) {
    return true;
  }
  if (!transform || transform === "none") {
    return false;
  }
  return /matrix\(-1[,\s]/.test(transform) || transform.includes("rotate(180");
}

export async function waitForSelectorGone(page, selector) {
  await page.waitForFunction(
    (sel) => !document.querySelector(sel),
    { timeout: 5000 },
    selector,
  );
}

export async function waitForMenuExpanded(page, expanded) {
  await page.waitForFunction(
    (toggleSelector, shouldExpand) =>
      document.querySelector(toggleSelector)?.getAttribute("aria-expanded") ===
      String(shouldExpand),
    { timeout: 5000 },
    LANGUAGE_SELECTOR.menuToggle,
    expanded,
  );
}

export async function mouseClickCenter(page, selector) {
  const point = await page.$eval(selector, (el) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  await page.mouse.click(point.x, point.y);
}

export async function clickBelowHeader(page) {
  const point = await page.evaluate((headerSelector) => {
    const header = document.querySelector(headerSelector);
    const rect = header?.getBoundingClientRect();
    return {
      x: (rect?.left ?? 0) + 24,
      y: (rect?.bottom ?? 0) + 48,
    };
  }, LANGUAGE_SELECTOR.header);
  await page.mouse.click(point.x, point.y);
}

export async function openLanguageList(page, triggerSelector, listSelector) {
  await page.click(triggerSelector);
  await page.waitForSelector(listSelector, { timeout: 5000 });
}

export async function clickMenuToggle(page) {
  await page.waitForSelector(LANGUAGE_SELECTOR.menuToggle, {
    visible: true,
    timeout: 5000,
  });
  await page.click(LANGUAGE_SELECTOR.menuToggle);
}

export async function clickMobileSelector(page) {
  await page.waitForSelector(MOBILE_TRIGGER, { visible: true, timeout: 5000 });
  await page.click(MOBILE_TRIGGER);
}

export async function gotoHomeReady(page, readySelector) {
  await gotoAuditPage(page);
  await page.waitForSelector(readySelector, { timeout: 10000 });
}

export async function prepareViewport(page, viewport, readySelector) {
  await setAuditViewport(page, viewport);
  await gotoHomeReady(page, readySelector);
}

export async function headerClip(page, extraBottom = 16) {
  return page.evaluate(
    (extra, sel) => {
      const header = document.querySelector(sel.header);
      const list = document.querySelector(sel.list);
      const panel = document.querySelector(sel.menuPanel);
      const headerBottom = header?.getBoundingClientRect().bottom ?? 80;
      const listBottom = list?.getBoundingClientRect().bottom ?? 0;
      const panelBottom = panel?.getBoundingClientRect().bottom ?? 0;
      const menuOpen =
        document.querySelector(sel.menuToggle)?.getAttribute("aria-expanded") ===
        "true";
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
    },
    extraBottom,
    LANGUAGE_SELECTOR,
  );
}

export async function screenshotHeaderIf(page, shouldCapture, filename) {
  if (!shouldCapture) {
    return null;
  }
  const clip = await headerClip(page, filename.includes("closed") ? 8 : 16);
  await saveClipScreenshot(page, filename, clip);
  return clip;
}

export async function waitForMobileListOpen(page) {
  await page.waitForSelector(MOBILE_LIST, { timeout: 5000 });
  await wait(AUDIT_UI_SETTLE_MS);
}

export async function isListAbsent(page, listSelector) {
  return page.evaluate(
    (selector) => document.querySelector(selector) === null,
    listSelector,
  );
}
