/**
 * Verificação: margens laterais da página Solicitar Demonstração.
 * node verify-request-demo-gutters.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { recordGutterAssertions } from "./request-demo-gutters.checks.shared.mjs";
import { inspectFormStates } from "./request-demo-gutters.interaction.checks.shared.mjs";
import {
  buildGutterMetrics,
  readContactCards,
  readGutterLayout,
} from "./request-demo-gutters.measure.shared.mjs";
import { REQUEST_DEMO_SELECTORS } from "./request-demo-gutters.selectors.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const PAGE_PATH = "/solicitar-demonstracao";
const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "396", width: 396, height: 852 },
  { name: "480", width: 480, height: 1040 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

async function inspectGutterViewport(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  const raw = await page.evaluate(readGutterLayout, REQUEST_DEMO_SELECTORS);
  if (!raw) {
    record(`${viewport.name}:layout`, false, "missing-nodes");
    return;
  }
  const contacts = await page.evaluate(readContactCards, REQUEST_DEMO_SELECTORS.contactCard);
  const metrics = buildGutterMetrics(raw, contacts);
  recordGutterAssertions(record, viewport, metrics);
  if (viewport.width === 396) {
    await inspectFormStates(page, record, viewport.name);
  }
}

try {
  await withAuditBrowser(async (page) => {
    await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector(REQUEST_DEMO_SELECTORS.frame, { timeout: 15000 });
    await runSequentially(VIEWPORTS, (viewport) => inspectGutterViewport(page, viewport));
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
