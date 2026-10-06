/**
 * Verificação: rolagem do menu mobile / Soluções.
 * node verify-mobile-nav-scroll.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL as BASE_URL,
  createResultRecorder,
  repeatUntil,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { openAuditMobileMenu } from "./mobile-nav-audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "375x667", width: 375, height: 667 },
  { name: "393x852", width: 393, height: 852 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x320-landscape", width: 390, height: 320 },
];

function isCollapsedBannerValid(collapsed) {
  if (collapsed?.solucoesOpen !== false) {
    return false;
  }

  const buttonsInsidePanel = collapsed.demoBottom <= collapsed.panelBottom + 1;
  if (buttonsInsidePanel) {
    return collapsed.gapBelowButtons >= 8 && collapsed.gapBelowButtons <= 80;
  }

  return collapsed.unusedViewport <= 1;
}

function isCollapsedNotFullPage(collapsed, viewport) {
  if (!collapsed) {
    return false;
  }

  if (viewport.height < 500) {
    return true;
  }

  return collapsed.unusedViewport >= 80;
}

function isEndReached(item) {
  return (
    Boolean(item) &&
    item.missing !== true &&
    item.fullyInViewport === true &&
    item.fullyInPanel === true &&
    item.clickable === true
  );
}

async function openMobileMenu(page, viewport) {
  const opened = await openAuditMobileMenu(page);
  if (!opened) {
    record(`${viewport.name}:hamburger`, false, "missing");
    return false;
  }
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
  return true;
}

async function measureCollapsedBanner(page) {
  return page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }

    const demo = [...panel.querySelectorAll("a, span")].find(
      (element) => element.textContent?.trim() === "Solicitar Demonstração",
    );
    if (!(demo instanceof HTMLElement)) {
      return null;
    }

    const group = document.querySelector("#mobile-solucoes-nav-group");
    const details = group ? group.closest("details") : null;
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
}

async function expandSolucoes(page) {
  await page.evaluate(() => {
    const group = document.querySelector("#mobile-solucoes-nav-group");
    const details = group ? group.closest("details") : null;
    if (details) {
      details.setAttribute("open", "");
    }

    const summary = document.querySelector("#mobile-navigation-menu summary");
    const summaryDetails = summary ? summary.closest("details") : null;
    if (
      summary instanceof HTMLElement &&
      summaryDetails instanceof HTMLDetailsElement &&
      !summaryDetails.open
    ) {
      summary.click();
    }
  });
}

async function readPanelBox(page) {
  return page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }
    const rect = panel.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: Math.min(
        rect.top + Math.max(rect.height / 2, 40),
        window.innerHeight - 24,
      ),
    };
  });
}

async function wheelPanel(page, panelBox, deltaY, stopAtTop) {
  await page.mouse.move(panelBox.x, panelBox.y);
  await new Promise((resolve) => setTimeout(resolve, 100));
  let previousScrollTop = -1;
  await repeatUntil(
    async (step) => {
      const scrollTop = await page.$eval(
        "#mobile-navigation-menu",
        (element) => element.scrollTop,
      );
      const reachedTop = stopAtTop && scrollTop === 0;
      const stuck = !stopAtTop && step > 0 && scrollTop === previousScrollTop;
      if (reachedTop || stuck) {
        return true;
      }
      previousScrollTop = scrollTop;
      await page.mouse.wheel({ deltaY });
      await new Promise((resolve) => setTimeout(resolve, 40));
      return false;
    },
    (done) => done === true,
    24,
  );
}

async function waitForPanelScrollEnd(page) {
  await page
    .waitForFunction(
      () => {
        const panel = document.getElementById("mobile-navigation-menu");
        if (!(panel instanceof HTMLElement)) {
          return false;
        }
        const maxScroll = panel.scrollHeight - panel.clientHeight;
        return maxScroll <= 1 || panel.scrollTop >= maxScroll - 2;
      },
      { timeout: 4000 },
    )
    .catch(() => {});
}

async function collectExpandedMetrics(page) {
  return page.evaluate(() => {
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
    const areDisplayNone = (nodes) =>
      nodes.length > 0 &&
      nodes.every(
        (node) =>
          node instanceof HTMLElement &&
          getComputedStyle(node).display === "none",
      );
    const categorySubtitles = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p"),
    ];
    const viewLinks = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]"),
    ];
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
      categorySubtitlesHidden: areDisplayNone(categorySubtitles),
      viewLinksHidden: areDisplayNone(viewLinks),
      dividersOk,
    };
  });
}

function recordExpandedMetrics(viewport, metrics) {
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
      isEndReached(metrics.demo),
    {
      scrollHeight: metrics.scrollHeight,
      clientHeight: metrics.clientHeight,
      demo: metrics.demo,
    },
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
    isEndReached(metrics.recursos),
    metrics.recursos,
  );
  record(
    `${viewport.name}:client-button-fully-visible`,
    isEndReached(metrics.client),
    metrics.client,
  );
  record(
    `${viewport.name}:demo-button-fully-visible`,
    isEndReached(metrics.demo),
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
    {
      body: metrics.bodyOverflow,
      html: metrics.htmlOverflow,
      overscroll: metrics.bodyOverscroll,
    },
  );
}

async function measureScrollBack(page) {
  return page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    const summary = panel ? panel.querySelector("summary") : null;
    if (!(panel instanceof HTMLElement) || !(summary instanceof HTMLElement)) {
      return { scrollTop: null, summaryVisible: false };
    }
    const rect = summary.getBoundingClientRect();
    return {
      scrollTop: panel.scrollTop,
      summaryVisible:
        rect.top >= panel.getBoundingClientRect().top - 1 &&
        rect.bottom <= window.innerHeight + 1,
    };
  });
}

async function closeMobileMenu(page) {
  await page.evaluate(() => {
    const group = document.querySelector("#mobile-solucoes-nav-group");
    const details = group ? group.closest("details") : null;
    if (details instanceof HTMLDetailsElement) {
      details.open = false;
      details.open = true;
    }
  });

  await page.click('[aria-label="Fechar menu"]');
  return page.evaluate(() => {
    const panel = document.getElementById("mobile-navigation-menu");
    const panelStyle = panel ? getComputedStyle(panel) : null;
    return {
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      bodyOverscroll: document.body.style.overscrollBehavior,
      pointerEvents: panelStyle ? panelStyle.pointerEvents : null,
      inert: Boolean(
        panel && (panel.inert === true || panel.hasAttribute("inert")),
      ),
      ariaHidden: panel ? panel.getAttribute("aria-hidden") : null,
    };
  });
}

async function inspectViewport(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  const opened = await openMobileMenu(page, viewport);
  if (!opened) {
    return;
  }

  const collapsed = await measureCollapsedBanner(page);
  record(
    `${viewport.name}:collapsed-banner-ends-after-buttons`,
    isCollapsedBannerValid(collapsed),
    collapsed,
  );
  record(
    `${viewport.name}:collapsed-not-full-page`,
    isCollapsedNotFullPage(collapsed, viewport),
    collapsed,
  );

  await expandSolucoes(page);

  const panelBox = await readPanelBox(page);
  if (!panelBox) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }

  await wheelPanel(page, panelBox, 600, false);
  await waitForPanelScrollEnd(page);

  const metrics = await collectExpandedMetrics(page);
  if (!metrics) {
    record(`${viewport.name}:panel`, false, "missing-panel");
    return;
  }

  recordExpandedMetrics(viewport, metrics);

  await wheelPanel(page, panelBox, -600, true);
  const backAtTop = await measureScrollBack(page);
  record(
    `${viewport.name}:scroll-back-to-start`,
    backAtTop.scrollTop === 0 && backAtTop.summaryVisible === true,
    backAtTop,
  );

  const afterClose = await closeMobileMenu(page);
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

function recordFullyVisibleGroup(name, countKey, visibleKey, mega) {
  const total = mega ? mega[countKey] : 0;
  const visible = mega ? mega[visibleKey] : 0;
  record(name, Boolean(mega && total > 0 && visible === total), mega);
}

async function inspectDesktop(page) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('[data-header-nav-item="solucoes"]', {
    visible: true,
    timeout: 10000,
  });
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
    visible: true,
    timeout: 8000,
  });
  const mega = await page.evaluate(() => {
    const panel = document.querySelector("[data-solucoes-mega-menu-panel]");
    if (!(panel instanceof HTMLElement)) {
      return null;
    }
    const styles = getComputedStyle(panel);
    const rect = panel.getBoundingClientRect();
    const isPainted = (node) =>
      node instanceof HTMLElement &&
      getComputedStyle(node).display !== "none" &&
      node.getBoundingClientRect().height > 0;
    const descriptions = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-product] p"),
    ];
    const visibleDescriptions = descriptions.filter(isPainted);
    const categorySubtitles = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p"),
    ];
    const visibleSubtitles = categorySubtitles.filter(isPainted);
    const viewLinks = [
      ...panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]"),
    ];
    const visibleViewLinks = viewLinks.filter(isPainted);
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
    Boolean(mega?.visible && mega?.withinViewport),
    mega,
  );
  recordFullyVisibleGroup(
    "desktop:product-descriptions-visible",
    "descriptionCount",
    "visibleDescriptionCount",
    mega,
  );
  recordFullyVisibleGroup(
    "desktop:category-subtitles-visible",
    "subtitleCount",
    "visibleSubtitleCount",
    mega,
  );
  recordFullyVisibleGroup(
    "desktop:view-links-visible",
    "viewLinkCount",
    "visibleViewLinkCount",
    mega,
  );
  record(
    "desktop:no-mobile-product-dividers",
    Boolean(mega) && mega.hasMobileDividers === false,
    mega,
  );
}

async function inspectDesktopAfterMobileOpen(page) {
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForFunction(
    () => {
      const hamburger = document.querySelector('[aria-label="Abrir menu"]');
      return hamburger instanceof HTMLElement && hamburger.offsetParent !== null;
    },
    { timeout: 10000 },
  );
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
      panelInert: Boolean(
        panel && (panel.inert === true || panel.hasAttribute("inert")),
      ),
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

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(VIEWPORTS, (viewport) => inspectViewport(page, viewport));
    await inspectDesktopAfterMobileOpen(page);
    await inspectDesktop(page);
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
