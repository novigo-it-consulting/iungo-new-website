/**
 * Overflow horizontal e botões/selos/pílulas que crescem de altura em EN/ES.
 * node audit/tools/verify-layout-overflow.mjs
 */
import {
  createResultRecorder,
  gotoAuditPage,
  runSequentially,
  setAuditViewport,
  withAuditBrowser,
} from "./audit.shared.mjs";
import {
  LAYOUT_LOCALES,
  LAYOUT_ROUTES,
  LAYOUT_WIDTHS,
  ORGANIZER_EXTRA_WIDTHS,
  compareControlHeights,
  layoutJobKey,
  layoutPath,
} from "./layout-overflow.checks.shared.mjs";

const { record, printAndExit } = createResultRecorder();

function readLayoutSnapshot() {
  const root = document.documentElement;
  const overflow = root.scrollWidth > root.clientWidth + 1;
  const controls = {};
  const selector = "button, a, [class*='rounded-full'], [class*='rounded-[64']";

  for (const element of document.querySelectorAll(selector)) {
    const rect = element.getBoundingClientRect();
    if (rect.height < 1) {
      continue;
    }

    const className = typeof element.className === "string" ? element.className : "";
    const key = `${element.tagName}|${className}`;
    const group = controls[key] ?? [];
    group.push({
      height: Math.round(rect.height),
      text: (element.innerText || "").replace(/\s+/g, " ").trim().slice(0, 80),
    });
    controls[key] = group;
  }

  return { overflow, controls };
}

const jobs = [
  ...LAYOUT_ROUTES.flatMap((route) =>
    LAYOUT_WIDTHS.flatMap((width) =>
      LAYOUT_LOCALES.map((locale) => ({ route, width, locale })),
    ),
  ),
  ...ORGANIZER_EXTRA_WIDTHS.flatMap((width) =>
    LAYOUT_LOCALES.map((locale) => ({
      route: "/produtos/organizer",
      width,
      locale,
    })),
  ),
];

await withAuditBrowser(async (page) => {
  const baseline = new Map();

  await runSequentially(jobs, async (job) => {
    await setAuditViewport(page, { width: job.width, height: 900 });
    await gotoAuditPage(page, layoutPath(job.locale.prefix, job.route));
    const snapshot = await page.evaluate(readLayoutSnapshot);
    const key = layoutJobKey(job.route, job.width);

    if (job.locale.id === "pt-BR") {
      baseline.set(key, snapshot);
      record(`overflow ${job.locale.id} ${key}`, !snapshot.overflow);
      return;
    }

    const source = baseline.get(key);
    const grown = compareControlHeights(source?.controls ?? {}, snapshot.controls);
    record(`overflow ${job.locale.id} ${key}`, !snapshot.overflow);
    record(
      `height ${job.locale.id} ${key}`,
      grown.length === 0,
      grown.length === 0 ? undefined : grown,
    );
  });
});

printAndExit();
