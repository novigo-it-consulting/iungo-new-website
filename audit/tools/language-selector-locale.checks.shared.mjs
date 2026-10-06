/**
 * Troca de idioma pela URL: EN entra com prefixo, PT volta sem prefixo.
 */
import { gotoAuditPage, setAuditViewport } from "./audit.shared.mjs";
import {
  DESKTOP_OPTION_EN,
  DESKTOP_OPTION_PT,
  MOBILE_OPTION_EN,
  MOBILE_OPTION_PT,
} from "./language-selector-audit.selectors.shared.mjs";
import {
  clickMenuToggle,
  clickMobileSelector,
  waitForMenuExpanded,
} from "./language-selector-audit.measure.shared.mjs";
import { openDesktopList } from "./language-selector-desktop.checks.shared.mjs";

const ORGANIZER_PATH = "/produtos/organizer";
const ORGANIZER_EN_PATH = "/en/produtos/organizer";

async function readHeaderLanguage(page) {
  return page.evaluate(() => ({
    lang: document.documentElement.lang,
    path: window.location.pathname,
    solutions:
      document.querySelector('[data-header-nav-item="solucoes"]')?.textContent?.trim() ??
      "",
    demo:
      document
        .querySelector('[data-header-action-label="demonstration"]')
        ?.textContent?.trim() ?? "",
  }));
}

async function chooseLanguage(page, viewport, code) {
  const isMobile = viewport.width < 1280;
  const option =
    code === "en"
      ? isMobile
        ? MOBILE_OPTION_EN
        : DESKTOP_OPTION_EN
      : isMobile
        ? MOBILE_OPTION_PT
        : DESKTOP_OPTION_PT;

  if (isMobile) {
    await clickMenuToggle(page);
    await waitForMenuExpanded(page, true);
    await clickMobileSelector(page);
  } else {
    await openDesktopList(page);
  }

  await page.waitForSelector(option, { timeout: 5000 });
  await Promise.all([
    page.waitForFunction(
      (expectedPath) => window.location.pathname === expectedPath,
      { timeout: 15000 },
      code === "en" ? ORGANIZER_EN_PATH : ORGANIZER_PATH,
    ),
    page.click(option),
  ]);
}

export async function checkLocaleSwitch(page, viewport, record) {
  await setAuditViewport(page, viewport);
  await gotoAuditPage(page, ORGANIZER_PATH);
  await page.waitForSelector("[data-header]", { timeout: 10000 });

  await chooseLanguage(page, viewport, "en");
  const english = await readHeaderLanguage(page);
  record(
    `${viewport.name}-switch-to-en`,
    english.lang === "en" &&
      english.path === ORGANIZER_EN_PATH &&
      english.solutions === "Solutions" &&
      english.demo === "Request a demo",
    english,
  );

  await chooseLanguage(page, viewport, "pt-BR");
  const portuguese = await readHeaderLanguage(page);
  record(
    `${viewport.name}-switch-back-to-pt`,
    portuguese.lang === "pt-BR" &&
      portuguese.path === ORGANIZER_PATH &&
      portuguese.solutions === "Soluções" &&
      portuguese.demo === "Solicitar Demonstração",
    portuguese,
  );
}
