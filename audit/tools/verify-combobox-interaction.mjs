/**
 * Verificação focal: privacidade renderizada + combobox (teclado, mouse, gesto cancelado).
 * Executar: node verify-combobox-interaction.mjs (com dev server em AUDIT_BASE_URL)
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3003";

const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
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
  await page.goto(`${BASE_URL}/solicitar-demonstracao`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});

  const privacyText = await page.$eval(
    "[data-request-demo-privacy-notice] p",
    (el) => el.textContent?.replace(/\s+/g, " ").trim() ?? "",
  );

  record("privacy-no-braces", !/[{}]/.test(privacyText), privacyText);
  record(
    "privacy-policy-period-spacing",
    /Política de Privacidade\. Autorizo/.test(privacyText),
    privacyText,
  );
  record(
    "privacy-email-period-spacing",
    /dpo@iungo-ai\.com\./.test(privacyText),
    privacyText,
  );

  const trigger = await page.waitForSelector("#request-demo-product-interest");
  if (!trigger) {
    throw new Error("Combobox trigger not found");
  }

  await trigger.click();
  await page.waitForSelector("#request-demo-product-interest-listbox");

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  const activeAfterArrows = await page.$eval(
    "#request-demo-product-interest",
    (el) => el.getAttribute("aria-activedescendant"),
  );
  record("keyboard-active-descendant", activeAfterArrows?.includes("-option-2") ?? false, activeAfterArrows);

  await page.keyboard.press("Enter");
  const afterEnter = await page.$eval(
    "#request-demo-product-interest",
    (el) => ({
      expanded: el.getAttribute("aria-expanded"),
      value: document.querySelector('input[name="productInterest"]')?.value,
    }),
  );
  record("keyboard-enter-selects", afterEnter.expanded === "false" && afterEnter.value !== "", afterEnter);

  await trigger.click();
  await page.waitForSelector("#request-demo-product-interest-listbox");

  await page.click("#request-demo-product-interest-listbox li:nth-child(4) [role=\"option\"]");
  const afterMouseClick = await page.$eval(
    'input[name="productInterest"]',
    (el) => el.value,
  );
  record("mouse-click-selects", afterMouseClick !== "", afterMouseClick);

  await trigger.click();
  await page.waitForSelector("#request-demo-product-interest-listbox");

  const valueBeforeCancel = await page.$eval(
    'input[name="productInterest"]',
    (el) => el.value,
  );

  const optionBox = await page.$eval(
    "#request-demo-product-interest-listbox li:nth-child(3) [role=\"option\"]",
    (el) => {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    },
  );

  await page.mouse.move(optionBox.x, optionBox.y);
  await page.mouse.down();
  await page.mouse.move(10, 10, { steps: 5 });
  await page.mouse.up();

  const valueAfterCancel = await page.$eval(
    'input[name="productInterest"]',
    (el) => el.value,
  );
  record(
    "cancelled-gesture-no-selection",
    valueAfterCancel === valueBeforeCancel,
    { before: valueBeforeCancel, after: valueAfterCancel },
  );

  await page.keyboard.press("Escape");
  record(
    "escape-closes",
    await page.$eval(
      "#request-demo-product-interest",
      (el) => el.getAttribute("aria-expanded") === "false",
    ),
  );

  console.log(JSON.stringify(results, null, 2));
  const failed = results.filter((item) => !item.pass);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  try {
    if (chrome) {
      await chrome.kill();
    }
  } catch {
    // ignore cleanup errors
  }
  if (process.exitCode === 1) {
    process.exit(1);
  }
}
