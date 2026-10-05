/**
 * Checagens de layout do seletor de idioma desktop.
 */
import { near, round, wait } from "./audit.shared.mjs";
import {
  DESKTOP_LIST,
  DESKTOP_TRIGGER,
  LANGUAGE_LIST_LAYOUT_MS,
  POSITION_TOLERANCE_DESKTOP_PX,
} from "./language-selector-audit.selectors.shared.mjs";
import {
  box,
  isRgb,
  isRotate180,
  isTransparent,
  openLanguageList,
} from "./language-selector-audit.measure.shared.mjs";
import { measureDesktopLanguageSelector } from "./language-selector-desktop.measure.shared.mjs";

async function openDesktopList(page) {
  await openLanguageList(page, DESKTOP_TRIGGER, DESKTOP_LIST);
}

export async function checkClosedButton(page, prefix, record) {
  const closed = await measureDesktopLanguageSelector(page);
  record(
    `${prefix}-closed-button-89x42`,
    Boolean(
      closed.trigger &&
        near(closed.trigger.width, 89) &&
        near(closed.trigger.height, 42),
    ),
    box(closed.trigger ?? { width: 0, height: 0, x: 0, y: 0 }),
  );
  record(
    `${prefix}-closed-label-PT`,
    closed.triggerLabel.includes("PT") && !closed.triggerLabel.includes("BR"),
    closed.triggerLabel,
  );
  record(`${prefix}-closed-list-absent`, closed.list === null, closed.list);
  return closed;
}

function recordOpenSizes(prefix, opened, record) {
  record(
    `${prefix}-open-button-89x42`,
    Boolean(
      opened.trigger &&
        near(opened.trigger.width, 89) &&
        near(opened.trigger.height, 42),
    ),
    opened.trigger,
  );
  record(
    `${prefix}-open-group-89x126`,
    Boolean(
      opened.group &&
        near(opened.group.width, 89) &&
        near(opened.group.height, 126),
    ),
    opened.group,
  );
  record(
    `${prefix}-open-column-89x126`,
    Boolean(
      opened.column &&
        near(opened.column.width, 89) &&
        near(opened.column.height, 126),
    ),
    opened.column,
  );
}

function recordOpenColumnStyle(prefix, opened, record) {
  record(
    `${prefix}-open-column-radius-21`,
    opened.column?.borderRadius === "21px",
    opened.column?.borderRadius,
  );
  record(
    `${prefix}-open-column-color-485158`,
    isRgb(opened.column?.backgroundColor, 72, 81, 88),
    opened.column?.backgroundColor,
  );
  record(
    `${prefix}-open-column-aligned-to-button`,
    Boolean(
      opened.column &&
        opened.triggerBox &&
        near(opened.column.x, opened.triggerBox.x, 0.5) &&
        near(opened.column.y, opened.triggerBox.y, 0.5),
    ),
    { column: opened.column, trigger: opened.triggerBox },
  );
}

function recordOpenOptions(prefix, opened, record) {
  record(
    `${prefix}-open-options-en-es`,
    JSON.stringify(opened.optionCodes) === JSON.stringify(["en", "es"]),
    opened.optionCodes,
  );
  record(
    `${prefix}-open-option-boxes-89x42`,
    opened.optionBoxes.every(
      (item) => near(item.width, 89) && near(item.height, 42),
    ),
    opened.optionBoxes,
  );
  record(
    `${prefix}-open-options-transparent`,
    opened.optionBoxes.every((item) => isTransparent(item.backgroundColor)),
    opened.optionBoxes.map((item) => ({
      code: item.code,
      backgroundColor: item.backgroundColor,
    })),
  );
}

function recordOpenFlags(prefix, opened, record) {
  record(
    `${prefix}-open-flags-25x25`,
    opened.flags.length === 3 &&
      opened.flags.every((item) => near(item.width, 25) && near(item.height, 25)),
    opened.flags,
  );
  const flagXs = opened.flags.map((item) => item.x);
  const flagOffsetYs = opened.flags.map((item) => item.offsetY);
  record(
    `${prefix}-open-flags-same-x`,
    flagXs.length === 3 &&
      flagXs.every((x) => near(x, flagXs[0], POSITION_TOLERANCE_DESKTOP_PX)),
    opened.flags.map((item) => ({
      code: item.code,
      x: round(item.x),
      offsetX: item.offsetX === null ? null : round(item.offsetX),
    })),
  );
  record(
    `${prefix}-open-flags-same-offsetY`,
    flagOffsetYs.length === 3 &&
      flagOffsetYs.every(
        (y) =>
          y !== null && near(y, flagOffsetYs[0] ?? -1, POSITION_TOLERANCE_DESKTOP_PX),
      ),
    opened.flags.map((item) => ({
      code: item.code,
      offsetY: item.offsetY === null ? null : round(item.offsetY),
    })),
  );
}

function recordOpenChevron(prefix, closed, opened, record) {
  record(
    `${prefix}-closed-chevron-down`,
    Boolean(closed.chevron && !isRotate180(closed.chevron)),
    closed.chevron,
  );
  record(
    `${prefix}-open-chevron-up`,
    Boolean(opened.chevron && isRotate180(opened.chevron)),
    opened.chevron,
  );
  record(
    `${prefix}-header-height-unchanged`,
    near(opened.headerHeight ?? 0, closed.headerHeight ?? -1, 0.5),
    { closed: closed.headerHeight, opened: opened.headerHeight },
  );
}

export async function checkOpenList(page, prefix, closed, record) {
  await openDesktopList(page);
  await wait(LANGUAGE_LIST_LAYOUT_MS);
  const opened = await measureDesktopLanguageSelector(page);
  recordOpenSizes(prefix, opened, record);
  recordOpenColumnStyle(prefix, opened, record);
  recordOpenOptions(prefix, opened, record);
  recordOpenFlags(prefix, opened, record);
  recordOpenChevron(prefix, closed, opened, record);
  return opened;
}

export { openDesktopList };
