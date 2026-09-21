/**
 * Mesma aba, FormSubmit real só no OPTIONS; POST abortado (sem e-mail).
 * Compara 393 vs 1920: clique no botão, overlay e se o envio dispara.
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  withAuditBrowser,
} from "./mobile-nav-audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();
const PAGE_PATH = "/solicitar-demonstracao";

function inspectHitTarget() {
  const button = document.querySelector(
    "[data-request-demo-form-card] button[type='submit']",
  );
  if (!(button instanceof HTMLButtonElement)) {
    return { found: false };
  }

  button.scrollIntoView({ block: "center" });
  const rect = button.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const topNode = document.elementFromPoint(x, y);
  const top = topNode instanceof HTMLElement ? topNode : null;

  return {
    found: true,
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    topTag: top?.tagName ?? null,
    topType: top instanceof HTMLButtonElement ? top.type : null,
    hitSubmit: top === button || Boolean(top?.closest("button[type='submit']")),
    cookieBannerUp: Boolean(document.querySelector("[data-cookie-banner]")),
    honeyLength: (() => {
      const honey = document.querySelector("#request-demo-honey");
      return honey instanceof HTMLInputElement ? honey.value.length : -1;
    })(),
    demoFormCount: document.querySelectorAll(
      "[data-request-demo-form-card] form",
    ).length,
  };
}

async function fillMinimalForm(page) {
  await page.click('label[for="request-demo-contactType-demonstracao"]');
  await page.click("#request-demo-name", { clickCount: 3 });
  await page.type("#request-demo-name", "Teste Largura Iungo");
  await page.click("#request-demo-email", { clickCount: 3 });
  await page.type("#request-demo-email", "teste.largura@example.com");
  await page.click("#request-demo-company", { clickCount: 3 });
  await page.type("#request-demo-company", "Empresa Largura");
}

async function readOutcome(page) {
  return page.evaluate(() => {
    const success = document.querySelector(
      "[data-request-demo-form-card] output",
    );
    const error = document.querySelector(
      '[data-request-demo-form-card] [role="alert"]',
    );
    const node = success instanceof HTMLElement ? success : error;
    const text = node instanceof HTMLElement ? node.textContent?.trim() ?? "" : "";
    let kind = "none";
    if (success) {
      kind = "success";
    } else if (error) {
      kind = "error";
    }

    return {
      kind,
      isTimeout: /demorou mais do que o esperado/i.test(text),
      isSuccess: /sucesso/i.test(text),
    };
  });
}

try {
  await withAuditBrowser(async (page) => {
    const events = [];
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (!request.url().includes("formsubmit.co")) {
        request.continue();
        return;
      }

      events.push({
        method: request.method(),
        at: Date.now(),
      });

      if (request.method() === "POST") {
        request.abort("timedout").catch(() => {});
        return;
      }

      request.continue();
    });

    for (const viewport of [
      { name: "393", width: 393, height: 852 },
      { name: "1920", width: 1920, height: 1080 },
    ]) {
      events.length = 0;
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

      const hit = await page.evaluate(inspectHitTarget);
      record(`${viewport.name}:hit-submit`, hit.hitSubmit === true, hit);
      record(`${viewport.name}:single-form`, hit.demoFormCount === 1, hit);
      record(`${viewport.name}:honey-empty`, hit.honeyLength === 0, hit);

      await fillMinimalForm(page);
      const startedAt = Date.now();
      await page.click("[data-request-demo-form-card] button[type='submit']");
      await page.waitForFunction(
        () =>
          Boolean(
            document.querySelector(
              '[data-request-demo-form-card] [role="alert"]',
            ) ||
              document.querySelector("[data-request-demo-form-card] output"),
          ),
        { timeout: 20000 },
      );

      const outcome = await readOutcome(page);
      const methods = events.map((item) => item.method);
      record(`${viewport.name}:submit-reached-formsubmit`, methods.length > 0, {
        methods,
        elapsedMs: Date.now() - startedAt,
        outcome,
      });
    }

    events.length = 0;
    await page.setViewport({ width: 393, height: 852 });
    await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector("[data-request-demo-form-card] form", {
      timeout: 15000,
    });
    await fillMinimalForm(page);
    await page.setViewport({ width: 1920, height: 1080 });
    const hitAfterResize = await page.evaluate(inspectHitTarget);
    record("resize-393-to-1920:hit-submit", hitAfterResize.hitSubmit === true, {
      hitAfterResize,
    });
    await page.click("[data-request-demo-form-card] button[type='submit']");
    await page.waitForFunction(
      () =>
        Boolean(
          document.querySelector(
            '[data-request-demo-form-card] [role="alert"]',
          ) || document.querySelector("[data-request-demo-form-card] output"),
        ),
      { timeout: 20000 },
    );
    record("resize-393-to-1920:submit-reached-formsubmit", events.length > 0, {
      methods: events.map((item) => item.method),
      outcome: await readOutcome(page),
    });
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
