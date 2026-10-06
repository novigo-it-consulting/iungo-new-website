/**
 * Conferências da rolagem do menu mobile e do mega menu desktop.
 */
export function isCollapsedBannerValid(collapsed) {
  if (collapsed?.solucoesOpen !== false) {
    return false;
  }
  const buttonsInsidePanel = collapsed.demoBottom <= collapsed.panelBottom + 1;
  if (buttonsInsidePanel) {
    return collapsed.gapBelowButtons >= 8 && collapsed.gapBelowButtons <= 80;
  }
  return collapsed.unusedViewport <= 1;
}

export function isCollapsedNotFullPage(collapsed, viewport) {
  if (!collapsed) {
    return false;
  }
  if (viewport.height < 500) {
    return true;
  }
  return collapsed.unusedViewport >= 80;
}

export function isEndReached(item) {
  return (
    Boolean(item) &&
    item.missing !== true &&
    item.fullyInViewport === true &&
    item.fullyInPanel === true &&
    item.clickable === true
  );
}

function recordScrollChrome(record, viewport, metrics) {
  record(
    `${viewport.name}:overflow-y`,
    metrics.overflowY === "auto" || metrics.overflowY === "scroll",
    metrics.overflowY,
  );
  record(
    `${viewport.name}:fits-viewport`,
    metrics.clientHeight <= viewport.height && metrics.panelBottom <= viewport.height + 1,
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
    metrics.scrollHeight > metrics.clientHeight - 1 || isEndReached(metrics.demo),
    { scrollHeight: metrics.scrollHeight, clientHeight: metrics.clientHeight, demo: metrics.demo },
  );
  record(`${viewport.name}:chrome-visible`, metrics.headerVisible === true && metrics.closeVisible === true, {
    headerVisible: metrics.headerVisible,
    closeVisible: metrics.closeVisible,
  });
}

function recordMenuItems(record, viewport, metrics) {
  record(`${viewport.name}:recursos-fully-visible`, isEndReached(metrics.recursos), metrics.recursos);
  record(`${viewport.name}:client-button-fully-visible`, isEndReached(metrics.client), metrics.client);
  record(`${viewport.name}:demo-button-fully-visible`, isEndReached(metrics.demo), metrics.demo);
  record(`${viewport.name}:descriptions-hidden`, metrics.descriptionsHidden && metrics.titlesPresent, {
    descriptionsHidden: metrics.descriptionsHidden,
    titlesPresent: metrics.titlesPresent,
    productCount: metrics.productCount,
    minCardHeight: metrics.minCardHeight,
  });
  record(`${viewport.name}:compact-touch`, metrics.minCardHeight >= 44 && metrics.minCardHeight <= 80, metrics.minCardHeight);
  record(`${viewport.name}:category-subtitles-hidden`, metrics.categorySubtitlesHidden, metrics.categorySubtitlesHidden);
  record(`${viewport.name}:view-links-hidden`, metrics.viewLinksHidden, metrics.viewLinksHidden);
  record(`${viewport.name}:product-dividers`, metrics.dividersOk, metrics.dividersOk);
}

function recordPageLock(record, viewport, metrics) {
  record(`${viewport.name}:no-horizontal-scroll`, metrics.hasHorizontalPageScroll === false, metrics.hasHorizontalPageScroll);
  record(`${viewport.name}:page-locked-while-open`, metrics.bodyOverscroll === "none", {
    body: metrics.bodyOverflow,
    html: metrics.htmlOverflow,
    overscroll: metrics.bodyOverscroll,
  });
}

export function recordExpandedMetrics(record, viewport, metrics) {
  recordScrollChrome(record, viewport, metrics);
  recordMenuItems(record, viewport, metrics);
  recordPageLock(record, viewport, metrics);
}

export function recordFullyVisibleGroup(record, name, countKey, visibleKey, mega) {
  const total = mega ? mega[countKey] : 0;
  const visible = mega ? mega[visibleKey] : 0;
  record(name, Boolean(mega && total > 0 && visible === total), mega);
}
