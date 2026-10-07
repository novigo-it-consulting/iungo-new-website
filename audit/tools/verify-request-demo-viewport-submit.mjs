/**
 * Compara o formulário Solicitar Demonstração em várias larguras.
 * Intercepta o FormSubmit e devolve JSON de sucesso — sem e-mail real.
 */
import {
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import {
  installFormSubmitMock,
  submitAfterResize,
  submitViewport,
} from "./request-demo-viewport.interaction.checks.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const VIEWPORTS = [
  { name: "393", width: 393, height: 852 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

const RESIZE_SCENARIOS = [
  {
    prefix: "resize-393-to-1920",
    start: { width: 393, height: 852 },
    end: { width: 1920, height: 1080 },
    checkHoney: true,
  },
  {
    prefix: "resize-1920-to-393",
    start: { width: 1920, height: 1080 },
    end: { width: 393, height: 852 },
    checkHoney: false,
  },
];

function watchPageErrors(page, consoleErrors) {
  page.on("pageerror", (error) => {
    consoleErrors.push(String(error));
  });
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });
}

try {
  await withAuditBrowser(async (page) => {
    const captured = [];
    const consoleErrors = [];
    watchPageErrors(page, consoleErrors);
    await page.setRequestInterception(true);
    installFormSubmitMock(page, captured);
    await runSequentially(VIEWPORTS, (viewport) =>
      submitViewport(page, captured, consoleErrors, record, viewport),
    );
    await runSequentially(RESIZE_SCENARIOS, (scenario) =>
      submitAfterResize(page, captured, consoleErrors, record, scenario),
    );
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
