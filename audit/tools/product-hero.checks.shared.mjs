/**
 * Conferências do herói mobile e desktop das páginas de produto.
 */
const LG_MIN_WIDTH = 1024;

function recordDesktopHero(record, label, metrics) {
  record(`${label}:copy-left-of-image`, metrics.visualLeft >= metrics.contentRight - 8, {
    contentRight: metrics.contentRight,
    visualLeft: metrics.visualLeft,
  });
  record(`${label}:button-below-copy`, metrics.ctaTop >= metrics.contentBottom - 2, {
    contentBottom: metrics.contentBottom,
    ctaTop: metrics.ctaTop,
  });
  record(`${label}:button-left-aligned`, Math.abs(metrics.buttonLeft - metrics.contentLeft) <= 16, {
    buttonLeft: metrics.buttonLeft,
    contentLeft: metrics.contentLeft,
  });
}

function recordMobileHero(record, label, metrics) {
  record(
    `${label}:copy-then-image`,
    metrics.contentTop <= metrics.visualTop && metrics.contentBottom <= metrics.visualTop + 8,
    { contentBottom: metrics.contentBottom, visualTop: metrics.visualTop },
  );
  record(`${label}:image-before-button`, metrics.visualBottom <= metrics.ctaTop + 1, {
    visualBottom: metrics.visualBottom,
    ctaTop: metrics.ctaTop,
  });
  record(`${label}:button-centered`, metrics.buttonCenterOffset <= 12, {
    buttonCenterOffset: metrics.buttonCenterOffset,
    buttonLeft: metrics.buttonLeft,
    buttonWidth: metrics.buttonWidth,
  });
}

function recordSharedHero(record, label, viewport, metrics, isDesktop) {
  const minTouch = isDesktop && viewport.width >= 1280 ? 41 : 44;
  record(`${label}:touch-target`, metrics.buttonHeight >= minTouch, {
    buttonHeight: metrics.buttonHeight,
    minTouch,
  });
  record(
    `${label}:full-label`,
    metrics.buttonText === "Solicitar Demonstração" &&
      metrics.buttonOverflow === false &&
      metrics.buttonEllipsis === false,
    { buttonText: metrics.buttonText, buttonOverflow: metrics.buttonOverflow },
  );
  record(
    `${label}:hero-within-viewport`,
    metrics.sectionRight <= metrics.viewportWidth + 1 &&
      metrics.visualRight <= metrics.viewportWidth + 1 &&
      metrics.buttonRight <= metrics.viewportWidth + 1,
    {
      sectionRight: metrics.sectionRight,
      visualRight: metrics.visualRight,
      buttonRight: metrics.buttonRight,
      viewportWidth: metrics.viewportWidth,
    },
  );
  record(`${label}:image-visible`, metrics.imageWidth > 80 && metrics.imageHeight > 80, {
    imageWidth: metrics.imageWidth,
    imageHeight: metrics.imageHeight,
  });
}

export function recordProductHeroAssertions(record, slug, viewport, metrics) {
  const label = `${slug}@${viewport.name}`;
  const isDesktop = viewport.width >= LG_MIN_WIDTH;
  if (isDesktop) {
    recordDesktopHero(record, label, metrics);
  } else {
    recordMobileHero(record, label, metrics);
  }
  recordSharedHero(record, label, viewport, metrics, isDesktop);
}
