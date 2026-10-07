/**
 * Verificação: Hero mobile das páginas de produtos (imagem acima do botão).
 * node verify-product-hero.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { recordProductHeroAssertions } from "./product-hero.checks.shared.mjs";
import {
  buildProductHeroMetrics,
  readProductHeroRaw,
} from "./product-hero.measure.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const PRODUCTS = [
  { slug: "organizer", path: "/produtos/organizer" },
  { slug: "attendant", path: "/produtos/attendant" },
  { slug: "behavior", path: "/produtos/behavior" },
  { slug: "concierge", path: "/produtos/concierge" },
  { slug: "convert", path: "/produtos/convert" },
  { slug: "iot", path: "/produtos/iot" },
  { slug: "resolve", path: "/produtos/resolve" },
];

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "480", width: 480, height: 800 },
  { name: "768", width: 768, height: 1024 },
  { name: "1023", width: 1023, height: 900 },
  { name: "1024", width: 1024, height: 900 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

async function inspectProductViewport(page, product, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  const raw = await page.evaluate(readProductHeroRaw, product.slug);
  const metrics = raw ? buildProductHeroMetrics(raw) : null;
  if (!metrics) {
    record(`${product.slug}@${viewport.name}:hero`, false, "missing-nodes");
    return;
  }
  recordProductHeroAssertions(record, product.slug, viewport, metrics);
}

async function inspectProduct(page, product) {
  await page.goto(`${AUDIT_BASE_URL}${product.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForSelector(`[data-${product.slug}-hero-section]`, { timeout: 15000 });
  await runSequentially(VIEWPORTS, (viewport) =>
    inspectProductViewport(page, product, viewport),
  );
}

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(PRODUCTS, (product) => inspectProduct(page, product));
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
