/**
 * Verificação: margens laterais da página Solicitar Demonstração.
 * node verify-request-demo-gutters.mjs  (dev server em AUDIT_BASE_URL)
 */
import {
  AUDIT_BASE_URL,
  createResultRecorder,
  runSequentially,
  withAuditBrowser,
} from "./audit.shared.mjs";

const { record, printAndExit } = createResultRecorder();

const PAGE_PATH = "/solicitar-demonstracao";
const SM_MIN_WIDTH = 640;
const ALIGN_TOLERANCE = 2;

const VIEWPORTS = [
  { name: "320", width: 320, height: 720 },
  { name: "375", width: 375, height: 812 },
  { name: "393", width: 393, height: 852 },
  { name: "396", width: 396, height: 852 },
  { name: "480", width: 480, height: 1040 },
  { name: "768", width: 768, height: 1024 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1920", width: 1920, height: 1080 },
];

function expectedGutter(layoutWidth) {
  if (layoutWidth >= 1328) {
    return Math.round((layoutWidth - 1264) / 2);
  }
  if (layoutWidth >= SM_MIN_WIDTH) {
    return 32;
  }
  return 24;
}

function readRequestDemoGutters() {
  function roundBox(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
    };
  }

  const frame = document.querySelector("[data-request-demo-frame]");
  const title = document.querySelector("#request-demo-title");
  const form = document.querySelector("[data-demo-form-card]");
  const cards = document.querySelector("[data-request-demo-contact-cards]");
  const header = document.querySelector("[data-header-content]");
  const section = document.querySelector("[data-request-demo-section]");

  if (
    !(frame instanceof HTMLElement) ||
    !(title instanceof HTMLElement) ||
    !(form instanceof HTMLElement) ||
    !(cards instanceof HTMLElement) ||
    !(section instanceof HTMLElement)
  ) {
    return null;
  }

  const formCard = form.firstElementChild;
  const firstContactCard = cards.querySelector("article");
  const formBox = roundBox(form);
  const cardsBox = roundBox(cards);
  const titleBox = roundBox(title);
  const frameBox = roundBox(frame);
  const sectionBox = roundBox(section);
  const headerBox = header instanceof HTMLElement ? roundBox(header) : null;

  const layoutWidth = document.documentElement.clientWidth;

  return {
    titleLeft: titleBox.left,
    formLeft: formBox.left,
    cardsLeft: cardsBox.left,
    formRight: formBox.right,
    cardsRight: cardsBox.right,
    titleRight: titleBox.right,
    frameLeft: frameBox.left,
    frameRight: frameBox.right,
    sectionLeft: sectionBox.left,
    sectionRight: sectionBox.right,
    headerLeft: headerBox ? headerBox.left : null,
    formCardRadiusVisible:
      formCard instanceof HTMLElement &&
      roundBox(formCard).left >= frameBox.left - 1,
    firstCardRadiusVisible:
      firstContactCard instanceof HTMLElement &&
      roundBox(firstContactCard).left >= frameBox.left - 1,
    stacked: Math.abs(formBox.top - cardsBox.top) > 40,
    layoutWidth,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    contacts: readContactWrapMetrics(),
  };

  function readContactWrapMetrics() {
    const cards = document.querySelectorAll("[data-request-demo-contact-card]");
    const results = [];

    for (const card of cards) {
      if (!(card instanceof HTMLElement)) {
        continue;
      }

      const link = card.querySelector("a");
      if (!(link instanceof HTMLElement) || !link.parentElement) {
        continue;
      }

      const cardRect = card.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const styles = getComputedStyle(card);
      const padLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const padRight = Number.parseFloat(styles.paddingRight) || 0;
      const availableWidth = card.clientWidth - padLeft - padRight;

      const probe = link.cloneNode(true);
      if (!(probe instanceof HTMLElement)) {
        continue;
      }

      probe.style.cssText =
        "position:absolute;visibility:hidden;white-space:nowrap;overflow-wrap:normal;word-break:normal;max-width:none;width:auto;";
      link.parentElement.appendChild(probe);
      const unwrappedWidth = probe.getBoundingClientRect().width;
      probe.remove();

      const range = document.createRange();
      range.selectNodeContents(link);
      const lineCount = range.getClientRects().length;

      results.push({
        id: card.dataset.requestDemoContactCard,
        overflow: linkRect.right > cardRect.right + 1,
        lineCount,
        unwrappedWidth: Math.round(unwrappedWidth),
        availableWidth: Math.round(availableWidth),
        wrapsUnnecessarily:
          unwrappedWidth <= availableWidth - 0.5 && lineCount > 1,
      });
    }

    return results;
  }
}

