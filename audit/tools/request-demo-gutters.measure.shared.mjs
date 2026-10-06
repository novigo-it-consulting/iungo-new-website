/**
 * Leituras cruas da página Solicitar Demonstração.
 * Cada função vai sozinha para page.evaluate. As contas ficam no Node.
 */
function roundBox(box) {
  return {
    top: Math.round(box.top),
    left: Math.round(box.left),
    right: Math.round(box.right),
    width: Math.round(box.width),
  };
}

export function readGutterLayout(selectors) {
  const frame = document.querySelector(selectors.frame);
  const title = document.querySelector(selectors.title);
  const form = document.querySelector(selectors.form);
  const cards = document.querySelector(selectors.cards);
  const header = document.querySelector(selectors.header);
  const section = document.querySelector(selectors.section);
  if (
    !(frame instanceof HTMLElement) ||
    !(title instanceof HTMLElement) ||
    !(form instanceof HTMLElement) ||
    !(cards instanceof HTMLElement) ||
    !(section instanceof HTMLElement)
  ) {
    return null;
  }

  const nodes = [title, form, cards, frame, section];
  const rects = [];
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    rects.push({ top: rect.top, left: rect.left, right: rect.right, width: rect.width });
  }
  const headerRect = header instanceof HTMLElement ? header.getBoundingClientRect() : null;
  const formCard = form.firstElementChild;
  const firstContactCard = cards.querySelector("article");
  const formCardRect =
    formCard instanceof HTMLElement ? formCard.getBoundingClientRect() : null;
  const firstCardRect =
    firstContactCard instanceof HTMLElement ? firstContactCard.getBoundingClientRect() : null;

  return {
    rects,
    headerRect: headerRect
      ? { top: headerRect.top, left: headerRect.left, right: headerRect.right, width: headerRect.width }
      : null,
    formCardLeft: formCardRect ? formCardRect.left : null,
    firstCardLeft: firstCardRect ? firstCardRect.left : null,
    layoutWidth: document.documentElement.clientWidth,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  };
}

export function readContactCards(contactCardSelector) {
  const cards = document.querySelectorAll(contactCardSelector);
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
    const availableWidth = card.clientWidth - padLeft - padRight;
    results.push({
      id: card.dataset.requestDemoContactCard,
      overflow: linkRect.right > cardRect.right + 1,
      lineCount,
      unwrappedWidth: Math.round(unwrappedWidth),
      availableWidth: Math.round(availableWidth),
      wrapsUnnecessarily: unwrappedWidth <= availableWidth - 0.5 && lineCount > 1,
    });
  }
  return results;
}

export function buildGutterMetrics(raw, contacts) {
  const boxes = [];
  for (const rect of raw.rects) {
    boxes.push(roundBox(rect));
  }
  const [titleBox, formBox, cardsBox, frameBox, sectionBox] = boxes;
  const headerBox = raw.headerRect ? roundBox(raw.headerRect) : null;
  const formCardLeft = raw.formCardLeft === null ? null : Math.round(raw.formCardLeft);
  const firstCardLeft = raw.firstCardLeft === null ? null : Math.round(raw.firstCardLeft);
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
    formCardRadiusVisible: formCardLeft !== null && formCardLeft >= frameBox.left - 1,
    firstCardRadiusVisible: firstCardLeft !== null && firstCardLeft >= frameBox.left - 1,
    stacked: Math.abs(formBox.top - cardsBox.top) > 40,
    layoutWidth: raw.layoutWidth,
    pageWidth: raw.pageWidth,
    viewportWidth: raw.viewportWidth,
    contacts,
  };
}

export function readComboboxPanel(listboxSelector) {
  const panel = document.querySelector(listboxSelector);
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const rect = panel.getBoundingClientRect();
  return {
    left: Math.round(rect.left),
    right: Math.round(rect.right),
    viewportWidth: window.innerWidth,
  };
}

export function readValidationErrors(formSelector) {
  const formCard = document.querySelector(formSelector);
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
}
