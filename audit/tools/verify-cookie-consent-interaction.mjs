/**
 * Verificação focal do banner/modal de cookies (foco, X, Escape, Footer, scroll).
 * Executar com o dev server: node verify-cookie-consent-interaction.mjs
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const SCROLL_TOLERANCE_PX = 1;

const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
}

async function activeId(page) {
  return page.evaluate(
    () => document.activeElement?.id || document.activeElement?.tagName || null,
  );
}

async function bannerVisible(page) {
  return (await page.$("[data-cookie-banner]")) !== null;
}

async function dialogOpen(page) {
  return page.$eval(
    "[data-cookie-preferences-dialog]",
    (el) => el instanceof HTMLDialogElement && el.open,
  );
}

async function waitDialog(page, open) {
  await page.waitForFunction(
    (shouldOpen) => {
      const dialog = document.querySelector("[data-cookie-preferences-dialog]");
      return dialog instanceof HTMLDialogElement && dialog.open === shouldOpen;
    },
    { timeout: 5000 },
    open,
  );
}

async function scrollY(page) {
  return page.evaluate(() => window.scrollY);
}

async function resetVisit(page) {
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(() => {
    window.localStorage.removeItem("iungo.cookie-consent");
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-cookie-banner]", { timeout: 10000 });
}

async function scrollToMid(page) {
  const target = await page.evaluate(() =>
    Math.round(
      Math.max(400, (document.documentElement.scrollHeight - window.innerHeight) / 2),
    ),
  );
  await page.evaluate((top) => {
    window.scrollTo(0, top);
  }, target);
  await page.waitForFunction(
    (top) => Math.abs(window.scrollY - top) <= 1,
    { timeout: 5000 },
    target,
  );
}

async function assertScrollStable(page, name, action) {
  const before = await scrollY(page);
  await action();
  const after = await scrollY(page);
  record(name, Math.abs(after - before) <= SCROLL_TOLERANCE_PX, { before, after });
}

async function openFromBanner(page) {
  await page.evaluate(() => {
    const buttons = [
      ...document.querySelectorAll("[data-cookie-banner] button"),
    ];
    buttons[0]?.click();
  });
  await waitDialog(page, true);
}

async function bannerAction(page, label) {
  await page.evaluate((buttonLabel) => {
    const buttons = [
      ...document.querySelectorAll("[data-cookie-banner] button"),
    ];
    buttons
      .find((button) => button.textContent?.trim() === buttonLabel)
      ?.click();
  }, label);
  await page.waitForFunction(
    () => !document.querySelector("[data-cookie-banner]"),
    { timeout: 5000 },
  );
}

async function saveFromModal(page) {
  await page.evaluate(() => {
    document.querySelector("[data-cookie-preferences-dialog] label")?.click();
    document
      .querySelector("[data-cookie-preferences-dialog] button:not([aria-label])")
      ?.click();
  });
  await page.waitForFunction(
    () => !document.querySelector("[data-cookie-banner]"),
    { timeout: 5000 },
  );
}

async function openFromFooter(page) {
  await page.evaluate(() => {
    document.getElementById("footer-cookie-settings")?.focus({
      preventScroll: true,
    });
    document.getElementById("footer-cookie-settings")?.click();
  });
  await waitDialog(page, true);
}

let chrome;
let browser;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });

  browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
    defaultViewport: { width: 1366, height: 768 },
  });

  const page = await browser.newPage();

  await resetVisit(page);
  record("banner-visible-on-fresh-visit", await bannerVisible(page));

  await openFromBanner(page);
  record("personalize-opens-dialog", await dialogOpen(page));
  await assertScrollStable(page, "escape-keeps-scroll-at-top", async () => {
    await page.keyboard.press("Escape");
    await waitDialog(page, false);
  });
  record(
    "escape-closes-without-saving",
    (await dialogOpen(page)) === false && (await bannerVisible(page)),
  );
  record(
    "escape-restores-focus-to-personalize",
    (await page.evaluate(() => document.activeElement?.textContent?.trim())) ===
      "Personalizar cookies",
  );

  await openFromBanner(page);
  await assertScrollStable(page, "x-keeps-scroll-at-top", async () => {
    await page.evaluate(() => {
      document
        .querySelector('[aria-label="Fechar preferências de cookies"]')
        ?.click();
    });
    await waitDialog(page, false);
  });
  record(
    "x-closes-without-saving",
    (await dialogOpen(page)) === false && (await bannerVisible(page)),
  );
  record(
    "x-restores-focus-to-personalize",
    (await page.evaluate(() => document.activeElement?.textContent?.trim())) ===
      "Personalizar cookies",
  );

  await assertScrollStable(page, "accept-keeps-scroll-at-top", async () => {
    await bannerAction(page, "Aceitar todos os cookies");
  });
  record("accept-hides-banner", (await bannerVisible(page)) === false);
  record(
    "accept-focus-stays-accessible",
    ["footer-cookie-settings", "BODY", "MAIN"].includes(await activeId(page)),
    await activeId(page),
  );

  await resetVisit(page);
  await assertScrollStable(page, "reject-keeps-scroll-at-top", async () => {
    await bannerAction(page, "Rejeitar cookies não necessários");
  });
  record("reject-hides-banner", (await bannerVisible(page)) === false);

  await resetVisit(page);
  await scrollToMid(page);
  await assertScrollStable(page, "accept-keeps-scroll-at-mid", async () => {
    await bannerAction(page, "Aceitar todos os cookies");
  });

  await resetVisit(page);
  await scrollToMid(page);
  await assertScrollStable(page, "reject-keeps-scroll-at-mid", async () => {
    await bannerAction(page, "Rejeitar cookies não necessários");
  });

  await resetVisit(page);
  await scrollToMid(page);
  const scrollBeforePersonalize = await scrollY(page);
  await assertScrollStable(page, "personalize-keeps-scroll-at-mid", async () => {
    await openFromBanner(page);
  });
  record(
    "personalize-opened-from-mid",
    scrollBeforePersonalize > 100,
    scrollBeforePersonalize,
  );
  await assertScrollStable(page, "save-keeps-scroll-at-mid", async () => {
    await saveFromModal(page);
    await waitDialog(page, false);
  });
  record("save-hides-banner", (await bannerVisible(page)) === false);
  record("save-closes-dialog", (await dialogOpen(page)) === false);
  record(
    "save-focus-stays-accessible",
    ["footer-cookie-settings", "BODY", "MAIN"].includes(await activeId(page)),
    await activeId(page),
  );

  await openFromFooter(page);
  record("footer-reopens-dialog", await dialogOpen(page));
  const restoredChoice = await page.$eval(
    "[data-cookie-preferences-dialog] input[type='radio']:checked",
    (el) => (el instanceof HTMLInputElement ? el.value : null),
  );
  record("footer-restores-saved-choice", restoredChoice === "accept-all", restoredChoice);

  await assertScrollStable(page, "footer-escape-keeps-scroll", async () => {
    await page.keyboard.press("Escape");
    await waitDialog(page, false);
  });
  record(
    "footer-escape-restores-focus",
    (await activeId(page)) === "footer-cookie-settings",
  );

  await openFromFooter(page);
  await assertScrollStable(page, "footer-x-keeps-scroll", async () => {
    await page.evaluate(() => {
      document
        .querySelector('[aria-label="Fechar preferências de cookies"]')
        ?.click();
    });
    await waitDialog(page, false);
  });
  record("footer-x-restores-focus", (await activeId(page)) === "footer-cookie-settings");
} catch (error) {
  record("script-error", false, String(error));
} finally {
  const failed = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ failed: failed.length, results }, null, 2));

  await browser?.disconnect().catch(() => {});
  try {
    if (chrome) {
      await chrome.kill();
    }
  } catch {
    // ignore cleanup errors
  }

  process.exit(failed.length === 0 ? 0 : 1);
}
