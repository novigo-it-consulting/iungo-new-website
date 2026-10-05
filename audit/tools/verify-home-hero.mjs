/**
 * Verificação: Hero da Home (botões, imagem e título).
 * node verify-home-hero.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  withAuditBrowser,
} from "./audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const DEMO_HREF = "/solicitar-demonstracao";
const XL_MIN_WIDTH = 1280;

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

function readHeroMetrics(demoHref) {
  function roundBox(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }

  const section = document.querySelector("[data-hero-section]");
  const title = document.querySelector("[data-hero-title]");
  const description = document.querySelector("[data-hero-description]");
  const visual = document.querySelector("[data-hero-visual]");
  const actions = document.querySelector("[data-hero-actions]");

  if (
    !(section instanceof HTMLElement) ||
    !(title instanceof HTMLElement) ||
    !(description instanceof HTMLElement) ||
    !(visual instanceof HTMLElement) ||
    !(actions instanceof HTMLElement)
  ) {
    return null;
  }

  let demo = null;
  for (const candidate of actions.querySelectorAll("a")) {
    if (
      candidate instanceof HTMLAnchorElement &&
      candidate.getAttribute("href") === demoHref
    ) {
      demo = candidate;
      break;
    }
  }

  const platform = actions.querySelector("[data-hero-secondary-cta]");
  const image = visual.querySelector("img");

  if (!(demo instanceof HTMLElement) || !(platform instanceof HTMLElement)) {
    return null;
  }

  const titleBox = roundBox(title);
  const descriptionBox = roundBox(description);
  const visualBox = roundBox(visual);
  const actionsBox = roundBox(actions);
  const demoBox = roundBox(demo);
  const platformBox = roundBox(platform);
  const imageBox = image instanceof HTMLElement ? roundBox(image) : null;
  const titleStyles = getComputedStyle(title);
  const demoStyles = getComputedStyle(demo);
  const platformStyles = getComputedStyle(platform);
  const titleLineWraps = [];
  let titleLineCount = 0;

  for (const element of title.querySelectorAll(".home-hero-title-line")) {
    if (!(element instanceof HTMLElement)) {
      continue;
    }
    const lineHeight = Number.parseFloat(getComputedStyle(element).lineHeight);
    const height = element.getBoundingClientRect().height;
    const wraps = lineHeight > 0 ? Math.round(height / lineHeight) : 0;
    titleLineWraps.push(wraps);
    titleLineCount += wraps;
  }

  return {
    titleTop: titleBox.top,
    descriptionTop: descriptionBox.top,
    descriptionBottom: descriptionBox.bottom,
    visualTop: visualBox.top,
    visualBottom: visualBox.bottom,
    actionsTop: actionsBox.top,
    descriptionToActions: actionsBox.top - descriptionBox.bottom,
    demoLeft: demoBox.left,
    platformLeft: platformBox.left,
    demoTop: demoBox.top,
    platformTop: platformBox.top,
    demoHeight: demoBox.height,
    platformHeight: platformBox.height,
    demoWidth: demoBox.width,
    platformWidth: platformBox.width,
    demoText: (demo.textContent ?? "").replace(/\s+/g, " ").trim(),
    platformText: (platform.textContent ?? "").replace(/\s+/g, " ").trim(),
    demoOverflow: demo.scrollWidth > demo.clientWidth + 1,
    platformOverflow: platform.scrollWidth > platform.clientWidth + 1,
    demoEllipsis: demoStyles.textOverflow === "ellipsis",
    platformEllipsis: platformStyles.textOverflow === "ellipsis",
    sameRow: Math.abs(demoBox.top - platformBox.top) <= 2,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    titleFontSize: titleStyles.fontSize,
    titleLineCount,
    titleLineWraps,
    imageWidth: imageBox ? imageBox.width : 0,
    imageHeight: imageBox ? imageBox.height : 0,
    visualAspect:
      visualBox.height > 0
        ? Number((visualBox.width / visualBox.height).toFixed(2))
        : 0,
  };
}

function recordHeroAssertions(viewport, metrics) {
  const isDesktop = viewport.width >= XL_MIN_WIDTH;

  if (isDesktop) {
    record(
      `${viewport.name}:title-then-description`,
      metrics.titleTop <= metrics.descriptionTop,
      {
        titleTop: metrics.titleTop,
        descriptionTop: metrics.descriptionTop,
      },
    );
    record(
      `${viewport.name}:description-to-buttons-65`,
      metrics.descriptionToActions === 65,
      {
        descriptionBottom: metrics.descriptionBottom,
        actionsTop: metrics.actionsTop,
        descriptionToActions: metrics.descriptionToActions,
      },
    );
  } else {
    record(
      `${viewport.name}:title-then-description-then-image`,
      metrics.titleTop <= metrics.descriptionTop &&
        metrics.descriptionTop <= metrics.visualTop,
      metrics,
    );
    record(
      `${viewport.name}:image-before-buttons`,
      metrics.visualBottom <= metrics.actionsTop + 1,
      {
        visualBottom: metrics.visualBottom,
        actionsTop: metrics.actionsTop,
      },
    );
  }
  record(
    `${viewport.name}:buttons-side-by-side`,
    metrics.sameRow === true && metrics.demoLeft < metrics.platformLeft,
    {
      sameRow: metrics.sameRow,
      demoLeft: metrics.demoLeft,
      platformLeft: metrics.platformLeft,
    },
  );
  record(
    `${viewport.name}:full-labels`,
    metrics.demoText === "Solicitar Demonstração" &&
      metrics.platformText === "Conhecer a Plataforma" &&
      metrics.demoOverflow === false &&
      metrics.platformOverflow === false &&
      metrics.demoEllipsis === false &&
      metrics.platformEllipsis === false,
    {
      demoText: metrics.demoText,
      platformText: metrics.platformText,
      demoOverflow: metrics.demoOverflow,
      platformOverflow: metrics.platformOverflow,
    },
  );

  let equalTouchHeight =
    metrics.demoHeight === metrics.platformHeight && metrics.demoHeight >= 55;
  if (isDesktop) {
    equalTouchHeight = metrics.demoHeight >= 41 && metrics.platformHeight >= 41;
  }

  record(`${viewport.name}:equal-touch-height`, equalTouchHeight, {
    demoHeight: metrics.demoHeight,
    platformHeight: metrics.platformHeight,
  });
  record(
    `${viewport.name}:no-horizontal-scroll`,
    metrics.pageWidth <= metrics.viewportWidth + 1,
    {
      pageWidth: metrics.pageWidth,
      viewportWidth: metrics.viewportWidth,
    },
  );
  record(
    `${viewport.name}:image-proportional`,
    metrics.imageHeight > 0 && Math.abs(metrics.visualAspect - 1.5) <= 0.08,
    {
      visualAspect: metrics.visualAspect,
      imageWidth: metrics.imageWidth,
      imageHeight: metrics.imageHeight,
    },
  );

  const titleSize = Number.parseFloat(metrics.titleFontSize);
  let titleSizeOk = titleSize >= 42;
  if (viewport.width < 640) {
    titleSizeOk = titleSize <= 40 && titleSize >= 24;
  } else if (viewport.width < XL_MIN_WIDTH) {
    titleSizeOk = titleSize >= 44;
  }

  const titleLinesOk =
    viewport.width < 360
      ? metrics.titleLineCount <= 4
      : metrics.titleLineCount === 3;

  record(`${viewport.name}:compact-title`, titleSizeOk && titleLinesOk, {
    titleFontSize: metrics.titleFontSize,
    titleLineCount: metrics.titleLineCount,
    titleLineWraps: metrics.titleLineWraps,
  });
}

async function inspectHero(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(AUDIT_BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForSelector("[data-hero-section]", { timeout: 10000 });

  const metrics = await page.evaluate(readHeroMetrics, DEMO_HREF);

  if (!metrics) {
    record(`${viewport.name}:hero`, false, "missing-nodes");
    return;
  }

  recordHeroAssertions(viewport, metrics);
}

try {
  await withAuditBrowser(async (page) => {
    for (const viewport of VIEWPORTS) {
      await inspectHero(page, viewport);
    }
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
