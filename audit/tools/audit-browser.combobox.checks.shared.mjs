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

async function recordOpenAndMove(page, record) {
  await clickClearOfCookieBanner(page, PRODUCT_INTEREST);
  await page.waitForSelector(PRODUCT_LISTBOX);
  const isOpen = (await expanded(page)) === "true";
  record("open-click", isOpen);
  const optionCount = await page.$$eval(PRODUCT_OPTION, (elements) => elements.length);
  record("options-count-with-audit-injection", optionCount === AUDIT_OPTIONS.length + 1);
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  const activeDescendantUpdated = await page.$eval(PRODUCT_INTEREST, (element) =>
    Boolean(element.getAttribute("aria-activedescendant")?.includes("-option-2")),
  );
  record("active-descendant-updated", activeDescendantUpdated);
  await page.keyboard.press("Enter");
}

async function recordSelectionAndClose(page, record) {
  const selectEnterCloses = (await expanded(page)) === "false";
  record("select-enter-closes", selectEnterCloses);
  const hiddenInputUpdated = await page.$eval(
    PRODUCT_INTEREST_INPUT,
    (element) => element.value !== "",
  );
  record("hidden-input-value-updated", hiddenInputUpdated);
  await clickClearOfCookieBanner(page, PRODUCT_INTEREST);
  await page.keyboard.press("Escape");
  const escapeCloses = (await expanded(page)) === "false";
  record("escape-closes", escapeCloses);
  await page.focus(PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  const openKeyboard = (await expanded(page)) === "true";
  record("open-keyboard", openKeyboard);
  await page.mouse.click(10, 10);
  const clickOutsideCloses = (await expanded(page)) === "false";
  record("click-outside-closes", clickOutsideCloses);
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

async function recordPanelGeometry(page, record) {
  await page.focus(PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  const panelBox = await readPanelBox(page);
  const rounded = panelBox.borderRadius === "20px";
  record("panel-rounded-20px", rounded, panelBox.borderRadius);
  const withinViewport =
    panelBox.top >= 0 && panelBox.bottom <= 768 && panelBox.left >= 0 && panelBox.width > 0;
  record("panel-within-viewport", withinViewport, panelBox);
  await page.evaluate((selector) => {
    document.querySelector(selector)?.scrollIntoView({ block: "center" });
  }, PRODUCT_INTEREST);
  await page.keyboard.press("ArrowDown");
  const scrolledPanel = await page.$eval(PRODUCT_LISTBOX, (element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom };
  });
  const panelRepositions = scrolledPanel.bottom <= 768 && scrolledPanel.top >= 0;
  record("panel-repositions-on-scroll-context", panelRepositions, scrolledPanel);
}

export async function auditCombobox(page, record) {
  const trigger = await page.waitForSelector(PRODUCT_INTEREST);
  if (!trigger) {
    throw new Error("Combobox trigger #request-demo-product-interest not found");
  }
  await recordOpenAndMove(page, record);
  await recordSelectionAndClose(page, record);
  await recordPanelGeometry(page, record);
}
