/**
 * Mede o seletor de idioma do Header (1440 e 1920) e confere abrir/fechar.
 * Executar com o dev server: node verify-language-selector.mjs
 */
import {
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { runDesktopViewport } from "./language-selector-desktop.interaction.checks.shared.mjs";

const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];

const { record, results } = createResultRecorder();

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(VIEWPORTS, (viewport) =>
      runDesktopViewport(page, viewport, record),
    );
  });
  console.log(JSON.stringify(results, null, 2));
  if (results.some((item) => !item.pass)) {
    process.exit(1);
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}
