/**
 * Screenshots e fontes computadas.
 * readComputedFonts vai para page.evaluate.
 */
import path from "node:path";

import { AUDIT_BASE_URL } from "./audit.shared.mjs";
import { FONT_CAPTURES, routeSlug } from "./audit-browser.selectors.shared.mjs";

export function readComputedFonts(selectors) {
  return selectors.map((selector) => {
    const element = document.querySelector(selector);
    if (!element) {
      return { selector, found: false };
    }
    const style = getComputedStyle(element);
    return {
      selector,
      found: true,
      fontFamily: style.fontFamily,
      fontSize: style.fontSize,
    };
  });
}

export async function captureRouteViewport(page, shot, fontReport, screenshotLog, outDir) {
  await page.setViewport(shot.viewport);
  await page.goto(`${AUDIT_BASE_URL}${shot.route}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
  const fileName = `${routeSlug(shot.route)}-${shot.viewport.name}.png`;
  await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
  screenshotLog.push({ route: shot.route, viewport: shot.viewport.name, file: fileName });

  const fonts = FONT_CAPTURES.find(
    (item) => item.route === shot.route && item.viewport === shot.viewport.name,
  );
  if (!fonts) {
    return;
  }
  fontReport.push(...(await page.evaluate(readComputedFonts, fonts.selectors)));
}
