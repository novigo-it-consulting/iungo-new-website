/**
 * Checagens de layout do seletor de idioma mobile.
 */
import { AUDIT_UI_SETTLE_MS, near, wait } from "./audit.shared.mjs";
import {
  FOOTER_LOGO_WIDTH_PX,
  POSITION_TOLERANCE_MOBILE_PX,
  XL_MIN_WIDTH_PX,
} from "./language-selector-audit.selectors.shared.mjs";
import {
  clickMenuToggle,
  clickMobileSelector,
  screenshotHeaderIf,
  waitForMenuExpanded,
  waitForMobileListOpen,
} from "./language-selector-audit.measure.shared.mjs";
import { measureMobileHeader } from "./language-selector-mobile.measure.shared.mjs";

function recordClosedBasics(prefix, viewport, closed, record) {
  const duplicateIds = closed.ids.filter(
    (id, index) => closed.ids.indexOf(id) !== index,
  );
  record(`${prefix}-no-overflow-x`, closed.pageOverflowX <= 0.5, closed.pageOverflowX);
  record(
    `${prefix}-logo-width`,
    Boolean(closed.logo && near(closed.logo.width, viewport.expectedLogo, 1)),
    { actual: closed.logo?.width, expected: viewport.expectedLogo },
  );
  record(
    `${prefix}-footer-logo-unchanged`,
    closed.footerLogoWidth !== null &&
      near(closed.footerLogoWidth, FOOTER_LOGO_WIDTH_PX, 1),
    closed.footerLogoWidth,
  );
  record(`${prefix}-no-duplicate-ids`, duplicateIds.length === 0, duplicateIds);
}

export function checkClosedMenu(prefix, viewport, closed, record) {
  recordClosedBasics(prefix, viewport, closed, record);
  if (viewport.width >= XL_MIN_WIDTH_PX) {
    record(`${prefix}-mobile-selector-absent`, closed.mobileSelectorInDom === false, {
      inDom: closed.mobileSelectorInDom,
    });
    record(
      `${prefix}-desktop-selector-89x42`,
      Boolean(
        closed.desktopSelector &&
          near(closed.desktopSelector.width, 89) &&
          near(closed.desktopSelector.height, 42),
      ),
      closed.desktopSelector,
    );
    return "desktop";
  }
  record(
    `${prefix}-closed-selector-absent`,
    closed.mobileSelectorInDom === false &&
      closed.selector === null &&
      closed.mobileTriggerTabbable === false,
    { inDom: closed.mobileSelectorInDom, tabbable: closed.mobileTriggerTabbable },
  );
  record(
    `${prefix}-closed-toggle-44`,
    Boolean(
      closed.toggle &&
        near(closed.toggle.width, 44) &&
        near(closed.toggle.height, 44),
    ),
    closed.toggle,
  );
  return "mobile";
}

function recordOpenPositions(prefix, closed, opened, record) {
  record(
    `${prefix}-logo-position-stable`,
    Boolean(
      closed.logo &&
        opened.logo &&
        near(closed.logo.x, opened.logo.x, POSITION_TOLERANCE_MOBILE_PX) &&
        near(closed.logo.y, opened.logo.y, POSITION_TOLERANCE_MOBILE_PX) &&
        near(closed.logo.width, opened.logo.width, 1),
    ),
    { closed: closed.logo, opened: opened.logo },
  );
  record(
    `${prefix}-toggle-position-stable`,
    Boolean(
      closed.toggle &&
        opened.toggle &&
        near(closed.toggle.x, opened.toggle.x, POSITION_TOLERANCE_MOBILE_PX) &&
        near(closed.toggle.y, opened.toggle.y, POSITION_TOLERANCE_MOBILE_PX),
    ),
    { closed: closed.toggle, opened: opened.toggle },
  );
}

export function checkOpenMenu(prefix, closed, opened, record) {
  record(
    `${prefix}-open-selector-present`,
    opened.mobileSelectorInDom === true &&
      Boolean(
        opened.selector &&
          near(opened.selector.width, 89) &&
          near(opened.selector.height, 42),
      ),
    opened.selector,
  );
  recordOpenPositions(prefix, closed, opened, record);
  record(
    `${prefix}-selector-left-of-toggle`,
    Boolean(
      opened.selector && opened.toggle && opened.selector.right <= opened.toggle.x + 0.5,
    ),
    { selectorRight: opened.selector?.right, toggleX: opened.toggle?.x },
  );
  record(
    `${prefix}-gap-selector-toggle-16`,
    Boolean(
      opened.selector &&
        opened.toggle &&
        near(opened.toggle.x - opened.selector.right, 16, POSITION_TOLERANCE_MOBILE_PX),
    ),
    opened.selector && opened.toggle ? opened.toggle.x - opened.selector.right : null,
  );
  record(`${prefix}-selector-not-inert`, opened.mobileTriggerTabbable === true, {
    tabbable: opened.mobileTriggerTabbable,
  });
}

export function checkListOpensInsideMenu(prefix, listOpen, headerHeightMenuOpen, record) {
  record(
    `${prefix}-open-list-keeps-menu-open`,
    listOpen.menuExpanded === true && listOpen.list !== null,
    { menuExpanded: listOpen.menuExpanded, hasList: Boolean(listOpen.list) },
  );
  record(
    `${prefix}-list-header-height-unchanged`,
    near(listOpen.headerHeight ?? 0, headerHeightMenuOpen ?? -1, 0.5),
    { menu: headerHeightMenuOpen, list: listOpen.headerHeight },
  );
  record(`${prefix}-list-in-viewport`, listOpen.list?.inViewport === true, listOpen.list);
  record(
    `${prefix}-list-z-above-panel`,
    Number.parseInt(listOpen.list?.zIndex ?? "-1", 10) >= 60 &&
      Number.parseInt(listOpen.panel?.zIndex ?? "-1", 10) === 50,
    { listZ: listOpen.list?.zIndex, panelZ: listOpen.panel?.zIndex },
  );
}

export async function capture375(page, viewport, filename, recordName, record) {
  const clip = await screenshotHeaderIf(page, viewport.name === "375", filename);
  if (clip) {
    record(recordName, true, clip);
  }
}

export async function openMenuAndMeasure(page, prefix, closed, record) {
  await clickMenuToggle(page);
  await waitForMenuExpanded(page, true);
  await wait(AUDIT_UI_SETTLE_MS);
  const opened = await measureMobileHeader(page);
  checkOpenMenu(prefix, closed, opened, record);
  return opened;
}

export async function openListAndMeasure(page, prefix, headerHeightMenuOpen, record) {
  await clickMobileSelector(page);
  await waitForMobileListOpen(page);
  const listOpen = await measureMobileHeader(page);
  checkListOpensInsideMenu(prefix, listOpen, headerHeightMenuOpen, record);
  return listOpen;
}

