/**
 * Seletor de idioma mobile: visível só com o menu aberto; lista não fecha o menu.
 * Viewports: 320, 375, 768 e 1440.
 * Executar com o dev server: node verify-language-selector-mobile.mjs
 */
import {
  createResultRecorder,
  round,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import {
  checkSharedStateAfterResize,
  runMobileViewport,
} from "./language-selector-mobile.interaction.checks.shared.mjs";

const VIEWPORTS = [
  { name: "320", width: 320, height: 800, isMobile: true, expectedLogo: 107 },
  { name: "375", width: 375, height: 800, isMobile: true, expectedLogo: 130 },
  { name: "768", width: 768, height: 800, isMobile: true, expectedLogo: 145 },
  { name: "1440", width: 1440, height: 900, isMobile: false, expectedLogo: 150 },
];

const { record, results } = createResultRecorder();
const measurements = [];

try {
  await withAuditBrowser(async (page) => {
    const pageErrors = [];
    page.on("pageerror", (error) => {
      pageErrors.push(String(error));
    });
    await runSequentially(VIEWPORTS, (viewport) =>
      runMobileViewport(page, viewport, { record, measurements }),
    );
    await checkSharedStateAfterResize(page, record);
    record("home-no-pageerror", pageErrors.length === 0, pageErrors);
  });

  console.log(
    JSON.stringify(
      {
        measurements: measurements.map((item) => ({
          viewport: item.viewport,
          logo: item.logo
            ? { width: round(item.logo.width), x: round(item.logo.x), y: round(item.logo.y) }
            : null,
          toggle: item.toggle
            ? { width: round(item.toggle.width), x: round(item.toggle.x), y: round(item.toggle.y) }
            : null,
          selector: item.selector
            ? { width: round(item.selector.width), x: round(item.selector.x) }
            : null,
          mobileSelectorInDom: item.mobileSelectorInDom,
          menuExpanded: item.menuExpanded,
          pageOverflowX: round(item.pageOverflowX),
        })),
        results,
      },
      null,
      2,
    ),
  );

  const failed = results.filter((item) => !item.pass);
  if (failed.length > 0) {
    console.error("FAILED", JSON.stringify(failed, null, 2));
    process.exit(1);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
