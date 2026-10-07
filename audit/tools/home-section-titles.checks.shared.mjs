/**
 * Conferências dos títulos e subtítulos da Home.
 */
import {
  expectedCasesTitle,
  expectedCenteredSectionTitle,
  expectedRoiTitle,
  expectedSubtitle,
  matchesTitleType,
} from "./home-section-titles.selectors.shared.mjs";

function recordCenteredTitles(record, viewport, metrics) {
  const centeredTitle = expectedCenteredSectionTitle(viewport.width);
  for (const key of ["scaleProof", "metrics", "products"]) {
    record(`${viewport.name}:${key}:title`, matchesTitleType(metrics[key], centeredTitle), {
      expected: centeredTitle,
      actual: metrics[key],
    });
  }
}

function recordFeatureTitles(record, viewport, metrics) {
  const casesTitle = expectedCasesTitle(viewport.width);
  record(`${viewport.name}:cases:title`, matchesTitleType(metrics.cases, casesTitle), {
    expected: casesTitle,
    actual: metrics.cases,
  });

  const roiTitle = expectedRoiTitle(viewport.width);
  record(`${viewport.name}:roi:title`, matchesTitleType(metrics.roi, roiTitle), {
    expected: roiTitle,
    actual: metrics.roi,
  });
}

function recordSubtitles(record, viewport, metrics) {
  const sharedSubtitle = expectedSubtitle(viewport.width, {
    fontSize: 15.1,
    lineHeight: 30.3,
  });
  record(
    `${viewport.name}:hero:subtitle`,
    matchesTitleType(metrics.heroSubtitle, sharedSubtitle),
    { expected: sharedSubtitle, actual: metrics.heroSubtitle },
  );
  record(
    `${viewport.name}:products:subtitle`,
    matchesTitleType(metrics.productsSubtitle, sharedSubtitle),
    { expected: sharedSubtitle, actual: metrics.productsSubtitle },
  );

  const roiSubtitle = expectedSubtitle(viewport.width, {
    fontSize: 18,
    lineHeight: 28,
  });
  record(
    `${viewport.name}:roi:subtitle`,
    matchesTitleType(metrics.roiSubtitle, roiSubtitle),
    { expected: roiSubtitle, actual: metrics.roiSubtitle },
  );
}

export function recordHomeSectionTitles(record, viewport, metrics) {
  recordCenteredTitles(record, viewport, metrics);
  recordFeatureTitles(record, viewport, metrics);
  recordSubtitles(record, viewport, metrics);

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
