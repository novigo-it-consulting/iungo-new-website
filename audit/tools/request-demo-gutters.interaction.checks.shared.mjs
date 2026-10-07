/**
 * Combobox aberto e erros de validação em 396px.
 */
import { REQUEST_DEMO_SELECTORS } from "./request-demo-gutters.selectors.shared.mjs";
import {
  readComboboxPanel,
  readValidationErrors,
} from "./request-demo-gutters.measure.shared.mjs";

async function recordOpenCombobox(page, record, label) {
  const comboboxOpened = await page
    .click(REQUEST_DEMO_SELECTORS.productInterest)
    .then(() => true)
    .catch(() => false);
  if (!comboboxOpened) {
    record(`${label}:combobox-open`, false, "trigger-missing");
    return false;
  }

  await page.waitForSelector(REQUEST_DEMO_SELECTORS.productListbox, { timeout: 5000 });
  const panelMetrics = await page.evaluate(
    readComboboxPanel,
    REQUEST_DEMO_SELECTORS.productListbox,
  );
  record(
    `${label}:combobox-within-viewport`,
    Boolean(
      panelMetrics && panelMetrics.left >= 0 && panelMetrics.right <= panelMetrics.viewportWidth + 1,
    ),
    panelMetrics ?? "missing-panel",
  );
  await page.keyboard.press("Escape");
  return true;
}

async function recordValidation(page, record, label) {
  await page.click(REQUEST_DEMO_SELECTORS.submit);
  await page.waitForSelector(REQUEST_DEMO_SELECTORS.nameError, { timeout: 5000 });
  const errorMetrics = await page.evaluate(readValidationErrors, REQUEST_DEMO_SELECTORS.form);
  record(
    `${label}:validation-inside-form`,
    Boolean(
      errorMetrics && errorMetrics.errorCount > 0 && errorMetrics.maxRight <= errorMetrics.formRight + 1,
    ),
    errorMetrics ?? "missing-errors",
  );
}

export async function inspectFormStates(page, record, label) {
  const opened = await recordOpenCombobox(page, record, label);
  if (!opened) {
    return;
  }
  await recordValidation(page, record, label);
}
