/**
 * Verificação: métricas do Case Study do Organizer.
 * node verify-organizer-case-metrics.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  withAuditBrowser,
} from "./mobile-nav-audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const PAGE_PATH = "/produtos/organizer";
const MIN_VALUE_GAP = 8;
const SM_MIN_WIDTH = 640;

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "396", width: 396, height: 852 },
  { name: "414", width: 414, height: 896 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

function readCaseStudyMetrics() {
  function roundBox(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    };
  }

  function readElementText(element) {
    const text = element.textContent;
    if (typeof text !== "string") {
      return "";
    }
    return text.replace(/\s+/g, " ").trim();
  }

  const card = document.querySelector("[data-organizer-case-study-card]");
  const row = document.querySelector("[data-organizer-case-study-indicators]");
  if (!(card instanceof HTMLElement) || !(row instanceof HTMLElement)) {
    return null;
  }

  const items = [];
  for (const item of row.children) {
    if (!(item instanceof HTMLElement)) {
      continue;
    }
    const value = item.children.item(0);
    const label = item.children.item(1);
    if (!(value instanceof HTMLElement) || !(label instanceof HTMLElement)) {
      continue;
    }
    const valueBox = roundBox(value);
    const range = document.createRange();
    range.selectNodeContents(value);
    const textBox = range.getBoundingClientRect();
    items.push({
      valueText: readElementText(value),
      labelText: readElementText(label),
      valueLeft: valueBox.left,
      valueRight: Math.round(textBox.right),
      valueTop: valueBox.top,
      valueHeight: valueBox.height,
      valueLineHeight: Number.parseFloat(getComputedStyle(value).lineHeight),
      fontSize: Number.parseFloat(getComputedStyle(value).fontSize),
      labelTop: roundBox(label).top,
      whiteSpace: getComputedStyle(value).whiteSpace,
    });
  }

  if (items.length !== 3) {
    return null;
  }

  const cardBox = roundBox(card);
  return {
    values: items.map((item) => item.valueText),
    labels: items.map((item) => item.labelText),
    firstToSecondGap: items[1].valueLeft - items[0].valueRight,
    secondToThirdGap: items[2].valueLeft - items[1].valueRight,
    sameRow: Math.abs(items[0].valueTop - items[1].valueTop) <= 2 &&
      Math.abs(items[1].valueTop - items[2].valueTop) <= 2,
    labelsBelow: items.every((item) => item.labelTop >= item.valueTop),
    firstNowrap: items[0].whiteSpace === "nowrap",
    firstSingleLine: items[0].valueLineHeight > 0
      ? items[0].valueHeight <= items[0].valueLineHeight + 2
      : false,
    fontSizes: items.map((item) => item.fontSize),
    cardRight: cardBox.right,
    cardOverflow: card.scrollWidth > card.clientWidth + 1,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  };
}

function recordCaseStudyAssertions(viewport, metrics) {
  const label = viewport.name;
  record(`${label}:three-side-by-side`, metrics.sameRow === true, {
    sameRow: metrics.sameRow,
  });
  record(
    `${label}:complete-values`,
    metrics.values[0] === "98,52%" &&
      metrics.values[1] === "94k" &&
      metrics.values[2] === "330k" &&
      metrics.firstNowrap === true &&
      metrics.firstSingleLine === true,
    {
      values: metrics.values,
      firstNowrap: metrics.firstNowrap,
      firstSingleLine: metrics.firstSingleLine,
    },
  );
  record(
    `${label}:visible-gaps`,
    metrics.firstToSecondGap >= MIN_VALUE_GAP &&
      metrics.secondToThirdGap >= MIN_VALUE_GAP,
    {
      firstToSecondGap: metrics.firstToSecondGap,
      secondToThirdGap: metrics.secondToThirdGap,
    },
  );
  record(`${label}:labels-below`, metrics.labelsBelow === true, {
    labels: metrics.labels,
  });
  record(
    `${label}:no-overflow`,
    metrics.cardOverflow === false &&
      metrics.cardRight <= metrics.viewportWidth + 1,
    {
      cardOverflow: metrics.cardOverflow,
      cardRight: metrics.cardRight,
      viewportWidth: metrics.viewportWidth,
    },
  );

  const sameScale =
    Math.abs(metrics.fontSizes[0] - metrics.fontSizes[1]) <= 0.5 &&
    Math.abs(metrics.fontSizes[1] - metrics.fontSizes[2]) <= 0.5;
  record(`${label}:consistent-scale`, sameScale, {
    fontSizes: metrics.fontSizes,
  });

  if (viewport.width >= SM_MIN_WIDTH) {
    record(
      `${label}:desktop-size`,
      metrics.fontSizes.every((size) => Math.abs(size - 30) <= 0.5),
      { fontSizes: metrics.fontSizes },
    );
  } else {
    record(
      `${label}:mobile-size`,
      metrics.fontSizes[0] >= 19.5 && metrics.fontSizes[0] <= 30,
      { fontSizes: metrics.fontSizes },
    );
  }
}

try {
  await withAuditBrowser(async (page) => {
    await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector("[data-organizer-case-study-indicators]", {
      timeout: 15000,
    });
    await page.evaluate(() => document.fonts.ready);

    for (const viewport of VIEWPORTS) {
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
      });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(readCaseStudyMetrics);
      if (!metrics) {
        record(`${viewport.name}:metrics`, false, "missing-nodes");
        continue;
      }
      recordCaseStudyAssertions(viewport, metrics);
    }
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
