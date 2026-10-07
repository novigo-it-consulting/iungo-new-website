/**
 * Mede fonte e line-height dos títulos e subtítulos da Home.
 * node verify-home-section-titles.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { recordHomeSectionTitles } from "./home-section-titles.checks.shared.mjs";
import {
  readTitleNodes,
  roundTitleMetrics,
} from "./home-section-titles.measure.shared.mjs";
import { HOME_SECTION_SELECTORS } from "./home-section-titles.selectors.shared.mjs";

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

async function inspectHomeSectionViewport(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  const metrics = roundTitleMetrics(
    await page.evaluate(readTitleNodes, HOME_SECTION_SELECTORS),
  );
  recordHomeSectionTitles(record, viewport, metrics);
}

try {
  await withAuditBrowser(async (page) => {
    await page.goto(AUDIT_BASE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector(HOME_SECTION_SELECTORS.scaleProof, { timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);
    await runSequentially(VIEWPORTS, (viewport) =>
      inspectHomeSectionViewport(page, viewport),
    );
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