function recordGutterAssertions(viewport, metrics) {
  const label = viewport.name;
  const expected = expectedGutter(metrics.layoutWidth);
  const isDesktopColumns = viewport.width >= 1249;

  record(
    `${label}:aligned-start`,
    isDesktopColumns
      ? Math.abs(metrics.titleLeft - metrics.formLeft) <= ALIGN_TOLERANCE
      : Math.abs(metrics.titleLeft - metrics.formLeft) <= ALIGN_TOLERANCE &&
        Math.abs(metrics.formLeft - metrics.cardsLeft) <= ALIGN_TOLERANCE,
    {
      titleLeft: metrics.titleLeft,
      formLeft: metrics.formLeft,
      cardsLeft: metrics.cardsLeft,
    },
  );

  record(
    `${label}:standard-gutter`,
    Math.abs(metrics.frameLeft - expected) <= 1 &&
      Math.abs(metrics.layoutWidth - metrics.frameRight - expected) <= 1,
    {
      frameLeft: metrics.frameLeft,
      frameRight: metrics.frameRight,
      layoutWidth: metrics.layoutWidth,
      expected,
    },
  );

  record(
    `${label}:equal-sides`,
    Math.abs(
      metrics.frameLeft - (metrics.layoutWidth - metrics.frameRight),
    ) <= 1,
    {
      left: metrics.frameLeft,
      right: metrics.layoutWidth - metrics.frameRight,
    },
  );

  record(
    `${label}:full-bleed-background`,
    metrics.sectionLeft <= 0 && metrics.sectionRight >= metrics.layoutWidth,
    {
      sectionLeft: metrics.sectionLeft,
      sectionRight: metrics.sectionRight,
      layoutWidth: metrics.layoutWidth,
    },
  );

  record(
    `${label}:cards-inside-frame`,
    metrics.formLeft >= metrics.frameLeft - 1 &&
      metrics.cardsRight <= metrics.frameRight + 1 &&
      metrics.formCardRadiusVisible === true &&
      metrics.firstCardRadiusVisible === true,
    {
      formLeft: metrics.formLeft,
      cardsRight: metrics.cardsRight,
      frameLeft: metrics.frameLeft,
      frameRight: metrics.frameRight,
    },
  );

  if (metrics.headerLeft !== null) {
    record(
      `${label}:matches-header`,
      Math.abs(metrics.frameLeft - metrics.headerLeft) <= ALIGN_TOLERANCE,
      {
        frameLeft: metrics.frameLeft,
        headerLeft: metrics.headerLeft,
      },
    );
  }

  if (!isDesktopColumns) {
    record(`${label}:stacked-mobile`, metrics.stacked === true, {
      stacked: metrics.stacked,
    });
  }

  record(
    `${label}:no-horizontal-scroll`,
    metrics.pageWidth <= metrics.layoutWidth + 1,
    {
      pageWidth: metrics.pageWidth,
      layoutWidth: metrics.layoutWidth,
    },
  );

  const contacts = Array.isArray(metrics.contacts) ? metrics.contacts : [];
  const overflowingContacts = contacts.filter((contact) => contact.overflow);
  const fragmentedContacts = contacts.filter(
    (contact) => contact.wrapsUnnecessarily,
  );

  record(`${label}:contacts-inside-card`, overflowingContacts.length === 0, {
    overflowingContacts,
  });
  record(
    `${label}:emails-unbroken-when-they-fit`,
    fragmentedContacts.length === 0,
    {
      fragmentedContacts,
    },
  );
}

try {
  await withAuditBrowser(async (page) => {
    await page.goto(`${AUDIT_BASE_URL}${PAGE_PATH}`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForSelector("[data-request-demo-frame]", {
      timeout: 15000,
    });

    async function inspectGutterViewport(viewport) {
      await page.setViewport({
        width: viewport.width,
        height: viewport.height,
      });
      const metrics = await page.evaluate(readRequestDemoGutters);
      if (!metrics) {
        record(`${viewport.name}:layout`, false, "missing-nodes");
        return;
      }
      recordGutterAssertions(viewport, metrics);

      if (viewport.width === 396) {
        await inspectFormStates(page, viewport.name);
      }
    }

    await runSequentially(VIEWPORTS, (viewport) => inspectGutterViewport(viewport));
  });
} catch (error) {
  record("script-error", false, String(error));
}

printAndExit();

async function inspectFormStates(page, label) {
  const comboboxOpened = await page
    .click("#request-demo-product-interest")
    .then(() => true)
    .catch(() => false);

  if (!comboboxOpened) {
    record(`${label}:combobox-open`, false, "trigger-missing");
    return;
  }

  await page.waitForSelector("#request-demo-product-interest-listbox", {
    timeout: 5000,
  });

  const panelMetrics = await page.evaluate(() => {
    const panel = document.querySelector(
      "#request-demo-product-interest-listbox",
    );
    if (!(panel instanceof HTMLElement)) {
      return null;
    }
    const rect = panel.getBoundingClientRect();
    return {
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      viewportWidth: window.innerWidth,
    };
  });

  record(
    `${label}:combobox-within-viewport`,
    Boolean(
      panelMetrics &&
        panelMetrics.left >= 0 &&
        panelMetrics.right <= panelMetrics.viewportWidth + 1,
    ),
    panelMetrics ?? "missing-panel",
  );

  await page.keyboard.press("Escape");

  await page.click('button[type="submit"]');
  await page.waitForSelector("#request-demo-name-error", { timeout: 5000 });

  const errorMetrics = await page.evaluate(() => {
    const formCard = document.querySelector("[data-demo-form-card]");
    const errors = document.querySelectorAll("[id$='-error']");
    if (!(formCard instanceof HTMLElement) || errors.length === 0) {
      return null;
    }
    const formRect = formCard.getBoundingClientRect();
    let maxRight = 0;
    for (const error of errors) {
      if (error instanceof HTMLElement) {
        maxRight = Math.max(maxRight, error.getBoundingClientRect().right);
      }
    }
    return {
      errorCount: errors.length,
      maxRight: Math.round(maxRight),
      formRight: Math.round(formRect.right),
    };
  });

  record(
    `${label}:validation-inside-form`,
    Boolean(
      errorMetrics &&
        errorMetrics.errorCount > 0 &&
        errorMetrics.maxRight <= errorMetrics.formRight + 1,
    ),
    errorMetrics ?? "missing-errors",
  );
}
