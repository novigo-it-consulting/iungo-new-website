/**
 * Compara o texto visível de /en e /es com o pt-BR nas 9 rotas.
 * node audit/tools/verify-untranslated-copy.mjs
 */
import {
  createResultRecorder,
  gotoAuditPage,
  runSequentially,
  setAuditViewport,
  withAuditBrowser,
} from "./audit.shared.mjs";
import {
  COPY_LOCALES,
  COPY_ROUTES,
  identicalPortuguese,
  localePath,
} from "./untranslated-copy.checks.shared.mjs";

const { record, printAndExit } = createResultRecorder();

function readVisibleText() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const texts = [];

  while (walker.nextNode()) {
    const parent = walker.currentNode.parentElement;
    const value = walker.currentNode.textContent.replace(/\s+/g, " ").trim();
    if (!parent || !value || parent.closest("script, style, noscript")) {
      continue;
    }

    const style = getComputedStyle(parent);
    if (style.display === "none" || style.visibility === "hidden") {
      continue;
    }

    texts.push(value);
  }

  return texts;
}

const jobs = COPY_ROUTES.flatMap((route) =>
  COPY_LOCALES.map((locale) => ({ route, locale })),
);

await withAuditBrowser(async (page) => {
  await setAuditViewport(page, { width: 1280, height: 900 });
  const byRoute = new Map();

  await runSequentially(jobs, async (job) => {
    await gotoAuditPage(page, localePath(job.locale.prefix, job.route));
    const texts = await page.evaluate(readVisibleText);
    const routeTexts = byRoute.get(job.route) ?? {};
    routeTexts[job.locale.id] = texts;
    byRoute.set(job.route, routeTexts);
  });

  for (const route of COPY_ROUTES) {
    const texts = byRoute.get(route);
    for (const locale of ["en", "es"]) {
      const findings = identicalPortuguese(texts["pt-BR"], texts[locale]);
      record(
        `${locale} ${route}`,
        findings.length === 0,
        findings.length === 0 ? undefined : findings,
      );
    }
  }
});

printAndExit();
