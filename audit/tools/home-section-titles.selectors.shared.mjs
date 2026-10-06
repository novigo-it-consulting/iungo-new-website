/**
 * Seletores e tamanhos esperados dos títulos da Home.
 */
export const HOME_SECTION_SELECTORS = {
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

export function expectedCenteredSectionTitle(width) {
  if (width >= 1280) {
    return { fontSize: 30, lineHeight: 72.7 };
  }
  return compactTitleMetrics(width);
}

export function expectedCasesTitle(width) {
  if (width >= 1280) {
    return { fontSize: 30, lineHeight: 48 };
  }
  return compactTitleMetrics(width);
}

export function expectedRoiTitle(width) {
  if (width >= 1280) {
    return { fontSize: 56, lineHeight: 60 };
  }
  return compactTitleMetrics(width);
}

export function expectedSubtitle(width, desktop) {
  if (width >= 1280) {
    return desktop;
  }
  return COMPACT_SUBTITLE;
}

export function matchesTitleType(actual, expected) {
  if (!actual) {
    return false;
  }
  return (
    Math.abs(actual.fontSize - expected.fontSize) <= 0.2 &&
    Math.abs(actual.lineHeight - expected.lineHeight) <= 0.3 &&
    actual.overflowX === false
  );
}
