/**
 * Infra genérica dos scripts de auditoria (browser, viewport, resultados).
 * Os scripts antigos abrem rotas sem prefixo de idioma: isso é o pt-BR.
 */
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

export const AUDIT_BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";

/** O banner de cookies cobre o combobox em 1366×768. Sobe o campo antes do clique. */
export async function clickClearOfCookieBanner(page, selector) {
  await page.$eval(selector, (element) => {
    const banner = document.querySelector("[data-cookie-banner]");
    const bannerTop = banner?.getBoundingClientRect().top ?? window.innerHeight;
    const rect = element.getBoundingClientRect();
    if (rect.bottom > bannerTop - 8) {
      window.scrollBy(0, rect.bottom - (bannerTop - 8));
    }
  });
  await page.click(selector);
}
export const AUDIT_UI_SETTLE_MS = 150;
export const AUDIT_TOOLS_DIR = import.meta.dirname;

export function createResultRecorder() {
  const results = [];

  function record(name, pass, detail) {
    results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
  }

  function printAndExit() {
    const failed = results.filter((item) => !item.pass);
    console.log(JSON.stringify({ failed: failed.length, results }, null, 2));
    process.exit(failed.length === 0 ? 0 : 1);
  }

  return { record, results, printAndExit };
}

/**
 * Roda itens um a um na mesma página do navegador.
 * Precisa ser sequencial: os testes compartilham page/estado.
 */
export async function runSequentially(items, runItem, index = 0) {
  if (index >= items.length) {
    return;
  }

  await runItem(items[index]);
  await runSequentially(items, runItem, index + 1);
}

/**
 * Repete um passo até a condição, na mesma página do navegador.
 * Precisa ser sequencial: cada tentativa depende da anterior.
 */
export async function repeatUntil(step, isDone, maxAttempts, attempt = 0) {
  if (attempt >= maxAttempts) {
    return undefined;
  }

  const last = await step(attempt);
  if (isDone(last, attempt) || attempt + 1 >= maxAttempts) {
    return last;
  }

  return repeatUntil(step, isDone, maxAttempts, attempt + 1);
}

export async function wait(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function gotoAuditPage(page, pathName = "/") {
  const url = pathName.startsWith("http")
    ? pathName
    : `${AUDIT_BASE_URL}${pathName}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page
    .waitForNetworkIdle({ idleTime: 500, timeout: 10000 })
    .catch(() => {});
}

export async function setAuditViewport(page, viewport) {
  await page.setViewport({
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
    ...(viewport.isMobile === undefined
      ? {}
      : { isMobile: viewport.isMobile, hasTouch: viewport.isMobile }),
  });
}

export function auditScreenshotPath(filename) {
  return path.join(AUDIT_TOOLS_DIR, filename);
}

export async function saveClipScreenshot(page, filename, clip) {
  await page.screenshot({
    path: auditScreenshotPath(filename),
    clip,
    captureBeyondViewport: true,
  });
}

export function round(value) {
  return Math.round(value * 100) / 100;
}

export function near(actual, expected, tolerance = 0.6) {
  return Math.abs(actual - expected) <= tolerance;
}

export async function withAuditBrowser(run) {
  let chrome;
  let browser;

  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
    });
    browser = await puppeteer.connect({
      browserURL: `http://127.0.0.1:${chrome.port}`,
      defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      try {
        localStorage.setItem(
          "iungo.cookie-consent",
          JSON.stringify({
            formatVersion: 1,
            policyVersion: 1,
            decidedAt: new Date().toISOString(),
            categories: { necessary: true },
            choice: "reject-non-essential",
          }),
        );
      } catch {
        // about:blank e documentos isolados podem bloquear localStorage.
      }
    });
    await run(page);
  } finally {
    if (browser) {
      await browser.disconnect().catch(() => {});
    }
    try {
      if (chrome) {
        await chrome.kill();
      }
    } catch {
      // ignore
    }
  }
}
