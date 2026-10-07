/**
 * O navegador devolve retângulos crus do herói de produto.
 * As contas ficam no Node.
 */
function roundBox(box) {
  return {
    top: Math.round(box.top),
    bottom: Math.round(box.bottom),
    left: Math.round(box.left),
    right: Math.round(box.right),
    width: Math.round(box.width),
    height: Math.round(box.height),
  };
}

export function readProductHeroRaw(slug) {
  const section = document.querySelector(`[data-${slug}-hero-section]`);
  const container = document.querySelector(`[data-${slug}-hero-container]`);
  const content = document.querySelector(`[data-${slug}-hero-content]`);
  const visual = document.querySelector(`[data-${slug}-hero-visual]`);
  const cta = document.querySelector(`[data-${slug}-hero-cta]`);
  if (
    !(section instanceof HTMLElement) ||
    !(container instanceof HTMLElement) ||
    !(content instanceof HTMLElement) ||
    !(visual instanceof HTMLElement) ||
    !(cta instanceof HTMLElement)
  ) {
    return null;
  }
  const button = cta.querySelector("a");
  if (!(button instanceof HTMLAnchorElement)) {
    return null;
  }
  const image = visual.querySelector("img");
  const nodes = [section, container, content, visual, cta, button];
  const rects = [];
  for (const node of nodes) {
    const rect = node.getBoundingClientRect();
    rects.push({
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    });
  }
  const imageRect = image instanceof HTMLElement ? image.getBoundingClientRect() : null;
  return {
    rects,
    imageRect: imageRect
      ? { top: 0, bottom: 0, left: 0, right: 0, width: imageRect.width, height: imageRect.height }
      : null,
    buttonText: button.textContent,
    buttonOverflow: button.scrollWidth > button.clientWidth + 1,
    buttonEllipsis: getComputedStyle(button).textOverflow,
    viewportWidth: window.innerWidth,
  };
}

export function buildProductHeroMetrics(raw) {
  const boxes = [];
  for (const rect of raw.rects) {
    boxes.push(roundBox(rect));
  }
  const [sectionBox, containerBox, contentBox, visualBox, ctaBox, buttonBox] = boxes;
  const imageBox = raw.imageRect ? roundBox(raw.imageRect) : null;
  const containerCenter = containerBox.left + containerBox.width / 2;
  const buttonCenter = buttonBox.left + buttonBox.width / 2;
  return {
    contentTop: contentBox.top,
    contentBottom: contentBox.bottom,
    contentLeft: contentBox.left,
    contentRight: contentBox.right,
    visualTop: visualBox.top,
    visualBottom: visualBox.bottom,
    visualLeft: visualBox.left,
    visualRight: visualBox.right,
    ctaTop: ctaBox.top,
    buttonTop: buttonBox.top,
    buttonLeft: buttonBox.left,
    buttonWidth: buttonBox.width,
    buttonHeight: buttonBox.height,
    buttonCenterOffset: Math.abs(buttonCenter - containerCenter),
    buttonText: (raw.buttonText ?? "").replace(/\s+/g, " ").trim(),
    buttonOverflow: raw.buttonOverflow,
    buttonEllipsis: raw.buttonEllipsis === "ellipsis",
    imageWidth: imageBox ? imageBox.width : 0,
    imageHeight: imageBox ? imageBox.height : 0,
    sectionRight: sectionBox.right,
    buttonRight: buttonBox.right,
    viewportWidth: raw.viewportWidth,
  };
}
