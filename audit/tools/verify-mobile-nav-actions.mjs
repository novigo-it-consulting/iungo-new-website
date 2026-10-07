/**
 * Verifica os botões de ação do menu mobile lado a lado.
 * node verify-mobile-nav-actions.mjs
 */
import {
  AUDIT_BASE_URL as BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";
import { openAuditMobileMenu } from "./mobile-nav-audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const VIEWPORTS = [
  { name: "320", width: 320, height: 640 },
  { name: "375", width: 375, height: 667 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
];

async function inspectViewport(page, viewport) {
  await page.setViewport({ width: viewport.width, height: viewport.height });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
  const opened = await openAuditMobileMenu(page);
  if (!opened) {
    record(`${viewport.name}:hamburger`, false, "missing");
    return;
  }

  const metrics = await page.evaluate(() => {
    const menu = document.getElementById("mobile-navigation-menu");
    if (!(menu instanceof HTMLElement)) {
      return { error: "missing-menu" };
    }

    const client = [...menu.querySelectorAll("a, span")].find(
      (el) => el.textContent?.trim() === "Área do Cliente",
    );
    const demo = [...menu.querySelectorAll("a, span")].find(
      (el) => el.textContent?.trim() === "Solicitar Demonstração",
    );

    if (!(client instanceof HTMLElement) || !(demo instanceof HTMLElement)) {
      return { error: "missing-buttons" };
    }

    const group = client.parentElement;
    const menuRect = menu.getBoundingClientRect();
    const groupRect = group?.getBoundingClientRect();
    const clientRect = client.getBoundingClientRect();
    const demoRect = demo.getBoundingClientRect();
    const groupStyles = group ? getComputedStyle(group) : null;

    const clientStyles = getComputedStyle(client);
    const demoStyles = getComputedStyle(demo);
    const menuItem = [...menu.querySelectorAll("a, span, summary")].find(
      (el) => el.textContent?.trim() === "Plataforma" || el.textContent?.trim().startsWith("Soluções"),
    );
    const menuItemSize =
      menuItem instanceof HTMLElement
        ? getComputedStyle(menuItem).fontSize
        : null;

    const leftInset = clientRect.left - menuRect.left;
    const rightInset = menuRect.right - demoRect.right;

    return {
      sameRow: Math.abs(clientRect.top - demoRect.top) <= 1,
      clientLeftOfDemo: clientRect.right <= demoRect.left + 1,
      sameHeight: Math.abs(clientRect.height - demoRect.height) <= 1,
      sameWidth: Math.abs(clientRect.width - demoRect.width) <= 1,
      height: Math.round(clientRect.height),
      clientWidth: Math.round(clientRect.width),
      demoWidth: Math.round(demoRect.width),
      clientFontSize: clientStyles.fontSize,
      demoFontSize: demoStyles.fontSize,
      menuItemSize,
      clientNoOverflow: client.scrollWidth <= client.clientWidth + 1,
      demoNoOverflow: demo.scrollWidth <= demo.clientWidth + 1,
      clientLabel: client.textContent?.trim(),
      demoLabel: demo.textContent?.trim(),
      withinMenu:
        clientRect.left >= menuRect.left - 1 &&
        demoRect.right <= menuRect.right + 1,
      centeredPair: Math.abs(leftInset - rightInset) <= 2,
      leftInset: Math.round(leftInset),
      rightInset: Math.round(rightInset),
      noOverlap: clientRect.right <= demoRect.left + 1,
      gap: Math.round(demoRect.left - clientRect.right),
      display: groupStyles?.display,
      hasHorizontalPageScroll:
        document.documentElement.scrollWidth > window.innerWidth + 1,
      groupWidth: groupRect ? Math.round(groupRect.width) : null,
      menuWidth: Math.round(menuRect.width),
    };
  });

  if (metrics.error) {
    record(`${viewport.name}:buttons`, false, metrics.error);
    return;
  }

  record(`${viewport.name}:same-row`, metrics.sameRow, metrics);
  record(`${viewport.name}:order`, metrics.clientLeftOfDemo, metrics);
  record(`${viewport.name}:same-height`, metrics.sameHeight, metrics.height);
  record(
    `${viewport.name}:touch-height`,
    metrics.height >= 44,
    metrics.height,
  );
  record(`${viewport.name}:same-width`, metrics.sameWidth, {
    clientWidth: metrics.clientWidth,
    demoWidth: metrics.demoWidth,
  });
  record(`${viewport.name}:centered`, metrics.centeredPair, {
    leftInset: metrics.leftInset,
    rightInset: metrics.rightInset,
  });
  record(`${viewport.name}:full-labels`, {
    pass:
      metrics.clientLabel === "Área do Cliente" &&
      metrics.demoLabel === "Solicitar Demonstração" &&
      metrics.clientNoOverflow &&
      metrics.demoNoOverflow,
  }.pass, {
    clientLabel: metrics.clientLabel,
    demoLabel: metrics.demoLabel,
    clientNoOverflow: metrics.clientNoOverflow,
    demoNoOverflow: metrics.demoNoOverflow,
  });
  record(`${viewport.name}:within-menu`, metrics.withinMenu, {
    gap: metrics.gap,
    groupWidth: metrics.groupWidth,
    menuWidth: metrics.menuWidth,
  });
  record(`${viewport.name}:no-overlap`, metrics.noOverlap, metrics.gap);
  record(
    `${viewport.name}:no-horizontal-scroll`,
    metrics.hasHorizontalPageScroll === false,
    metrics.hasHorizontalPageScroll,
  );
  record(
    `${viewport.name}:equal-columns`,
    metrics.display === "grid",
    { display: metrics.display },
  );
}

try {
  await withAuditBrowser(async (page) => {
    await runSequentially(VIEWPORTS, (viewport) => inspectViewport(page, viewport));

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    const desktop = await page.evaluate(() => {
      const headerActions = document.querySelector("[data-header-actions]");
      return {
        headerActionsVisible:
          headerActions instanceof HTMLElement &&
          headerActions.offsetParent !== null,
        headerFlex:
          headerActions instanceof HTMLElement
            ? getComputedStyle(headerActions).flexDirection
            : null,
      };
    });
    record(
      "desktop:header-actions-visible",
      desktop.headerActionsVisible && desktop.headerFlex === "row",
      desktop,
    );
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();
