/**
 * Verifica se Tab/Shift+Tab ficam no menu mobile aberto (fundo inert).
 * node verify-mobile-nav-focus.mjs
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
}

function describeActive(element) {
  if (!(element instanceof Element)) {
    return String(element);
  }

  return (
    element.getAttribute("aria-label") ||
    element.textContent?.replace(/\s+/g, " ").trim().slice(0, 80) ||
    element.id ||
    element.tagName
  );
}

async function inspectOpenMenu(page) {
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 10000 });
  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });

  const isolation = await page.evaluate(() => {
    const root = document.querySelector("[data-mobile-navigation]");
    const logo = document.querySelector("[data-header-logo]");
    const footerLink = document.querySelector("footer a");
    const mainLink = document.querySelector("main a, [data-page-main-content] a");

    const isBackground = (element) =>
      element instanceof HTMLElement &&
      Boolean(element.closest("[inert]")) &&
      !(root instanceof HTMLElement && root.contains(element));

    const tabbableOutside = [
      ...document.querySelectorAll(
        'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => {
      if (!(element instanceof HTMLElement)) {
        return false;
      }
      if (root instanceof HTMLElement && root.contains(element)) {
        return false;
      }
      if (element.closest("[inert]")) {
        return false;
      }
      const style = getComputedStyle(element);
      if (style.visibility === "hidden" || style.display === "none") {
        return false;
      }
      return element.getClientRects().length > 0;
    });

    return {
      rootFound: root instanceof HTMLElement,
      logoInert: isBackground(logo),
      footerInert: isBackground(footerLink),
      mainInert: mainLink ? isBackground(mainLink) : true,
      tabbableOutside: tabbableOutside.map((element) => ({
        tag: element.tagName,
        label:
          element.getAttribute("aria-label") ||
          element.textContent?.replace(/\s+/g, " ").trim().slice(0, 60),
      })),
    };
  });

  record("open:root", isolation.rootFound, isolation);
  record("open:logo-inert", isolation.logoInert, isolation);
  record("open:footer-inert", isolation.footerInert, isolation);
  record("open:main-inert", isolation.mainInert, isolation);
  record(
    "open:no-tabbable-outside",
    isolation.tabbableOutside.length === 0,
    isolation.tabbableOutside,
  );

  const tabStops = [];
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.press("Tab");
    tabStops.push(
      await page.evaluate((describeSource) => {
        const describe = eval(`(${describeSource})`);
        const root = document.querySelector("[data-mobile-navigation]");
        const active = document.activeElement;
        return {
          inside:
            root instanceof HTMLElement &&
            active instanceof Node &&
            root.contains(active),
          label: describe(active),
        };
      }, describeActive.toString()),
    );
  }

  const tabEscaped = tabStops.filter((stop) => !stop.inside);
  record("open:tab-stays-inside", tabEscaped.length === 0, {
    tabStops,
    tabEscaped,
  });
  record(
    "open:tab-reaches-menu-items",
    tabStops.some((stop) => stop.label.includes("Soluções")) &&
      tabStops.some((stop) => stop.label.includes("Solicitar Demonstração")),
    tabStops.map((stop) => stop.label),
  );

  const shiftStops = [];
  for (let index = 0; index < 16; index += 1) {
    await page.keyboard.down("Shift");
    await page.keyboard.press("Tab");
    await page.keyboard.up("Shift");
    shiftStops.push(
      await page.evaluate((describeSource) => {
        const describe = eval(`(${describeSource})`);
        const root = document.querySelector("[data-mobile-navigation]");
        const active = document.activeElement;
        return {
          inside:
            root instanceof HTMLElement &&
            active instanceof Node &&
            root.contains(active),
          label: describe(active),
        };
      }, describeActive.toString()),
    );
  }

  const shiftEscaped = shiftStops.filter((stop) => !stop.inside);
  record("open:shift-tab-stays-inside", shiftEscaped.length === 0, {
    shiftStops,
    shiftEscaped,
  });

  await page.keyboard.press("Escape");
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 5000 });

  const closed = await page.evaluate(() => {
    const logo = document.querySelector("[data-header-logo]");
    const panel = document.getElementById("mobile-navigation-menu");
    const footerLink = document.querySelector("footer a");
    return {
      logoInert: logo instanceof HTMLElement && Boolean(logo.closest("[inert]")),
      panelInert: panel instanceof HTMLElement && panel.inert,
      footerInert:
        footerLink instanceof HTMLElement &&
        Boolean(footerLink.closest("[inert]")),
    };
  });

  record("closed:logo-not-inert", !closed.logoInert, closed);
  record("closed:panel-inert", closed.panelInert, closed);
  record("closed:footer-not-inert", !closed.footerInert, closed);
}

async function inspectClosePaths(page, consoleMessages) {
  const start = consoleMessages.length;

  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 10000 });
  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });
  await page.click('[aria-label="Fechar menu"]');
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 5000 });

  const afterToggle = await page.evaluate(() => ({
    label: document.activeElement?.getAttribute("aria-label"),
    panelInert: document.getElementById("mobile-navigation-menu")?.inert === true,
    scrollY: window.scrollY,
  }));
  record(
    "close-x:focus-on-trigger",
    afterToggle.label === "Abrir menu",
    afterToggle,
  );
  record("close-x:panel-inert", afterToggle.panelInert, afterToggle);
  record("close-x:no-page-jump", afterToggle.scrollY === 0, afterToggle);

  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 5000 });
  const afterEscape = await page.evaluate(() => ({
    label: document.activeElement?.getAttribute("aria-label"),
    panelInert: document.getElementById("mobile-navigation-menu")?.inert === true,
    scrollY: window.scrollY,
  }));
  record(
    "close-escape:focus-on-trigger",
    afterEscape.label === "Abrir menu",
    afterEscape,
  );
  record("close-escape:panel-inert", afterEscape.panelInert, afterEscape);
  record("close-escape:no-page-jump", afterEscape.scrollY === 0, afterEscape);

  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });
  await page.evaluate(() => {
    const demo = [...document.querySelectorAll("#mobile-navigation-menu a")].find(
      (element) => element.textContent?.trim() === "Solicitar Demonstração",
    );
    if (demo instanceof HTMLElement) {
      demo.focus();
      demo.click();
    }
  });
  await page.waitForFunction(
    () => location.pathname.includes("solicitar-demonstracao"),
    { timeout: 8000 },
  );
  const afterNavigate = await page.evaluate(() => ({
    path: location.pathname,
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverscroll: document.body.style.overscrollBehavior,
  }));
  record(
    "close-navigate:page-changed",
    afterNavigate.path.includes("solicitar-demonstracao"),
    afterNavigate,
  );
  record(
    "close-navigate:overflow-restored",
    afterNavigate.bodyOverscroll !== "none",
    afterNavigate,
  );

  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 10000 });
  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });
  await page.keyboard.press("Tab");
  await page.setViewport({ width: 1280, height: 800 });
  await page.waitForFunction(
    () => document.body.style.overscrollBehavior !== "none",
    { timeout: 5000 },
  );
  const afterDesktop = await page.evaluate(() => {
    const active = document.activeElement;
    const hamburger = document.querySelector(
      '[aria-label="Abrir menu"], [aria-label="Fechar menu"]',
    );
    return {
      activeLabel:
        active instanceof HTMLElement
          ? active.getAttribute("aria-label") || active.id || active.tagName
          : String(active),
      hamburgerHidden:
        !(hamburger instanceof HTMLElement) || hamburger.offsetParent === null,
      focusOnHiddenHamburger:
        hamburger instanceof HTMLElement &&
        hamburger.offsetParent === null &&
        document.activeElement === hamburger,
      bodyOverscroll: document.body.style.overscrollBehavior,
      panelInert: document.getElementById("mobile-navigation-menu")?.inert === true,
    };
  });
  record(
    "close-desktop:overflow-restored",
    afterDesktop.bodyOverscroll !== "none",
    afterDesktop,
  );
  record(
    "close-desktop:not-hidden-hamburger",
    afterDesktop.focusOnHiddenHamburger === false,
    afterDesktop,
  );
  record("close-desktop:panel-inert", afterDesktop.panelInert, afterDesktop);

  const ariaWarnings = consoleMessages
    .slice(start)
    .filter((text) => text.includes("aria-hidden"));
  record("console:no-aria-hidden-warning", ariaWarnings.length === 0, ariaWarnings);
}

async function inspectHmr(page, consoleMessages) {
  const start = consoleMessages.length;
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const later = consoleMessages.slice(start);
  const websocketClosed = later.filter((text) =>
    text.includes("WebSocket is closed before the connection is established"),
  );
  const hmrConnected = later.filter((text) => text.includes("[HMR] connected"));
  record("hmr:websocket-closed-after-load", websocketClosed.length === 0, {
    websocketClosed,
    hmrConnected: hmrConnected.length,
    messages: later.slice(0, 20),
  });
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
  const consoleMessages = [];
  page.on("console", (msg) => {
    consoleMessages.push(msg.text());
  });
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

  await inspectHmr(page, consoleMessages);
  await inspectOpenMenu(page);
  await inspectClosePaths(page, consoleMessages);
} catch (error) {
  record("script-error", false, String(error));
} finally {
  const failed = results.filter((item) => !item.pass);
  console.log(JSON.stringify({ failed: failed.length, results }, null, 2));
  await browser?.disconnect().catch(() => {});
  try {
    if (chrome) await chrome.kill();
  } catch {
    // ignore
  }
  process.exit(failed.length === 0 ? 0 : 1);
}
