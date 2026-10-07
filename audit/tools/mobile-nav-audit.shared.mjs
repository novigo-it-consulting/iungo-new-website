/**
 * Helpers específicos do menu mobile.
 */
export const OPEN_MENU_SELECTOR = '[aria-label="Abrir menu"]';
export const CLOSE_MENU_SELECTOR = '[aria-label="Fechar menu"]';
export const MOBILE_MENU_SELECTOR = "#mobile-navigation-menu";
export const MOBILE_NAV_ROOT_SELECTOR = "[data-mobile-navigation]";

export async function openAuditMobileMenu(page) {
  const hamburgerReady = await page
    .waitForFunction(
      () => {
        const hamburger = document.querySelector('[aria-label="Abrir menu"]');
        return hamburger instanceof HTMLElement && hamburger.offsetParent !== null;
      },
      { timeout: 10000 },
    )
    .catch(() => null);

  if (!hamburgerReady) {
    return false;
  }

  await page.click(OPEN_MENU_SELECTOR);
  const opened = await page
    .waitForSelector(CLOSE_MENU_SELECTOR, {
      visible: true,
      timeout: 8000,
    })
    .catch(() => null);

  if (!opened) {
    await page.click(OPEN_MENU_SELECTOR);
    await page.waitForSelector(CLOSE_MENU_SELECTOR, {
      visible: true,
      timeout: 8000,
    });
  }

  return true;
}
