/**
 * Compara o formulário Solicitar Demonstração em várias larguras.
 * Intercepta o FormSubmit e devolve JSON de sucesso — sem e-mail real.
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const PAGE_PATH = "/solicitar-demonstracao";
const VIEWPORTS = [
  { name: "393", width: 393, height: 852 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
};

function inspectFormDom() {
  const forms = [...document.querySelectorAll("form")];
  const demoForms = forms.filter((form) =>
    form.querySelector('input[name="_honey"]'),
  );
  const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const honey = document.querySelector("#request-demo-honey");
  const submit = document.querySelector(
    "[data-request-demo-form-card] button[type='submit']",
  );
  const honeyParentForm =
    honey instanceof HTMLInputElement ? honey.form : null;
  const submitForm = submit instanceof HTMLButtonElement ? submit.form : null;

  const textInputs = honeyParentForm
    ? [...honeyParentForm.querySelectorAll("input")]
        .filter((input) => input.type !== "hidden" && input.type !== "radio")
        .map((input) => input.name)
    : [];

  const requiredFields = [
    "request-demo-name",
    "request-demo-email",
    "request-demo-company",
    "request-demo-contactType-demonstracao",
  ].map((id) => {
    const node = document.getElementById(id);
    const hidden =
      node instanceof HTMLElement
        ? node.getAttribute("hidden") !== null ||
          node.disabled === true ||
          getComputedStyle(node).display === "none"
        : true;
    return { id, present: Boolean(node), hidden };
  });

  return {
    formCount: forms.length,
    demoFormCount: demoForms.length,
    duplicateIds: [...new Set(duplicateIds)],
    honeyLength: honey instanceof HTMLInputElement ? honey.value.length : -1,
    honeyAutocomplete:
      honey instanceof HTMLInputElement ? honey.autocomplete : null,
    honeyIsFirstTextInput: textInputs[0] === "_honey",
    submitInsideDemoForm: submitForm === honeyParentForm && submitForm !== null,
    textInputNames: textInputs,
    requiredFields,
  };
}

function payloadSummary(bodyText) {
  try {
    const body = JSON.parse(bodyText);
    return summarizePayload(body);
  } catch {
    const params = new URLSearchParams(bodyText ?? "");
    const body = Object.fromEntries(params.entries());
    if (Object.keys(body).length === 0) {
      return { parseError: true };
    }
    return summarizePayload(body);
  }
}

function summarizePayload(body) {
  return {
    keys: Object.keys(body).sort((left, right) => left.localeCompare(right)),
    honeyLength: typeof body._honey === "string" ? body._honey.length : -1,
    hasNome: typeof body.NOME === "string" && body.NOME.length > 0,
    hasEmail: typeof body["EMAIL CORPORATIVO"] === "string",
    hasEmpresa: typeof body.EMPRESA === "string" && body.EMPRESA.length > 0,
    hasTemplate: body._template === "table",
  };
}

async function openPage(page, viewport) {
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
  });
  await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForSelector("[data-request-demo-form-card] form", {
    timeout: 15000,
  });
}

async function fillMinimalForm(page) {
  await page.click('label[for="request-demo-contactType-demonstracao"]');
  await page.click("#request-demo-name", { clickCount: 3 });
  await page.type("#request-demo-name", "Teste Auditoria Iungo");
  await page.click("#request-demo-email", { clickCount: 3 });
  await page.type("#request-demo-email", "teste.auditoria@example.com");
  await page.click("#request-demo-company", { clickCount: 3 });
  await page.type("#request-demo-company", "Empresa Auditoria");
}

async function waitForMockedOutcome(page) {
  await page.waitForFunction(
    () => {
      const success = document.querySelector(
        "[data-request-demo-form-card] output",
      );
      const error = document.querySelector(
        '[data-request-demo-form-card] [role="alert"]',
      );
      return Boolean(success || error);
    },
    { timeout: 8000 },
  );
}

function recordDomChecks(prefix, dom) {
  record(`${prefix}:single-demo-form`, dom.demoFormCount === 1, {
    demoFormCount: dom.demoFormCount,
    formCount: dom.formCount,
  });
  record(`${prefix}:no-duplicate-ids`, dom.duplicateIds.length === 0, {
    duplicateIds: dom.duplicateIds,
  });
  record(`${prefix}:submit-bound-to-form`, dom.submitInsideDemoForm, {
    submitInsideDemoForm: dom.submitInsideDemoForm,
  });
  record(`${prefix}:honey-empty-before-submit`, dom.honeyLength === 0, {
    honeyLength: dom.honeyLength,
    honeyAutocomplete: dom.honeyAutocomplete,
    honeyIsFirstTextInput: dom.honeyIsFirstTextInput,
    textInputNames: dom.textInputNames,
  });
  record(`${prefix}:honey-not-first-text-input`, !dom.honeyIsFirstTextInput, {
    textInputNames: dom.textInputNames,
  });
  record(
    `${prefix}:required-fields-present`,
    dom.requiredFields.every((field) => field.present && !field.hidden),
    { requiredFields: dom.requiredFields },
  );
}

function recordCapturedRequest(prefix, captured) {
  const post = captured.find((item) => item.method === "POST");
  record(`${prefix}:request-fired-once`, captured.filter((item) => item.method === "POST").length === 1, {
    methods: captured.map((item) => item.method),
  });
  record(`${prefix}:no-preflight`, !captured.some((item) => item.method === "OPTIONS"), {
    methods: captured.map((item) => item.method),
  });
  record(
    `${prefix}:same-endpoint-post-json`,
    Boolean(
      post?.payload.hasNome &&
        post?.payload.hasEmail &&
        post?.payload.hasEmpresa &&
        post?.payload.hasTemplate &&
        post?.payload.honeyLength === 0,
    ),
    post ?? "missing-request",
  );
}

async function readFeedback(page) {
  return page.evaluate(() => {
    const success = document.querySelector(
      "[data-request-demo-form-card] output",
    );
    const error = document.querySelector(
      '[data-request-demo-form-card] [role="alert"]',
    );
    const node = success instanceof HTMLElement ? success : error;
    return node instanceof HTMLElement ? node.textContent?.trim() ?? "" : "";
  });
}

try {
  await withAuditBrowser(async (page) => {
    const captured = [];
    const consoleErrors = [];

    page.on("pageerror", (error) => {
      consoleErrors.push(String(error));
    });
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.setRequestInterception(true);
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
        request.respond({
          status: 204,
          headers: CORS_HEADERS,
        });
        return;
      }

      request.respond({
        status: 200,
        contentType: "application/json",
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: true }),
      });
    });

    async function submitViewport(viewport) {
      captured.length = 0;
      consoleErrors.length = 0;
      await openPage(page, viewport);

      const dom = await page.evaluate(inspectFormDom);
      recordDomChecks(viewport.name, dom);

      await fillMinimalForm(page);
      await page.click("[data-request-demo-form-card] button[type='submit']");
      await waitForMockedOutcome(page);

      recordCapturedRequest(viewport.name, captured);
      const feedback = await readFeedback(page);
      record(`${viewport.name}:mocked-success-ui`, /sucesso/i.test(feedback), {
        feedbackLength: feedback.length,
        consoleErrors,
      });
    }

    await runSequentially(VIEWPORTS, (viewport) => submitViewport(viewport));

    captured.length = 0;
    consoleErrors.length = 0;
    await openPage(page, { width: 393, height: 852 });
    await fillMinimalForm(page);
    await page.setViewport({ width: 1920, height: 1080 });
    const honeyAfterWiden = await page.evaluate(() => {
      const honey = document.querySelector("#request-demo-honey");
      return honey instanceof HTMLInputElement ? honey.value.length : -1;
    });
    record("resize-393-to-1920:honey-still-empty", honeyAfterWiden === 0, {
      honeyLength: honeyAfterWiden,
    });
    await page.click("[data-request-demo-form-card] button[type='submit']");
    await waitForMockedOutcome(page);
    recordCapturedRequest("resize-393-to-1920", captured);
    const widenFeedback = await readFeedback(page);
    record("resize-393-to-1920:mocked-success-ui", /sucesso/i.test(widenFeedback), {
      feedbackLength: widenFeedback.length,
      consoleErrors,
    });

    captured.length = 0;
    consoleErrors.length = 0;
    await openPage(page, { width: 1920, height: 1080 });
    await fillMinimalForm(page);
    await page.setViewport({ width: 393, height: 852 });
    await page.click("[data-request-demo-form-card] button[type='submit']");
    await waitForMockedOutcome(page);
    recordCapturedRequest("resize-1920-to-393", captured);
    const shrinkFeedback = await readFeedback(page);
    record("resize-1920-to-393:mocked-success-ui", /sucesso/i.test(shrinkFeedback), {
      feedbackLength: shrinkFeedback.length,
      consoleErrors,
    });
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
