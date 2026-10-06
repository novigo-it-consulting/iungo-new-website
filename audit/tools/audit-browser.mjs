/**
 * Auditoria local: screenshots, fontes computadas e testes do combobox.
 * Executar a partir de audit/tools: node audit-browser.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

import { AUDIT_BASE_URL, runSequentially } from "./audit.shared.mjs";
import { captureRouteViewport } from "./audit-browser.capture.measure.shared.mjs";
import { auditCombobox } from "./audit-browser.combobox.checks.shared.mjs";
import {
  AUDIT_OPTIONS,
  AUDIT_REVIEW_DIR,
  AUDIT_ROUTES,
  AUDIT_VIEWPORTS,
} from "./audit-browser.selectors.shared.mjs";

mkdirSync(AUDIT_REVIEW_DIR, { recursive: true });

let chrome;
let browser;

function writeReports(fontReport, screenshotLog, comboboxResults) {
  writeFileSync(path.join(AUDIT_REVIEW_DIR, "combobox-results.json"), JSON.stringify(comboboxResults, null, 2));
  writeFileSync(path.join(AUDIT_REVIEW_DIR, "font-report.json"), JSON.stringify(fontReport, null, 2));
  writeFileSync(path.join(AUDIT_REVIEW_DIR, "screenshots.json"), JSON.stringify(screenshotLog, null, 2));
  console.log(JSON.stringify({ screenshots: screenshotLog.length, comboboxResults, fontReport }, null, 2));
}

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
  const shots = AUDIT_ROUTES.flatMap((route) =>
    AUDIT_VIEWPORTS.map((viewport) => ({ route, viewport })),
  );
  await runSequentially(shots, (shot) =>
    captureRouteViewport(page, shot, fontReport, screenshotLog, AUDIT_REVIEW_DIR),
  );

  await page.setViewport({ width: 1366, height: 768 });
  await page.goto(`${AUDIT_BASE_URL}/solicitar-demonstracao`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
  const comboboxResults = [];
  await auditCombobox(page, comboboxResults);
  writeReports(fontReport, screenshotLog, comboboxResults);
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
