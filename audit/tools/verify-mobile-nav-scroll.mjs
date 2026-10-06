/**
 * Verificação: rolagem do menu mobile / Soluções.
 * node verify-mobile-nav-scroll.mjs  (dev server em AUDIT_BASE_URL)
 */
import { createResultRecorder, runSequentially, withAuditBrowser } from "./audit.shared.mjs";
import {
  inspectDesktop,
  inspectDesktopAfterMobileOpen,
  inspectViewport,
} from "./mobile-nav-scroll.interaction.checks.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "375x667", width: 375, height: 667 },
  { name: "393x852", width: 393, height: 852 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "390x320-landscape", width: 390, height: 320 },
];

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(VIEWPORTS, (viewport) => inspectViewport(page, record, viewport));
    await inspectDesktopAfterMobileOpen(page, record);
    await inspectDesktop(page, record);
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
