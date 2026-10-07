/**
 * Conferências do herói da Home.
 */
const XL_MIN_WIDTH = 1280;

function recordHeroOrder(record, viewport, metrics) {
  const isDesktop = viewport.width >= XL_MIN_WIDTH;
  if (isDesktop) {
    record(`${viewport.name}:title-then-description`, metrics.titleTop <= metrics.descriptionTop, {
      titleTop: metrics.titleTop,
      descriptionTop: metrics.descriptionTop,
    });
    record(`${viewport.name}:description-to-buttons-65`, metrics.descriptionToActions === 65, {
      descriptionBottom: metrics.descriptionBottom,
      actionsTop: metrics.actionsTop,
      descriptionToActions: metrics.descriptionToActions,
    });
    return;
  }

  record(
    `${viewport.name}:title-then-description-then-image`,
    metrics.titleTop <= metrics.descriptionTop && metrics.descriptionTop <= metrics.visualTop,
    metrics,
  );
  record(`${viewport.name}:image-before-buttons`, metrics.visualBottom <= metrics.actionsTop + 1, {
    visualBottom: metrics.visualBottom,
    actionsTop: metrics.actionsTop,
  });
}

function recordHeroButtons(record, viewport, metrics) {
  const isDesktop = viewport.width >= XL_MIN_WIDTH;
  record(
    `${viewport.name}:buttons-side-by-side`,
    metrics.sameRow === true && metrics.demoLeft < metrics.platformLeft,
    { sameRow: metrics.sameRow, demoLeft: metrics.demoLeft, platformLeft: metrics.platformLeft },
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
}

function recordHeroFrame(record, viewport, metrics) {
  record(`${viewport.name}:no-horizontal-scroll`, metrics.pageWidth <= metrics.viewportWidth + 1, {
    pageWidth: metrics.pageWidth,
    viewportWidth: metrics.viewportWidth,
  });
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
    viewport.width < 360 ? metrics.titleLineCount <= 4 : metrics.titleLineCount === 3;
  record(`${viewport.name}:compact-title`, titleSizeOk && titleLinesOk, {
    titleFontSize: metrics.titleFontSize,
    titleLineCount: metrics.titleLineCount,
    titleLineWraps: metrics.titleLineWraps,
  });
}

export function recordHeroAssertions(record, viewport, metrics) {
  recordHeroOrder(record, viewport, metrics);
  recordHeroButtons(record, viewport, metrics);
  recordHeroFrame(record, viewport, metrics);
}
