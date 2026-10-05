/**
 * Mede fonte e line-height dos títulos e subtítulos da Home.
 * node verify-home-section-titles.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  withAuditBrowser,
} from "./audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "396", width: 396, height: 852 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

const SELECTORS = {
  scaleProof: "[data-scale-proof-title]",
  metrics: "[data-metrics-heading]",
  products: "[data-products-heading]",
  cases: "[data-cases='title']",
  roi: "[data-roi='title']",
  homeHero: "[data-hero-title]",
  heroSubtitle: "[data-hero-description]",
  productsSubtitle: "[data-products-description]",
  roiSubtitle: "[data-roi='description']",
};

const COMPACT_TITLE = { fontSize: 24, lineHeight: 30 };
const COMPACT_TITLE_SM = { fontSize: 26, lineHeight: 32 };
const COMPACT_SUBTITLE = { fontSize: 15, lineHeight: 20 };

function compactTitleMetrics(width) {
  if (width >= 640) {
    return COMPACT_TITLE_SM;
  }
  return COMPACT_TITLE;
}

function expectedCenteredSectionTitle(width) {
  if (width >= 1280) {
    return { fontSize: 30, lineHeight: 72.7 };
  }
  return compactTitleMetrics(width);
}

function expectedCasesTitle(width) {
  if (width >= 1280) {
    return { fontSize: 30, lineHeight: 48 };
  }
  return compactTitleMetrics(width);
}

function expectedRoiTitle(width) {
  if (width >= 1280) {
    return { fontSize: 56, lineHeight: 60 };
  }
  return compactTitleMetrics(width);
}

function expectedSubtitle(width, desktop) {
  if (width >= 1280) {
    return desktop;
  }
  return COMPACT_SUBTITLE;
}

function matchesType(actual, expected) {
  if (!actual) {
    return false;
  }
  return (
    Math.abs(actual.fontSize - expected.fontSize) <= 0.2 &&
    Math.abs(actual.lineHeight - expected.lineHeight) <= 0.3 &&
    actual.overflowX === false
  );
}

function readTitleMetrics() {
  function metric(selector) {
    const node = document.querySelector(selector);
    if (!(node instanceof HTMLElement)) {
      return null;
    }
    const styles = getComputedStyle(node);
    const fontSize = Number.parseFloat(styles.fontSize);
    const lineHeight = Number.parseFloat(styles.lineHeight);
    return {
      fontSize: Math.round(fontSize * 10) / 10,
      lineHeight: Math.round(lineHeight * 10) / 10,
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
    };
  }

  return {
    scaleProof: metric("[data-scale-proof-title]"),
    metrics: metric("[data-metrics-heading]"),
    products: metric("[data-products-heading]"),
    cases: metric("[data-cases='title']"),
    roi: metric("[data-roi='title']"),
    homeHero: metric("[data-hero-title]"),
    heroSubtitle: metric("[data-hero-description]"),
    productsSubtitle: metric("[data-products-description]"),
    roiSubtitle: metric("[data-roi='description']"),
  };
}

try {
  await withAuditBrowser(async (page) => {
    await page.goto(AUDIT_BASE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector(SELECTORS.scaleProof, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);

    for (const viewport of VIEWPORTS) {
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
      });
      const metrics = await page.evaluate(readTitleMetrics);
      const centeredTitle = expectedCenteredSectionTitle(viewport.width);

      for (const key of ["scaleProof", "metrics", "products"]) {
        record(
          `${viewport.name}:${key}:title`,
          matchesType(metrics[key], centeredTitle),
          { expected: centeredTitle, actual: metrics[key] },
        );
      }

      const casesTitle = expectedCasesTitle(viewport.width);
      record(
        `${viewport.name}:cases:title`,
        matchesType(metrics.cases, casesTitle),
        { expected: casesTitle, actual: metrics.cases },
      );

      const roiTitle = expectedRoiTitle(viewport.width);
      record(
        `${viewport.name}:roi:title`,
        matchesType(metrics.roi, roiTitle),
        { expected: roiTitle, actual: metrics.roi },
      );

      const heroSubtitle = expectedSubtitle(viewport.width, {
        fontSize: 15.1,
        lineHeight: 30.3,
      });
      record(
        `${viewport.name}:hero:subtitle`,
        matchesType(metrics.heroSubtitle, heroSubtitle),
        { expected: heroSubtitle, actual: metrics.heroSubtitle },
      );

      const productsSubtitle = expectedSubtitle(viewport.width, {
        fontSize: 15.1,
        lineHeight: 30.3,
      });
      record(
        `${viewport.name}:products:subtitle`,
        matchesType(metrics.productsSubtitle, productsSubtitle),
        { expected: productsSubtitle, actual: metrics.productsSubtitle },
      );

      const roiSubtitle = expectedSubtitle(viewport.width, {
        fontSize: 18,
        lineHeight: 28,
      });
      record(
        `${viewport.name}:roi:subtitle`,
        matchesType(metrics.roiSubtitle, roiSubtitle),
        { expected: roiSubtitle, actual: metrics.roiSubtitle },
      );

      if (viewport.width < 640) {
        record(
          `${viewport.name}:home-hero-preserved`,
          Boolean(
            metrics.homeHero &&
              metrics.homeHero.fontSize >= 24 &&
              metrics.homeHero.fontSize <= 40,
          ),
          metrics.homeHero,
        );
      }
    }
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
