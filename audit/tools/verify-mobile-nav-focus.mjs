/**
 * Verifica se Tab/Shift+Tab ficam no menu mobile aberto (fundo inert).
 * node verify-mobile-nav-focus.mjs
 */
import { createResultRecorder, withAuditBrowser } from "./audit.shared.mjs";
import {
  inspectClosePaths,
  inspectHmr,
  inspectOpenMenu,
} from "./mobile-nav-focus.interaction.checks.shared.mjs";

const { record, printAndExit } = createResultRecorder();

try {
  await withAuditBrowser(async (page) => {
    const consoleMessages = [];
    page.on("console", (message) => {
      consoleMessages.push(message.text());
    });
    await inspectHmr(page, record, consoleMessages);
    await inspectOpenMenu(page, record);
    await inspectClosePaths(page, record, consoleMessages);
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
