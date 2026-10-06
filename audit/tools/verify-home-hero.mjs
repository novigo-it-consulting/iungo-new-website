/**
 * Verificação: Hero da Home (botões, imagem e título).
 * node verify-home-hero.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { recordHeroAssertions } from "./home-hero.checks.shared.mjs";
import { buildHeroMetrics, readHeroRaw } from "./home-hero.measure.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const DEMO_HREF = "/solicitar-demonstracao";
const HERO_SECTION = "[data-hero-section]";

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

async function inspectHero(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(AUDIT_BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector(HERO_SECTION, { timeout: 10000 });
  const raw = await page.evaluate(readHeroRaw, DEMO_HREF);
  const metrics = raw ? buildHeroMetrics(raw) : null;
  if (!metrics) {
    record(`${viewport.name}:hero`, false, "missing-nodes");
    return;
  }
  recordHeroAssertions(record, viewport, metrics);
}

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(VIEWPORTS, (viewport) => inspectHero(page, viewport));
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
