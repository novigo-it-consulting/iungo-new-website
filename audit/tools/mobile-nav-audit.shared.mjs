/**
 * Infra comum dos scripts de auditoria (Hero, menu mobile, etc.).
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

export const AUDIT_BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";

const OPEN_MENU_SELECTOR = '[aria-label="Abrir menu"]';
const CLOSE_MENU_SELECTOR = '[aria-label="Fechar menu"]';

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

  return { record, printAndExit };
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

export async function openAuditMobileMenu(page) {
  const hamburgerReady = await page
    .waitForFunction(
      () => {
        const hamburger = document.querySelector('[aria-label="Abrir menu"]');
        return hamburger instanceof HTMLElement && hamburger.offsetParent !== null;
      },
      { timeout: 10000 },
    )
    .catch(() => null);

  if (!hamburgerReady) {
    return false;
  }

  await page.click(OPEN_MENU_SELECTOR);
  const opened = await page
    .waitForSelector(CLOSE_MENU_SELECTOR, {
      visible: true,
      timeout: 8000,
    })
    .catch(() => null);

  if (!opened) {
    await page.click(OPEN_MENU_SELECTOR);
    await page.waitForSelector(CLOSE_MENU_SELECTOR, {
      visible: true,
      timeout: 8000,
    });
  }

  return true;
}
