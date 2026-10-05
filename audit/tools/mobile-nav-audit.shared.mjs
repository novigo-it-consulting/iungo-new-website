/**
 * Helpers específicos do menu mobile.
 */
const OPEN_MENU_SELECTOR = '[aria-label="Abrir menu"]';
const CLOSE_MENU_SELECTOR = '[aria-label="Fechar menu"]';

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
