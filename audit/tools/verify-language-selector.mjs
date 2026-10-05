/**
 * Mede o seletor de idioma do Header (1440 e 1920) e confere abrir/fechar.
 * Executar com o dev server: node verify-language-selector.mjs
 */
import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1920", width: 1920, height: 1080 },
];
const SIZE_TOLERANCE_PX = 0.6;
const POSITION_TOLERANCE_PX = 1;

const results = [];

function record(name, pass, detail) {
  results.push({ name, pass, ...(detail !== undefined ? { detail } : {}) });
}

function near(actual, expected, tolerance = SIZE_TOLERANCE_PX) {
  return Math.abs(actual - expected) <= tolerance;
}

function box(rect) {
  return {
    width: round(rect.width),
    height: round(rect.height),
    x: round(rect.x),
    y: round(rect.y),
  };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function parseRgb(value) {
  const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(
    value ?? "",
  );
  if (!match) {
    return null;
  }
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function isRgb(value, r, g, b) {
  const parsed = parseRgb(value);
  return Boolean(parsed && parsed.r === r && parsed.g === g && parsed.b === b);
}

function isTransparent(value) {
  if (!value || value === "transparent") {
    return true;
  }
  const parsed = parseRgb(value);
  return Boolean(parsed && parsed.a === 0);
}

function isRotate180(style) {
  const rotate = style?.rotate ?? "";
  const transform = style?.transform ?? "";
  if (String(rotate).includes("180")) {
    return true;
  }
  if (!transform || transform === "none") {
    return false;
  }
  return /matrix\(-1[,\s]/.test(transform) || transform.includes("rotate(180");
}

async function triggerFocusState(page) {
  return page.evaluate(() => {
    const el = document.querySelector("[data-header-language-selector]");
    return {
      focused: el?.matches(":focus") ?? false,
      focusVisible: el?.matches(":focus-visible") ?? false,
    };
  });
}

async function mouseClickCenter(page, selector) {
  const box = await page.$eval(selector, (el) => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });
  await page.mouse.click(box.x, box.y);
}

async function measureLanguageSelector(page) {
  return page.evaluate(() => {
    const header = document.querySelector("[data-header]");
    const trigger = document.querySelector("[data-header-language-selector]");
    const list = document.querySelector("[data-header-language-list]");
    const column = document.querySelector("[data-header-language-open-column]");
    const options = [
      ...document.querySelectorAll("[data-header-language-option]"),
    ];
    const flags = [
      ...document.querySelectorAll("[data-header-language-flag]"),
    ];

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
      triggerBox: triggerRect
        ? { x: triggerRect.x, y: triggerRect.y }
        : null,
      group,
      optionCodes: options.map((item) =>
        item.getAttribute("data-header-language-option"),
      ),
      optionBoxes: options.map((item) => {
        const rect = item.getBoundingClientRect();
        const style = getComputedStyle(item);
        return {
          code: item.getAttribute("data-header-language-option"),
          width: rect.width,
          height: rect.height,
          backgroundColor: style.backgroundColor,
        };
      }),
      flags: flags.map((item) => {
        const rect = item.getBoundingClientRect();
        const parent = item.closest("button");
        const parentRect = parent?.getBoundingClientRect();
        return {
          code: item.getAttribute("data-header-language-flag"),
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y,
          offsetX: parentRect ? rect.left - parentRect.left : null,
          offsetY: parentRect ? rect.top - parentRect.top : null,
        };
      }),
      chevron: (() => {
        const el = document.querySelector("[data-header-language-chevron]");
        if (!el) {
          return null;
        }
        const style = getComputedStyle(el);
        return {
          transform: style.transform,
          rotate: style.rotate,
          className: el.getAttribute("class"),
        };
      })(),
    };
  });
}

async function openList(page) {
  await page.click("[data-header-language-selector]");
  await page.waitForSelector("[data-header-language-list]", { timeout: 5000 });
}

let chrome;
let browser;

try {
  chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--disable-gpu", "--no-sandbox"],
  });

  browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
  });

  const page = await browser.newPage();

  for (const viewport of VIEWPORTS) {
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: 1,
    });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page
      .waitForNetworkIdle({ idleTime: 500, timeout: 10000 })
      .catch(() => {});
    await page.waitForSelector("[data-header-language-selector]", {
      timeout: 10000,
    });

    const prefix = viewport.name;
    const closed = await measureLanguageSelector(page);
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

    const headerHeightClosed = closed.headerHeight;
    await openList(page);
    await new Promise((resolve) => {
      setTimeout(resolve, 250);
    });
    const opened = await measureLanguageSelector(page);

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
    record(
      `${prefix}-open-flags-25x25`,
      opened.flags.length === 3 &&
        opened.flags.every(
          (item) => near(item.width, 25) && near(item.height, 25),
        ),
      opened.flags,
    );
    const flagXs = opened.flags.map((item) => item.x);
    const flagOffsetYs = opened.flags.map((item) => item.offsetY);
    record(
      `${prefix}-open-flags-same-x`,
      flagXs.length === 3 &&
        flagXs.every((x) => near(x, flagXs[0], POSITION_TOLERANCE_PX)),
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
          (y) => y !== null && near(y, flagOffsetYs[0] ?? -1, POSITION_TOLERANCE_PX),
        ),
      opened.flags.map((item) => ({
        code: item.code,
        offsetY: item.offsetY === null ? null : round(item.offsetY),
      })),
    );
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
      near(opened.headerHeight ?? 0, headerHeightClosed ?? -1, 0.5),
      { closed: headerHeightClosed, opened: opened.headerHeight },
    );

    if (viewport.name === "1920") {
      const clip = await page.evaluate(() => {
        const column = document.querySelector(
          "[data-header-language-open-column]",
        );
        const rect = column?.getBoundingClientRect();
        if (!rect) {
          return null;
        }
        return {
          x: Math.max(0, Math.floor(rect.x - 80)),
          y: 0,
          width: Math.ceil(rect.width + 160),
          height: Math.ceil(rect.bottom + 24),
        };
      });
      record(`${prefix}-screenshot-clip`, Boolean(clip), clip);
      if (clip) {
        await page.screenshot({
          path: "C:/iungo-website/audit/tools/language-selector-open-1920.png",
          clip,
          captureBeyondViewport: true,
        });
      }
    }

    await page.keyboard.press("Escape");
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const afterEscape = await page.evaluate(() => ({
      listClosed: document.querySelector("[data-header-language-list]") === null,
      expanded: document
        .querySelector("[data-header-language-selector]")
        ?.getAttribute("aria-expanded"),
      triggerFocused: document.activeElement?.hasAttribute(
        "data-header-language-selector",
      ),
    }));
    record(
      `${prefix}-escape-closes-and-focuses`,
      afterEscape.listClosed &&
        afterEscape.expanded === "false" &&
        afterEscape.triggerFocused === true,
      afterEscape,
    );

    await openList(page);
    const outsidePoint = await page.evaluate(() => {
      const header = document.querySelector("[data-header]");
      const rect = header?.getBoundingClientRect();
      return {
        x: (rect?.left ?? 0) + 24,
        y: (rect?.bottom ?? 0) + 48,
      };
    });
    await page.mouse.click(outsidePoint.x, outsidePoint.y);
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    record(
      `${prefix}-click-outside-closes`,
      await page.evaluate(
        () => document.querySelector("[data-header-language-list]") === null,
      ),
    );

    await openList(page);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    record(
      `${prefix}-tab-out-closes`,
      await page.evaluate(
        () => document.querySelector("[data-header-language-list]") === null,
      ),
    );

    await openList(page);
    await page.click('[data-header-language-option="en"]');
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const afterEn = await page.evaluate(() => {
      const trigger = document.querySelector("[data-header-language-selector]");
      return {
        label: trigger?.textContent?.replace(/\s+/g, " ").trim() ?? "",
        aria: trigger?.getAttribute("aria-label") ?? "",
        expanded: trigger?.getAttribute("aria-expanded"),
        flag: trigger
          ?.querySelector("[data-header-language-flag]")
          ?.getAttribute("data-header-language-flag"),
        triggerFocused: document.activeElement?.hasAttribute(
          "data-header-language-selector",
        ),
      };
    });
    record(
      `${prefix}-select-en`,
      afterEn.label.includes("EN") &&
        afterEn.aria === "Idioma: English" &&
        afterEn.expanded === "false" &&
        afterEn.flag === "en" &&
        afterEn.triggerFocused === true,
      afterEn,
    );

    await openList(page);
    const reopened = await measureLanguageSelector(page);
    record(
      `${prefix}-reopen-after-en-shows-pt-es`,
      JSON.stringify(reopened.optionCodes) === JSON.stringify(["pt-BR", "es"]),
      reopened.optionCodes,
    );
    await page.keyboard.press("Escape");

    await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page
      .waitForNetworkIdle({ idleTime: 500, timeout: 10000 })
      .catch(() => {});
    await page.waitForSelector("[data-header-language-selector]", {
      timeout: 10000,
    });

    const focusA = await triggerFocusState(page);
    record(`${prefix}-focus-a-load`, focusA.focusVisible === false, focusA);

    await mouseClickCenter(page, "[data-header-language-selector]");
    await page.waitForSelector("[data-header-language-list]", { timeout: 5000 });
    const focusB = await triggerFocusState(page);
    record(
      `${prefix}-focus-b-mouse-open`,
      focusB.focusVisible === false,
      focusB,
    );

    await mouseClickCenter(page, "[data-header-language-selector]");
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const focusC = await triggerFocusState(page);
    record(
      `${prefix}-focus-c-mouse-close`,
      focusC.focusVisible === false,
      focusC,
    );

    await mouseClickCenter(page, "[data-header-language-selector]");
    await page.waitForSelector("[data-header-language-list]", { timeout: 5000 });
    await mouseClickCenter(page, '[data-header-language-option="en"]');
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const focusD = await triggerFocusState(page);
    record(
      `${prefix}-focus-d-mouse-select-en`,
      focusD.focused === true && focusD.focusVisible === false,
      focusD,
    );

    await mouseClickCenter(page, "[data-header-language-selector]");
    await page.waitForSelector("[data-header-language-list]", { timeout: 5000 });
    const outsideAfterOpen = await page.evaluate(() => {
      const header = document.querySelector("[data-header]");
      const rect = header?.getBoundingClientRect();
      return {
        x: (rect?.left ?? 0) + 24,
        y: (rect?.bottom ?? 0) + 48,
      };
    });
    await page.mouse.click(outsideAfterOpen.x, outsideAfterOpen.y);
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const focusE = await triggerFocusState(page);
    record(
      `${prefix}-focus-e-click-outside`,
      focusE.focusVisible === false,
      focusE,
    );

    await mouseClickCenter(page, "[data-header-language-selector]");
    await page.waitForSelector("[data-header-language-list]", { timeout: 5000 });
    await page.keyboard.press("Escape");
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    const focusF = await triggerFocusState(page);
    record(
      `${prefix}-focus-f-escape-after-mouse`,
      focusF.focused === true && focusF.focusVisible === true,
      focusF,
    );

    await openList(page);
    await page.setViewport({
      width: 1024,
      height: viewport.height,
      deviceScaleFactor: 1,
    });
    await page.waitForFunction(
      () => !document.querySelector("[data-header-language-list]"),
      { timeout: 5000 },
    );
    record(
      `${prefix}-below-xl-closes`,
      await page.evaluate(
        () => document.querySelector("[data-header-language-list]") === null,
      ),
    );
  }

  console.log(JSON.stringify(results, null, 2));
  const failed = results.filter((item) => !item.pass);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close().catch(() => {});
  try {
    if (chrome) {
      await chrome.kill();
    }
  } catch {
    // ignore cleanup errors
  }
  if (process.exitCode === 1) {
    process.exit(1);
  }
}
