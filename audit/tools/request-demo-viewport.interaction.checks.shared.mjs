/**
 * Preenche o formulário e intercepta o FormSubmit sem enviar e-mail.
 */
import { AUDIT_BASE_URL } from "./audit.shared.mjs";
import {
  payloadSummary,
  recordCapturedRequest,
  recordDomChecks,
  recordMockedSuccess,
} from "./request-demo-viewport.checks.shared.mjs";
import {
  inspectFormDom,
  readFeedback,
  readHoneyLength,
} from "./request-demo-viewport.measure.shared.mjs";
import {
  DEMO_FORM_SELECTORS,
  REQUIRED_FIELD_IDS,
} from "./request-demo-viewport.selectors.shared.mjs";

const PAGE_PATH = "/solicitar-demonstracao";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

export function installFormSubmitMock(page, captured) {
  page.on("request", (request) => {
    const url = request.url();
    if (!url.includes("formsubmit.co/ajax/")) {
      request.continue();
      return;
    }
    captured.push({
      method: request.method(),
      urlHost: "formsubmit.co/ajax",
      payload: payloadSummary(request.postData() ?? ""),
    });
    if (request.method() === "OPTIONS") {
      request.respond({ status: 204, headers: CORS_HEADERS });
      return;
    }
    request.respond({
      status: 200,
      contentType: "application/json",
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true }),
    });
  });
}

async function openPage(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForSelector(DEMO_FORM_SELECTORS.form, { timeout: 15000 });
}

async function fillMinimalForm(page) {
  await page.click(DEMO_FORM_SELECTORS.contactType);
  await page.click(DEMO_FORM_SELECTORS.name, { clickCount: 3 });
  await page.type(DEMO_FORM_SELECTORS.name, "Teste Auditoria Iungo");
  await page.click(DEMO_FORM_SELECTORS.email, { clickCount: 3 });
  await page.type(DEMO_FORM_SELECTORS.email, "teste.auditoria@example.com");
  await page.click(DEMO_FORM_SELECTORS.company, { clickCount: 3 });
  await page.type(DEMO_FORM_SELECTORS.company, "Empresa Auditoria");
}

async function waitForMockedOutcome(page) {
  await page.waitForFunction(
    (selectors) => {
      const success = document.querySelector(selectors.success);
      const error = document.querySelector(selectors.error);
      return Boolean(success || error);
    },
    { timeout: 8000 },
    DEMO_FORM_SELECTORS,
  );
}

async function submitAndRead(page, captured, consoleErrors, record, prefix) {
  await page.click(DEMO_FORM_SELECTORS.submit);
  await waitForMockedOutcome(page);
  recordCapturedRequest(record, prefix, captured);
  const feedback = await page.evaluate(readFeedback, DEMO_FORM_SELECTORS);
  recordMockedSuccess(record, prefix, feedback, consoleErrors);
}

export async function submitViewport(page, captured, consoleErrors, record, viewport) {
  captured.length = 0;
  consoleErrors.length = 0;
  await openPage(page, viewport);
  const dom = await page.evaluate(inspectFormDom, DEMO_FORM_SELECTORS, REQUIRED_FIELD_IDS);
  recordDomChecks(record, viewport.name, dom);
  await fillMinimalForm(page);
  await submitAndRead(page, captured, consoleErrors, record, viewport.name);
}

export async function submitAfterResize(page, captured, consoleErrors, record, scenario) {
  captured.length = 0;
  consoleErrors.length = 0;
  await openPage(page, scenario.start);
  await fillMinimalForm(page);
  await page.setViewport(scenario.end);
  if (scenario.checkHoney) {
    const honeyLength = await page.evaluate(readHoneyLength, DEMO_FORM_SELECTORS.honey);
    record(`${scenario.prefix}:honey-still-empty`, honeyLength === 0, { honeyLength });
  }
  await submitAndRead(page, captured, consoleErrors, record, scenario.prefix);
}
