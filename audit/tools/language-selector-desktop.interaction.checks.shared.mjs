/**
 * Checagens de interação do seletor de idioma desktop.
 */
import { saveClipScreenshot } from "./audit.shared.mjs";
import {
  DESKTOP_COLUMN,
  DESKTOP_LIST,
  DESKTOP_OPTION_EN,
  DESKTOP_TRIGGER,
} from "./language-selector-audit.selectors.shared.mjs";
import {
  clickBelowHeader,
  gotoHomeReady,
  isListAbsent,
  mouseClickCenter,
  prepareViewport,
  waitForSelectorGone,
} from "./language-selector-audit.measure.shared.mjs";
import {
  measureDesktopLanguageSelector,
  readDesktopAfterClose,
  triggerFocusState,
} from "./language-selector-desktop.measure.shared.mjs";
import {
  checkClosedButton,
  checkOpenList,
  openDesktopList,
} from "./language-selector-desktop.checks.shared.mjs";

async function recordOpenScreenshot(page, viewport, prefix, record) {
  if (viewport.name !== "1920") {
    return;
  }
  const clip = await page.evaluate((columnSelector) => {
    const column = document.querySelector(columnSelector);
    const rect = column?.getBoundingClientRect();
    if (!rect) {
      return null;
    }
    return {
      x: Math.max(0, Math.floor(rect.x - 80)),
      y: 0,
      width: Math.ceil(rect.width + 160),
      height: Math.ceil(rect.bottom + 24),
    };
  }, DESKTOP_COLUMN);
  record(`${prefix}-screenshot-clip`, Boolean(clip), clip);
  if (clip) {
    await saveClipScreenshot(page, "language-selector-open-1920.png", clip);
  }
}

export async function checkEscapeCloses(page, prefix, record) {
  await page.keyboard.press("Escape");
  await waitForSelectorGone(page, DESKTOP_LIST);
  const afterEscape = await readDesktopAfterClose(page);
  record(
    `${prefix}-escape-closes-and-focuses`,
    afterEscape.listClosed &&
      afterEscape.expanded === "false" &&
      afterEscape.triggerFocused === true,
    afterEscape,
  );
}

export async function checkClickOutsideCloses(page, prefix, record) {
  await openDesktopList(page);
  await clickBelowHeader(page);
  await waitForSelectorGone(page, DESKTOP_LIST);
  record(`${prefix}-click-outside-closes`, await isListAbsent(page, DESKTOP_LIST));
}

export async function checkTabOutCloses(page, prefix, record) {
  await openDesktopList(page);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await waitForSelectorGone(page, DESKTOP_LIST);
  record(`${prefix}-tab-out-closes`, await isListAbsent(page, DESKTOP_LIST));
}

export async function checkSelectEn(page, prefix, record) {
  await openDesktopList(page);
  await page.click(DESKTOP_OPTION_EN);
  await waitForSelectorGone(page, DESKTOP_LIST);
  const afterEn = await readDesktopAfterClose(page);
  record(
    `${prefix}-select-en`,
    afterEn.label.includes("EN") &&
      afterEn.aria === "Idioma: English" &&
      afterEn.expanded === "false" &&
      afterEn.flag === "en" &&
      afterEn.triggerFocusedAttr === true,
    afterEn,
  );
  await openDesktopList(page);
  const reopened = await measureDesktopLanguageSelector(page);
  record(
    `${prefix}-reopen-after-en-shows-pt-es`,
    JSON.stringify(reopened.optionCodes) === JSON.stringify(["pt-BR", "es"]),
    reopened.optionCodes,
  );
  await page.keyboard.press("Escape");
}

async function recordFocusMouseCycle(page, prefix, record) {
  const focusA = await triggerFocusState(page);
  record(`${prefix}-focus-a-load`, focusA.focusVisible === false, focusA);
  await mouseClickCenter(page, DESKTOP_TRIGGER);
  await page.waitForSelector(DESKTOP_LIST, { timeout: 5000 });
  const focusB = await triggerFocusState(page);
  record(`${prefix}-focus-b-mouse-open`, focusB.focusVisible === false, focusB);
  await mouseClickCenter(page, DESKTOP_TRIGGER);
  await waitForSelectorGone(page, DESKTOP_LIST);
  const focusC = await triggerFocusState(page);
  record(`${prefix}-focus-c-mouse-close`, focusC.focusVisible === false, focusC);
}

async function recordFocusSelectAndOutside(page, prefix, record) {
  await mouseClickCenter(page, DESKTOP_TRIGGER);
  await page.waitForSelector(DESKTOP_LIST, { timeout: 5000 });
  await mouseClickCenter(page, DESKTOP_OPTION_EN);
  await waitForSelectorGone(page, DESKTOP_LIST);
  const focusD = await triggerFocusState(page);
  record(
    `${prefix}-focus-d-mouse-select-en`,
    focusD.focused === true && focusD.focusVisible === false,
    focusD,
  );
  await mouseClickCenter(page, DESKTOP_TRIGGER);
  await page.waitForSelector(DESKTOP_LIST, { timeout: 5000 });
  await clickBelowHeader(page);
  await waitForSelectorGone(page, DESKTOP_LIST);
  const focusE = await triggerFocusState(page);
  record(`${prefix}-focus-e-click-outside`, focusE.focusVisible === false, focusE);
}

export async function checkFocusStates(page, prefix, record) {
  await gotoHomeReady(page, DESKTOP_TRIGGER);
  await recordFocusMouseCycle(page, prefix, record);
  await recordFocusSelectAndOutside(page, prefix, record);
  await mouseClickCenter(page, DESKTOP_TRIGGER);
  await page.waitForSelector(DESKTOP_LIST, { timeout: 5000 });
  await page.keyboard.press("Escape");
  await waitForSelectorGone(page, DESKTOP_LIST);
  const focusF = await triggerFocusState(page);
  record(
    `${prefix}-focus-f-escape-after-mouse`,
    focusF.focused === true && focusF.focusVisible === true,
    focusF,
  );
}

export async function checkBelowXlCloses(page, viewport, prefix, record) {
  await openDesktopList(page);
  await page.setViewport({
    width: 1024,
    height: viewport.height,
    deviceScaleFactor: 1,
  });
  await waitForSelectorGone(page, DESKTOP_LIST);
  record(`${prefix}-below-xl-closes`, await isListAbsent(page, DESKTOP_LIST));
}

export async function runDesktopViewport(page, viewport, record) {
  await prepareViewport(page, viewport, DESKTOP_TRIGGER);
  const prefix = viewport.name;
  const closed = await checkClosedButton(page, prefix, record);
  await checkOpenList(page, prefix, closed, record);
  await recordOpenScreenshot(page, viewport, prefix, record);
  await checkEscapeCloses(page, prefix, record);
  await checkClickOutsideCloses(page, prefix, record);
  await checkTabOutCloses(page, prefix, record);
  await checkSelectEn(page, prefix, record);
  await checkFocusStates(page, prefix, record);
  await checkBelowXlCloses(page, viewport, prefix, record);
}
