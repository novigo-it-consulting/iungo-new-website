/**
 * Leitura do DOM do seletor de idioma desktop.
 */
import {
  DESKTOP_TRIGGER,
  LANGUAGE_SELECTOR,
} from "./language-selector-audit.selectors.shared.mjs";

function readDesktopLayout(sel) {
  const root = document.querySelector(sel.desktopInstance);
  const header = document.querySelector(sel.header);
  const trigger = root?.querySelector(sel.trigger);
  const list = root?.querySelector(sel.list);
  const column = root?.querySelector(sel.openColumn);
  const headerRect = header?.getBoundingClientRect();
  const triggerRect = trigger?.getBoundingClientRect();
  const listRect = list?.getBoundingClientRect();
  const columnRect = column?.getBoundingClientRect();
  const columnStyle = column ? getComputedStyle(column) : null;
  const group =
    triggerRect && listRect
      ? {
          width: Math.max(triggerRect.width, listRect.width),
          height: triggerRect.height + listRect.height,
          top: triggerRect.top,
          bottom: listRect.bottom,
        }
      : null;

  return {
    expanded: trigger?.getAttribute("aria-expanded") ?? null,
    triggerLabel: trigger?.textContent?.replace(/\s+/g, " ").trim() ?? "",
    headerHeight: headerRect?.height ?? null,
    trigger: triggerRect
      ? { width: triggerRect.width, height: triggerRect.height }
      : null,
    list: listRect ? { width: listRect.width, height: listRect.height } : null,
    column: columnRect
      ? {
          width: columnRect.width,
          height: columnRect.height,
          x: columnRect.x,
          y: columnRect.y,
          borderRadius: columnStyle?.borderRadius ?? null,
          backgroundColor: columnStyle?.backgroundColor ?? null,
        }
      : null,
    triggerBox: triggerRect ? { x: triggerRect.x, y: triggerRect.y } : null,
    group,
  };
}

function readDesktopChoices(sel) {
  const root = document.querySelector(sel.desktopInstance);
  const options = [...(root?.querySelectorAll(sel.option) ?? [])];
  const flags = [...(root?.querySelectorAll(sel.flag) ?? [])];
  const chevronEl = root?.querySelector(sel.chevron);
  const chevronStyle = chevronEl ? getComputedStyle(chevronEl) : null;

  return {
    optionCodes: options.map((item) =>
      item.dataset.headerLanguageOption ?? null,
    ),
    optionBoxes: options.map((item) => {
      const rect = item.getBoundingClientRect();
      return {
        code: item.dataset.headerLanguageOption ?? null,
        width: rect.width,
        height: rect.height,
        backgroundColor: getComputedStyle(item).backgroundColor,
      };
    }),
    flags: flags.map((item) => {
      const rect = item.getBoundingClientRect();
      const parent = item.closest("a, button");
      const parentRect = parent?.getBoundingClientRect();
      return {
        code: item.dataset.headerLanguageFlag ?? null,
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
        offsetX: parentRect ? rect.left - parentRect.left : null,
        offsetY: parentRect ? rect.top - parentRect.top : null,
      };
    }),
    chevron: chevronEl
      ? {
          transform: chevronStyle?.transform,
          rotate: chevronStyle?.rotate,
          className: chevronEl.getAttribute("class"),
        }
      : null,
  };
}

export async function measureDesktopLanguageSelector(page) {
  const layout = await page.evaluate(readDesktopLayout, LANGUAGE_SELECTOR);
  const choices = await page.evaluate(readDesktopChoices, LANGUAGE_SELECTOR);
  return { ...layout, ...choices };
}

export async function triggerFocusState(page) {
  return page.evaluate((triggerSelector) => {
    const el = document.querySelector(triggerSelector);
    return {
      focused: el?.matches(":focus") ?? false,
      focusVisible: el?.matches(":focus-visible") ?? false,
    };
  }, DESKTOP_TRIGGER);
}

export async function readDesktopAfterClose(page) {
  return page.evaluate((sel) => {
    const trigger = document.querySelector(
      `${sel.desktopInstance} ${sel.trigger}`,
    );
    return {
      listClosed:
        document.querySelector(`${sel.desktopInstance} ${sel.list}`) === null,
      expanded: trigger?.getAttribute("aria-expanded"),
      triggerFocused: document.activeElement === trigger,
      label: trigger?.textContent?.replace(/\s+/g, " ").trim() ?? "",
      aria: trigger?.getAttribute("aria-label") ?? "",
      flag: trigger
        ?.querySelector(sel.flag)
        ?.dataset.headerLanguageFlag ?? null,
      triggerFocusedAttr: document.activeElement?.hasAttribute(
        "data-header-language-selector",
      ),
    };
  }, LANGUAGE_SELECTOR);
}
