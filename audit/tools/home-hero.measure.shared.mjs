/**
 * O navegador devolve retângulos crus.
 * Contas (arredondar, comparar, contar linhas) ficam no Node.
 */
function roundBox(box) {
  return {
    top: Math.round(box.top),
    bottom: Math.round(box.bottom),
    left: Math.round(box.left),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

function plainText(value) {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

export function readHeroRaw(demoHref) {
  const section = document.querySelector("[data-hero-section]");
  const title = document.querySelector("[data-hero-title]");
  const description = document.querySelector("[data-hero-description]");
  const visual = document.querySelector("[data-hero-visual]");
  const actions = document.querySelector("[data-hero-actions]");
  if (
    !(section instanceof HTMLElement) ||
    !(title instanceof HTMLElement) ||
    !(description instanceof HTMLElement) ||
    !(visual instanceof HTMLElement) ||
    !(actions instanceof HTMLElement)
  ) {
    return null;
  }

  let demo = null;
  for (const candidate of actions.querySelectorAll("a")) {
    if (candidate instanceof HTMLAnchorElement && candidate.getAttribute("href") === demoHref) {
      demo = candidate;
      break;
    }
  }
  const platform = actions.querySelector("[data-hero-secondary-cta]");
  const image = visual.querySelector("img");
  if (!(demo instanceof HTMLElement) || !(platform instanceof HTMLElement)) {
    return null;
  }

  const nodes = [title, description, visual, actions, demo, platform];
  const rects = [];
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    rects.push({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  }
  const imageRect = image instanceof HTMLElement ? image.getBoundingClientRect() : null;
  const titleLines = [];
  for (const element of title.querySelectorAll(".home-hero-title-line")) {
    if (!(element instanceof HTMLElement)) {
      continue;
    }
    titleLines.push({
      lineHeight: getComputedStyle(element).lineHeight,
      height: element.getBoundingClientRect().height,
    });
  }

  return {
    rects,
    imageRect: imageRect
      ? { width: imageRect.width, height: imageRect.height }
      : null,
    demoText: demo.textContent,
    platformText: platform.textContent,
    demoOverflow: demo.scrollWidth > demo.clientWidth + 1,
    platformOverflow: platform.scrollWidth > platform.clientWidth + 1,
    demoEllipsis: getComputedStyle(demo).textOverflow,
    platformEllipsis: getComputedStyle(platform).textOverflow,
    pageWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    titleFontSize: getComputedStyle(title).fontSize,
    titleLines,
  };
}

function countTitleLines(lines) {
  const titleLineWraps = [];
  let titleLineCount = 0;
  for (const line of lines) {
    const lineHeight = Number.parseFloat(line.lineHeight);
    const wraps = lineHeight > 0 ? Math.round(line.height / lineHeight) : 0;
    titleLineWraps.push(wraps);
    titleLineCount += wraps;
  }
  return { titleLineWraps, titleLineCount };
}

function roundBoxes(rects) {
  const boxes = [];
  for (const rect of rects) {
    boxes.push(roundBox(rect));
  }
  return boxes;
}

export function buildHeroMetrics(raw) {
  const [titleBox, descriptionBox, visualBox, actionsBox, demoBox, platformBox] = roundBoxes(
    raw.rects,
  );
  const imageBox = raw.imageRect ? roundBox(raw.imageRect) : null;
  const lines = countTitleLines(raw.titleLines);
  return {
    titleTop: titleBox.top,
    descriptionTop: descriptionBox.top,
    descriptionBottom: descriptionBox.bottom,
    visualTop: visualBox.top,
    visualBottom: visualBox.bottom,
    actionsTop: actionsBox.top,
    descriptionToActions: actionsBox.top - descriptionBox.bottom,
    demoLeft: demoBox.left,
    platformLeft: platformBox.left,
    demoTop: demoBox.top,
    platformTop: platformBox.top,
    demoHeight: demoBox.height,
    platformHeight: platformBox.height,
    demoWidth: demoBox.width,
    platformWidth: platformBox.width,
    demoText: plainText(raw.demoText),
    platformText: plainText(raw.platformText),
    demoOverflow: raw.demoOverflow,
    platformOverflow: raw.platformOverflow,
    demoEllipsis: raw.demoEllipsis === "ellipsis",
    platformEllipsis: raw.platformEllipsis === "ellipsis",
    sameRow: Math.abs(demoBox.top - platformBox.top) <= 2,
    pageWidth: raw.pageWidth,
    viewportWidth: raw.viewportWidth,
    titleFontSize: raw.titleFontSize,
    titleLineCount: lines.titleLineCount,
    titleLineWraps: lines.titleLineWraps,
    imageWidth: imageBox ? imageBox.width : 0,
    imageHeight: imageBox ? imageBox.height : 0,
    visualAspect:
      visualBox.height > 0 ? Number((visualBox.width / visualBox.height).toFixed(2)) : 0,
  };
}
