/**
 * Auditoria local: screenshots, fontes computadas e testes do combobox.
 * Executar a partir de audit/tools: node audit-browser.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import {
  AUDIT_BASE_URL as BASE_URL,
  clickClearOfCookieBanner,
  runSequentially,
} from "./audit.shared.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "../..");
const OUT = join(ROOT, "audit", "review");

const ROUTES = [
  "/",
  "/produtos/attendant",
  "/produtos/behavior",
  "/produtos/concierge",
  "/produtos/convert",
  "/produtos/iot",
  "/produtos/organizer",
  "/produtos/resolve",
  "/solicitar-demonstracao",
];

const VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "1366", width: 1366, height: 768 },
  { name: "1920", width: 1920, height: 1080 },
];

const AUDIT_OPTIONS = [
  { value: "audit-organizer", label: "Iungo Organizer (teste)" },
  { value: "audit-behavior", label: "Iungo Behavior (teste)" },
  { value: "audit-convert", label: "Iungo Convert (teste)" },
  { value: "audit-attendant", label: "Iungo Attendant (teste)" },
  { value: "audit-resolve", label: "Iungo Resolve (teste)" },
  { value: "audit-iot", label: "Iungo IoT (teste)" },
  { value: "audit-concierge", label: "Iungo Concierge (teste)" },
];

mkdirSync(OUT, { recursive: true });

function slug(path) {
  return path === "/" ? "home" : path.replaceAll("/", "-").slice(1);
}

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

  await page.evaluateOnNewDocument((options) => {
    window.__AUDIT_PRODUCT_OPTIONS__ = options;
  }, AUDIT_OPTIONS);

  const fontReport = [];
  const screenshotLog = [];

  async function captureRouteViewport(route, viewport) {
      await page.setViewport(viewport);
      await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});

      const fileName = `${slug(route)}-${viewport.name}.png`;
      const filePath = join(OUT, fileName);
      await page.screenshot({ path: filePath, fullPage: true });
      screenshotLog.push({ route, viewport: viewport.name, file: fileName });

      if (route === "/produtos/convert" && viewport.name === "1366") {
        const fonts = await page.evaluate(() => {
          const selectors = [
            "[data-convert-hero-icon]",
            "[data-convert-hero-title]",
            "[data-convert-testimonials]",
            "[data-footer-nav]",
          ];
          return selectors.map((selector) => {
            const el = document.querySelector(selector);
            if (!el) return { selector, found: false };
            const style = getComputedStyle(el);
            return {
              selector,
              found: true,
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
            };
          });
        });
        fontReport.push(...fonts);
      }

      if (route === "/solicitar-demonstracao" && viewport.name === "1366") {
        const formFonts = await page.evaluate(() => {
          const selectors = [
            "h1#request-demo-title",
            "#request-demo-product-interest",
            "label[for='request-demo-name']",
          ];
          return selectors.map((selector) => {
            const el = document.querySelector(selector);
            if (!el) return { selector, found: false };
            const style = getComputedStyle(el);
            return {
              selector,
              found: true,
              fontFamily: style.fontFamily,
              fontSize: style.fontSize,
            };
          });
        });
        fontReport.push(...formFonts);
      }
  }

  const shots = ROUTES.flatMap((route) =>
    VIEWPORTS.map((viewport) => ({ route, viewport })),
  );
  await runSequentially(shots, (shot) =>
    captureRouteViewport(shot.route, shot.viewport),
  );

  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(`${BASE_URL}/solicitar-demonstracao`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});

  const comboboxResults = [];

  const trigger = await page.waitForSelector("#request-demo-product-interest");
  if (!trigger) {
    throw new Error("Combobox trigger #request-demo-product-interest not found");
  }

  await clickClearOfCookieBanner(page, "#request-demo-product-interest");
  await page.waitForSelector("#request-demo-product-interest-listbox");

  comboboxResults.push(
    {
      test: "open-click",
      pass: await page.$eval(
        "#request-demo-product-interest",
        (el) => el.getAttribute("aria-expanded") === "true",
      ),
    },
    {
      test: "options-count-with-audit-injection",
      pass:
        (await page.$$eval('[role="option"]', (els) => els.length)) ===
        AUDIT_OPTIONS.length + 1,
    },
  );

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  comboboxResults.push({
    test: "active-descendant-updated",
    pass: await page.$eval("#request-demo-product-interest", (el) =>
      Boolean(el.getAttribute("aria-activedescendant")?.includes("-option-2")),
    ),
  });

  await page.keyboard.press("Enter");
  comboboxResults.push(
    {
      test: "select-enter-closes",
      pass: await page.$eval(
        "#request-demo-product-interest",
        (el) => el.getAttribute("aria-expanded") === "false",
      ),
    },
    {
      test: "hidden-input-value-updated",
      pass: await page.$eval(
        'input[name="productInterest"]',
        (el) => el.value !== "",
      ),
    },
  );

  await clickClearOfCookieBanner(page, "#request-demo-product-interest");
  await page.keyboard.press("Escape");
  comboboxResults.push({
    test: "escape-closes",
    pass: await page.$eval(
      "#request-demo-product-interest",
      (el) => el.getAttribute("aria-expanded") === "false",
    ),
  });

  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  comboboxResults.push({
    test: "open-keyboard",
    pass: await page.$eval(
      "#request-demo-product-interest",
      (el) => el.getAttribute("aria-expanded") === "true",
    ),
  });

  await page.mouse.click(10, 10);
  comboboxResults.push({
    test: "click-outside-closes",
    pass: await page.$eval(
      "#request-demo-product-interest",
      (el) => el.getAttribute("aria-expanded") === "false",
    ),
  });

  await trigger.focus();
  await page.keyboard.press("ArrowDown");
  const panelBox = await page.$eval(
    "#request-demo-product-interest-listbox",
    (el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        borderRadius: getComputedStyle(el).borderRadius,
      };
    },
  );

  comboboxResults.push(
    {
      test: "panel-rounded-20px",
      pass: panelBox.borderRadius === "20px",
      detail: panelBox.borderRadius,
    },
    {
      test: "panel-within-viewport",
      pass:
        panelBox.top >= 0 &&
        panelBox.bottom <= 768 &&
        panelBox.left >= 0 &&
        panelBox.width > 0,
      detail: panelBox,
    },
  );

  await page.evaluate(() => {
    const triggerEl = document.querySelector("#request-demo-product-interest");
    triggerEl?.scrollIntoView({ block: "center" });
  });
  await page.keyboard.press("ArrowDown");
  const scrolledPanel = await page.$eval(
    "#request-demo-product-interest-listbox",
    (el) => {
      const rect = el.getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom };
    },
  );
  comboboxResults.push({
    test: "panel-repositions-on-scroll-context",
    pass: scrolledPanel.bottom <= 768 && scrolledPanel.top >= 0,
    detail: scrolledPanel,
  });

  writeFileSync(
    join(OUT, "combobox-results.json"),
    JSON.stringify(comboboxResults, null, 2),
  );
  writeFileSync(
    join(OUT, "font-report.json"),
    JSON.stringify(fontReport, null, 2),
  );
  writeFileSync(
    join(OUT, "screenshots.json"),
    JSON.stringify(screenshotLog, null, 2),
  );

  console.log(
    JSON.stringify(
      { screenshots: screenshotLog.length, comboboxResults, fontReport },
      null,
      2,
    ),
  );
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  if (chrome) {
    await chrome.kill();
  }

  if (process.exitCode === 1) {
    process.exit(1);
  }
}
