/**
 * O navegador só devolve medidas brutas. As contas ficam neste arquivo.
 */
import { runSequentially } from "./audit.shared.mjs";
import {
  readExpandedCards,
  readExpandedDisplays,
  readExpandedDividers,
  readExpandedPanel,
  readOneLabel,
} from "./mobile-nav-scroll.expanded.raw.shared.mjs";

const MENU_LABELS = ["Recursos", "Área do Cliente", "Solicitar Demonstração"];

export async function collectExpandedMenuRaw(page) {
  const panel = await page.evaluate(readExpandedPanel);
  if (!panel) {
    return null;
  }
  const labels = [];
  await runSequentially(MENU_LABELS, async (label) => {
    labels.push(await page.evaluate(readOneLabel, label));
  });
  const cards = await page.evaluate(readExpandedCards);
  const displays = await page.evaluate(readExpandedDisplays);
  const dividerLists = await page.evaluate(readExpandedDividers);
  if (!cards || !displays || !dividerLists) {
    return null;
  }
  return { ...panel, labels, ...cards, ...displays, dividerLists };
}

function roundReport(item, viewportHeight, panelTop, panelBottom) {
  if (item.missing) {
    return { missing: true };
  }
  return {
    missing: false,
    top: Math.round(item.top),
    bottom: Math.round(item.bottom),
    height: Math.round(item.height),
    fullyInViewport: item.top >= 0 && item.bottom <= viewportHeight + 1,
    fullyInPanel: item.top >= panelTop - 1 && item.bottom <= panelBottom + 1,
    clickable: item.clickable,
  };
}

function displaysAreNone(displays) {
  if (displays.length === 0) {
    return false;
  }
  for (const display of displays) {
    if (display !== "none") {
      return false;
    }
  }
  return true;
}

function dividersAreOk(lists) {
  for (const widths of lists) {
    if (!widths || widths.length === 0) {
      return false;
    }
    for (let index = 0; index < widths.length; index += 1) {
      const borderBottom = widths[index];
      const isLast = index === widths.length - 1;
      const borderOk = isLast ? borderBottom === 0 : borderBottom > 0;
      if (!borderOk) {
        return false;
      }
    }
  }
  return true;
}

export function buildExpandedMetrics(raw) {
  const reports = [];
  for (const item of raw.labels) {
    reports.push(roundReport(item, raw.viewportHeight, raw.panelTop, raw.panelBottom));
  }
  const [recursos, client, demo] = reports;
  return {
    overflowY: raw.overflowY,
    overscroll: raw.overscroll,
    position: raw.position,
    top: raw.top,
    bottom: raw.bottom,
    clientHeight: raw.clientHeight,
    scrollHeight: raw.scrollHeight,
    scrollTop: raw.scrollTop,
    panelTop: Math.round(raw.panelTop),
    panelBottom: Math.round(raw.panelBottom),
    headerVisible: Boolean(
      raw.logoRect && raw.logoRect.bottom > 0 && raw.logoRect.top < raw.viewportHeight,
    ),
    closeVisible: raw.closeHeight !== null && raw.closeHeight > 0,
    recursos,
    client,
    demo,
    hasHorizontalPageScroll: raw.docWidth > raw.viewportWidth + 1,
    bodyOverflow: raw.bodyOverflow,
    htmlOverflow: raw.htmlOverflow,
    bodyOverscroll: raw.bodyOverscroll,
    descriptionsHidden: displaysAreNone(raw.descriptionDisplays),
    titlesPresent: raw.titlesPresent,
    minCardHeight: raw.minCardHeight === null ? null : Math.round(raw.minCardHeight),
    productCount: raw.productCount,
    categorySubtitlesHidden: displaysAreNone(raw.subtitleDisplays),
    viewLinksHidden: displaysAreNone(raw.viewDisplays),
    dividersOk: dividersAreOk(raw.dividerLists),
  };
}
