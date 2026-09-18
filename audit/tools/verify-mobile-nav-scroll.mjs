/**
 * Verificação: rolagem do menu mobile / Soluções.
 * node verify-mobile-nav-scroll.mjs  (dev server em AUDIT_BASE_URL)
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
}

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "375x667", width: 375, height: 667 },
  { name: "393x852", width: 393, height: 852 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x320-landscape", width: 390, height: 320 },
];

async function inspectViewport(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 10000 });

  const hamburger = await page.$('[aria-label="Abrir menu"]');
  if (!hamburger) {
    record(`${viewport.name}:hamburger`, false, "missing");
    return;
  }

  await hamburger.click();
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 5000 });
  await page.waitForSelector("#mobile-navigation-menu", { timeout: 5000 });
  await page.waitForFunction(
    () => {
      const panel = document.getElementById("mobile-navigation-menu");
      return (
        panel instanceof HTMLElement &&
        getComputedStyle(panel).visibility === "visible"
      );
    },
    { timeout: 5000 },
  );

  const collapsed = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    const demo = [...(panel?.querySelectorAll("a, span") ?? [])].find(
      (element) => element.textContent?.trim() === "Solicitar Demonstração",
    );
    const details = document
      .querySelector("#mobile-solucoes-nav-group")
      ?.closest("details");
    if (!(panel instanceof HTMLElement) || !(demo instanceof HTMLElement)) {
      return null;
    }
    const panelRect = panel.getBoundingClientRect();
    const demoRect = demo.getBoundingClientRect();
    return {
      solucoesOpen: details instanceof HTMLDetailsElement && details.open,
      panelBottom: Math.round(panelRect.bottom),
      demoBottom: Math.round(demoRect.bottom),
      viewportHeight: window.innerHeight,
      gapBelowButtons: Math.round(panelRect.bottom - demoRect.bottom),
      unusedViewport: Math.round(window.innerHeight - panelRect.bottom),
    };
  });

  record(
    `${viewport.name}:collapsed-banner-ends-after-buttons`,
    Boolean(
      collapsed &&
        collapsed.solucoesOpen === false &&
        (collapsed.demoBottom <= collapsed.panelBottom + 1
          ? collapsed.gapBelowButtons >= 8 && collapsed.gapBelowButtons <= 80
          : collapsed.unusedViewport <= 1),
    ),
    collapsed,
  );
  record(
    `${viewport.name}:collapsed-not-full-page`,
    Boolean(
      collapsed &&
        (viewport.height < 500 || collapsed.unusedViewport >= 80),
    ),
    collapsed,
  );

  await page.evaluate(() => {
    document.querySelector("#mobile-solucoes-nav-group")
      ?.closest("details")
      ?.setAttribute("open", "");
    const summary = document.querySelector(
      '#mobile-navigation-menu summary',
    );
    if (summary instanceof HTMLElement && !summary.closest("details")?.open) {
      summary.click();
    }
  });

  const panelBox = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }
    const rect = panel.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: Math.min(rect.top + Math.max(rect.height / 2, 40), window.innerHeight - 24),
    };
  });

  if (!panelBox) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }

  await page.mouse.move(panelBox.x, panelBox.y);
  await new Promise((resolve) => setTimeout(resolve, 100));
  let previousScrollTop = -1;
  for (let step = 0; step < 24; step += 1) {
    const scrollTop = await page.$eval(
      "#mobile-navigation-menu",
      (element) => element.scrollTop,
    );
    if (step > 0 && scrollTop === previousScrollTop) {
      break;
    }
    previousScrollTop = scrollTop;
    await page.mouse.wheel({ deltaY: 600 });
    await new Promise((resolve) => setTimeout(resolve, 40));
  }
  await page.waitForFunction(
    () => {
      const panel = document.getElementById("mobile-navigation-menu");
      if (!(panel instanceof HTMLElement)) {
        return false;
      }
      const maxScroll = panel.scrollHeight - panel.clientHeight;
      return maxScroll <= 1 || panel.scrollTop >= maxScroll - 2;
    },
    { timeout: 4000 },
  ).catch(() => {});

  const metrics = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }

    const findLabeled = (label) =>
      [...panel.querySelectorAll("a, span, button")].find(
        (element) => element.textContent?.trim() === label,
      );

    const report = (element) => {
      if (!(element instanceof HTMLElement)) {
        return { missing: true };
      }
      const rect = element.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const hit = document.elementFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
      );
      return {
        missing: false,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
        height: Math.round(rect.height),
        fullyInViewport: rect.top >= 0 && rect.bottom <= window.innerHeight + 1,
        fullyInPanel:
          rect.top >= panelRect.top - 1 && rect.bottom <= panelRect.bottom + 1,
        clickable: Boolean(hit && element.contains(hit)),
      };
    };

    const panelRect = panel.getBoundingClientRect();
    const styles = getComputedStyle(panel);
    const docWidth = document.documentElement.scrollWidth;
    const recursos = report(findLabeled("Recursos"));
    const client = report(findLabeled("Área do Cliente"));
    const demo = report(findLabeled("Solicitar Demonstração"));
    const closeButton = document.querySelector('[aria-label="Fechar menu"]');
    const logo = document.querySelector("[data-header-logo]");

    const productCards = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-product]"),
    ];
    const descriptionDisplays = productCards.map((card) => {
      const description = card.querySelector("p");
      return description instanceof HTMLElement
        ? getComputedStyle(description).display
        : "missing";
    });
    const titlesPresent = productCards.every(
      (card) => (card.textContent ?? "").trim().length > 0,
    );
    const minCardHeight = Math.min(
      ...productCards.map((card) =>
        card instanceof HTMLElement
          ? card.getBoundingClientRect().height
          : Infinity,
      ),
    );
    const categorySubtitles = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p"),
    ];
    const categorySubtitlesHidden =
      categorySubtitles.length > 0 &&
      categorySubtitles.every(
        (node) =>
          node instanceof HTMLElement &&
          getComputedStyle(node).display === "none",
      );
    const viewLinks = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]"),
    ];
    const viewLinksHidden =
      viewLinks.length > 0 &&
      viewLinks.every(
        (node) =>
          node instanceof HTMLElement &&
          getComputedStyle(node).display === "none",
      );
    const categoryLists = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-product-list]"),
    ];
    const dividersOk = categoryLists.every((list) => {
      if (!(list instanceof HTMLElement)) {
        return false;
      }
      const items = [...list.children].filter(
        (node) => node instanceof HTMLElement,
      );
      if (items.length === 0) {
        return false;
      }
      return items.every((item, index) => {
        const borderBottom = Number.parseFloat(
          getComputedStyle(item).borderBottomWidth,
        );
        if (index === items.length - 1) {
          return borderBottom === 0;
        }
        return borderBottom > 0;
      });
    });

    return {
      overflowY: styles.overflowY,
      overscroll: styles.overscrollBehavior,
      position: styles.position,
      top: styles.top,
      bottom: styles.bottom,
      clientHeight: panel.clientHeight,
      scrollHeight: panel.scrollHeight,
      scrollTop: panel.scrollTop,
      panelTop: Math.round(panelRect.top),
      panelBottom: Math.round(panelRect.bottom),
      headerVisible:
        logo instanceof HTMLElement &&
        logo.getBoundingClientRect().bottom > 0 &&
        logo.getBoundingClientRect().top < window.innerHeight,
      closeVisible:
        closeButton instanceof HTMLElement &&
        closeButton.getBoundingClientRect().height > 0,
      recursos,
      client,
      demo,
      hasHorizontalPageScroll: docWidth > window.innerWidth + 1,
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverscroll: document.body.style.overscrollBehavior,
      descriptionsHidden:
        descriptionDisplays.length > 0 &&
        descriptionDisplays.every((display) => display === "none"),
      titlesPresent,
      minCardHeight: Number.isFinite(minCardHeight)
        ? Math.round(minCardHeight)
        : null,
      productCount: productCards.length,
      categorySubtitlesHidden,
      viewLinksHidden,
      dividersOk,
    };
  });

  if (!metrics) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }

  const endReached = (item) =>
    item &&
    item.missing !== true &&
    item.fullyInViewport === true &&
    item.fullyInPanel === true &&
    item.clickable === true;

  record(
    `${viewport.name}:overflow-y`,
    metrics.overflowY === "auto" || metrics.overflowY === "scroll",
    metrics.overflowY,
  );
  record(
    `${viewport.name}:fits-viewport`,
    metrics.clientHeight <= viewport.height &&
      metrics.panelBottom <= viewport.height + 1,
    {
      clientHeight: metrics.clientHeight,
      viewport: viewport.height,
      panelTop: metrics.panelTop,
      panelBottom: metrics.panelBottom,
      top: metrics.top,
      bottom: metrics.bottom,
    },
  );
  record(
    `${viewport.name}:can-scroll-or-already-fits`,
    metrics.scrollHeight > metrics.clientHeight - 1 ||
      endReached(metrics.demo),
    { scrollHeight: metrics.scrollHeight, clientHeight: metrics.clientHeight, demo: metrics.demo },
  );
  record(
    `${viewport.name}:chrome-visible`,
    metrics.headerVisible === true && metrics.closeVisible === true,
    {
      headerVisible: metrics.headerVisible,
      closeVisible: metrics.closeVisible,
    },
  );
  record(
    `${viewport.name}:recursos-fully-visible`,
    endReached(metrics.recursos),
    metrics.recursos,
  );
  record(
    `${viewport.name}:client-button-fully-visible`,
    endReached(metrics.client),
    metrics.client,
  );
  record(
    `${viewport.name}:demo-button-fully-visible`,
    endReached(metrics.demo),
    metrics.demo,
  );
  record(
    `${viewport.name}:descriptions-hidden`,
    metrics.descriptionsHidden && metrics.titlesPresent,
    {
      descriptionsHidden: metrics.descriptionsHidden,
      titlesPresent: metrics.titlesPresent,
      productCount: metrics.productCount,
      minCardHeight: metrics.minCardHeight,
    },
  );
  record(
    `${viewport.name}:compact-touch`,
    metrics.minCardHeight >= 44 && metrics.minCardHeight <= 80,
    metrics.minCardHeight,
  );
  record(
    `${viewport.name}:category-subtitles-hidden`,
    metrics.categorySubtitlesHidden,
    metrics.categorySubtitlesHidden,
  );
  record(
    `${viewport.name}:view-links-hidden`,
    metrics.viewLinksHidden,
    metrics.viewLinksHidden,
  );
  record(
    `${viewport.name}:product-dividers`,
    metrics.dividersOk,
    metrics.dividersOk,
  );
  record(
    `${viewport.name}:no-horizontal-scroll`,
    metrics.hasHorizontalPageScroll === false,
    metrics.hasHorizontalPageScroll,
  );
  record(
    `${viewport.name}:page-locked-while-open`,
    metrics.bodyOverscroll === "none",
    { body: metrics.bodyOverflow, html: metrics.htmlOverflow, overscroll: metrics.bodyOverscroll },
  );

  for (let step = 0; step < 24; step += 1) {
    const scrollTop = await page.$eval(
      "#mobile-navigation-menu",
      (element) => element.scrollTop,
    );
    if (scrollTop === 0) {
      break;
    }
    await page.mouse.wheel({ deltaY: -600 });
  }

  const backAtTop = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    const summary = panel?.querySelector("summary");
    if (!(panel instanceof HTMLElement) || !(summary instanceof HTMLElement)) {
      return { scrollTop: null, summaryVisible: false };
    }
    const rect = summary.getBoundingClientRect();
    return {
      scrollTop: panel.scrollTop,
      summaryVisible: rect.top >= panel.getBoundingClientRect().top - 1 && rect.bottom <= window.innerHeight + 1,
    };
  });
  record(
    `${viewport.name}:scroll-back-to-start`,
    backAtTop.scrollTop === 0 && backAtTop.summaryVisible === true,
    backAtTop,
  );

  await page.evaluate(() => {
    const details = document
      .querySelector("#mobile-solucoes-nav-group")
      ?.closest("details");
    if (details instanceof HTMLDetailsElement) {
      details.open = false;
      details.open = true;
    }
  });

  await page.click('[aria-label="Fechar menu"]');
  const afterClose = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    return {
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverscroll: document.body.style.overscrollBehavior,
      pointerEvents: panel ? getComputedStyle(panel).pointerEvents : null,
      inert: panel?.inert === true || panel?.hasAttribute("inert"),
      ariaHidden: panel?.getAttribute("aria-hidden"),
    };
  });
  record(
    `${viewport.name}:scroll-lock-cleared-after-close`,
    afterClose.bodyOverscroll !== "none",
    afterClose,
  );
  record(
    `${viewport.name}:closed-panel-inert`,
    afterClose.inert === true && afterClose.pointerEvents === "none",
    afterClose,
  );
}

async function inspectDesktop(page) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  const desktop = await page.evaluate(() => {
    const hamburger = document.querySelector('[aria-label="Abrir menu"]');
    const mobilePanel = document.getElementById("mobile-navigation-menu");
    const desktopTrigger = document.querySelector(
      '[data-header-nav-item="solucoes"]',
    );
    return {
      hamburgerHidden:
        !hamburger ||
        (hamburger instanceof HTMLElement && hamburger.offsetParent === null),
      mobilePanelHidden:
        !mobilePanel ||
        getComputedStyle(mobilePanel).visibility === "hidden" ||
        getComputedStyle(mobilePanel).pointerEvents === "none",
      hasDesktopTrigger:
        desktopTrigger instanceof HTMLElement &&
        desktopTrigger.offsetParent !== null,
    };
  });
  record("desktop:hamburger-hidden", desktop.hamburgerHidden, desktop);
  record("desktop:mobile-panel-inert", desktop.mobilePanelHidden, desktop);
  record("desktop:solucoes-trigger", desktop.hasDesktopTrigger, desktop);

  await page.hover('[data-header-nav-item="solucoes"]');
  await page.waitForSelector("[data-solucoes-mega-menu-panel]", {
    timeout: 5000,
  });
  const mega = await page.evaluate(() => {
    const panel = document.querySelector("[data-solucoes-mega-menu-panel]");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }
    const styles = getComputedStyle(panel);
    const rect = panel.getBoundingClientRect();
    const descriptions = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-product] p"),
    ];
    const visibleDescriptions = descriptions.filter(
      (node) =>
        node instanceof HTMLElement &&
        getComputedStyle(node).display !== "none" &&
        node.getBoundingClientRect().height > 0,
    );
    const categorySubtitles = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p"),
    ];
    const visibleSubtitles = categorySubtitles.filter(
      (node) =>
        node instanceof HTMLElement &&
        getComputedStyle(node).display !== "none" &&
        node.getBoundingClientRect().height > 0,
    );
    const viewLinks = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]"),
    ];
    const visibleViewLinks = viewLinks.filter(
      (node) =>
        node instanceof HTMLElement &&
        getComputedStyle(node).display !== "none" &&
        node.getBoundingClientRect().height > 0,
    );
    const lists = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-product-list]"),
    ];
    const hasMobileDividers = lists.some((list) => {
      const items = [...list.children].filter(
        (node) => node instanceof HTMLElement,
      );
      return items.some(
        (item, index) =>
          index < items.length - 1 &&
          Number.parseFloat(getComputedStyle(item).borderBottomWidth) > 0,
      );
    });
    return {
      visible: rect.height > 0 && styles.visibility !== "hidden",
      maxHeight: styles.maxHeight,
      overflowY: styles.overflowY,
      withinViewport: rect.bottom <= window.innerHeight + 1,
      descriptionCount: descriptions.length,
      visibleDescriptionCount: visibleDescriptions.length,
      subtitleCount: categorySubtitles.length,
      visibleSubtitleCount: visibleSubtitles.length,
      viewLinkCount: viewLinks.length,
      visibleViewLinkCount: visibleViewLinks.length,
      hasMobileDividers,
    };
  });
  record(
    "desktop:mega-menu-opens",
    Boolean(mega?.visible && mega.withinViewport),
    mega,
  );
  record(
    "desktop:product-descriptions-visible",
    Boolean(
      mega &&
        mega.descriptionCount > 0 &&
        mega.visibleDescriptionCount === mega.descriptionCount,
    ),
    mega,
  );
  record(
    "desktop:category-subtitles-visible",
    Boolean(
      mega &&
        mega.subtitleCount > 0 &&
        mega.visibleSubtitleCount === mega.subtitleCount,
    ),
    mega,
  );
  record(
    "desktop:view-links-visible",
    Boolean(
      mega &&
        mega.viewLinkCount > 0 &&
        mega.visibleViewLinkCount === mega.viewLinkCount,
    ),
    mega,
  );
  record(
    "desktop:no-mobile-product-dividers",
    mega?.hasMobileDividers === false,
    mega,
  );
}

async function inspectDesktopAfterMobileOpen(page) {
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[aria-label="Abrir menu"]', { timeout: 10000 });
  await page.click('[aria-label="Abrir menu"]');
  await page.waitForSelector('[aria-label="Fechar menu"]', { timeout: 8000 });

  const locked = await page.evaluate(() => ({
    bodyOverscroll: document.body.style.overscrollBehavior,
    hamburgerOpen: Boolean(document.querySelector('[aria-label="Fechar menu"]')),
  }));
  record(
    "resize:menu-open-on-mobile",
    locked.hamburgerOpen === true && locked.bodyOverscroll === "none",
    locked,
  );

  await page.setViewport({ width: 1280, height: 800 });
  await page.waitForFunction(
    () =>
      document.querySelector('[aria-label="Fechar menu"]') === null &&
      document.body.style.overscrollBehavior !== "none",
    { timeout: 5000 },
  );

  const afterResize = await page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    const hamburger = document.querySelector(
      '[aria-label="Abrir menu"], [aria-label="Fechar menu"]',
    );
    return {
      hamburgerHidden:
        !hamburger ||
        (hamburger instanceof HTMLElement && hamburger.offsetParent === null),
      panelInert: panel?.inert === true || panel?.hasAttribute("inert"),
      bodyOverscroll: document.body.style.overscrollBehavior,
    };
  });
  record(
    "resize-to-desktop:overflow-restored",
    afterResize.bodyOverscroll !== "none",
    afterResize,
  );
  record(
    "resize-to-desktop:mobile-nav-hidden",
    afterResize.hamburgerHidden === true,
    afterResize,
  );
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

  for (const viewport of VIEWPORTS) {
    await inspectViewport(page, viewport);
  }
  await inspectDesktopAfterMobileOpen(page);
  await inspectDesktop(page);
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
