/**
 * Testes de teclado do combobox de interesse no produto.
 */
import { clickClearOfCookieBanner } from "./audit.shared.mjs";
import {
  AUDIT_OPTIONS,
  PRODUCT_INTEREST,
  PRODUCT_INTEREST_INPUT,
  PRODUCT_LISTBOX,
  PRODUCT_OPTION,
} from "./audit-browser.selectors.shared.mjs";

async function expanded(page) {
  return page.$eval(PRODUCT_INTEREST, (element) => element.getAttribute("aria-expanded"));
}

async function recordOpenAndMove(page, results) {
  await clickClearOfCookieBanner(page, PRODUCT_INTEREST);
  await page.waitForSelector(PRODUCT_LISTBOX);
  results.push({ test: "open-click", pass: (await expanded(page)) === "true" });
  results.push({
    test: "options-count-with-audit-injection",
    pass: (await page.$$eval(PRODUCT_OPTION, (elements) => elements.length)) === AUDIT_OPTIONS.length + 1,
  });
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  results.push({
    test: "active-descendant-updated",
    pass: await page.$eval(PRODUCT_INTEREST, (element) =>
      Boolean(element.getAttribute("aria-activedescendant")?.includes("-option-2")),
    ),
  });
  await page.keyboard.press("Enter");
}

async function recordSelectionAndClose(page, results) {
  results.push({ test: "select-enter-closes", pass: (await expanded(page)) === "false" });
  results.push({
    test: "hidden-input-value-updated",
    pass: await page.$eval(PRODUCT_INTEREST_INPUT, (element) => element.value !== ""),
  });
  await clickClearOfCookieBanner(page, PRODUCT_INTEREST);
  await page.keyboard.press("Escape");
  results.push({ test: "escape-closes", pass: (await expanded(page)) === "false" });
  await page.focus(PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  results.push({ test: "open-keyboard", pass: (await expanded(page)) === "true" });
  await page.mouse.click(10, 10);
  results.push({ test: "click-outside-closes", pass: (await expanded(page)) === "false" });
}

async function readPanelBox(page) {
  return page.$eval(PRODUCT_LISTBOX, (element) => {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      borderRadius: getComputedStyle(element).borderRadius,
    };
  });
}

async function recordPanelGeometry(page, results) {
  await page.focus(PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  const panelBox = await readPanelBox(page);
  results.push({
    test: "panel-rounded-20px",
    pass: panelBox.borderRadius === "20px",
    detail: panelBox.borderRadius,
  });
  results.push({
    test: "panel-within-viewport",
    pass: panelBox.top >= 0 && panelBox.bottom <= 768 && panelBox.left >= 0 && panelBox.width > 0,
    detail: panelBox,
  });
  await page.evaluate((selector) => {
    document.querySelector(selector)?.scrollIntoView({ block: "center" });
  }, PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  const scrolledPanel = await page.$eval(PRODUCT_LISTBOX, (element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom };
  });
  results.push({
    test: "panel-repositions-on-scroll-context",
    pass: scrolledPanel.bottom <= 768 && scrolledPanel.top >= 0,
    detail: scrolledPanel,
  });
}

export async function auditCombobox(page, results) {
  const trigger = await page.waitForSelector(PRODUCT_INTEREST);
  if (!trigger) {
    throw new Error("Combobox trigger #request-demo-product-interest not found");
  }
  await recordOpenAndMove(page, results);
  await recordSelectionAndClose(page, results);
  await recordPanelGeometry(page, results);
}
