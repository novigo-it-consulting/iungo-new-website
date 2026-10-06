/**
 * Cada função abaixo é enviada sozinha ao page.evaluate.
 * Por isso o código do navegador fica inteiro dentro da função,
 * sem chamar outras funções deste arquivo.
 */
export function readExpandedPanel() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const panelRect = panel.getBoundingClientRect();
  const styles = getComputedStyle(panel);
  const logo = document.querySelector("[data-header-logo]");
  const closeButton = document.querySelector('[aria-label="Fechar menu"]');
  const logoRect = logo instanceof HTMLElement ? logo.getBoundingClientRect() : null;
  const closeRect = closeButton instanceof HTMLElement ? closeButton.getBoundingClientRect() : null;
  return {
    overflowY: styles.overflowY,
    overscroll: styles.overscrollBehavior,
    position: styles.position,
    top: styles.top,
    bottom: styles.bottom,
    clientHeight: panel.clientHeight,
    scrollHeight: panel.scrollHeight,
    scrollTop: panel.scrollTop,
    panelTop: panelRect.top,
    panelBottom: panelRect.bottom,
    viewportHeight: window.innerHeight,
    logoRect: logoRect ? { top: logoRect.top, bottom: logoRect.bottom } : null,
    closeHeight: closeRect ? closeRect.height : null,
    docWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverscroll: document.body.style.overscrollBehavior,
  };
}

export function readOneLabel(label) {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return { missing: true };
  }
  let element = null;
  for (const candidate of panel.querySelectorAll("a, span, button")) {
    if (candidate.textContent?.trim() === label) {
      element = candidate;
      break;
    }
  }
  if (!(element instanceof HTMLElement)) {
    return { missing: true };
  }
  const rect = element.getBoundingClientRect();
  const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
  return {
    missing: false,
    top: rect.top,
    bottom: rect.bottom,
    height: rect.height,
    clickable: Boolean(hit && element.contains(hit)),
  };
}

export function readExpandedCards() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const productCards = [...panel.querySelectorAll("[data-solucoes-mega-menu-product]")];
  const descriptionDisplays = [];
  let titlesPresent = true;
  let minCardHeight = null;
  for (const card of productCards) {
    const description = card.querySelector("p");
    const display = description instanceof HTMLElement ? getComputedStyle(description).display : "missing";
    descriptionDisplays.push(display);
    if ((card.textContent ?? "").trim().length === 0) {
      titlesPresent = false;
    }
    if (card instanceof HTMLElement) {
      const height = card.getBoundingClientRect().height;
      minCardHeight = minCardHeight === null ? height : Math.min(minCardHeight, height);
    }
  }
  return {
    descriptionDisplays,
    titlesPresent,
    minCardHeight,
    productCount: productCards.length,
  };
}

export function readExpandedDisplays() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const subtitleDisplays = [];
  for (const node of panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p")) {
    subtitleDisplays.push(node instanceof HTMLElement ? getComputedStyle(node).display : "visible");
  }
  const viewDisplays = [];
  for (const node of panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]")) {
    viewDisplays.push(node instanceof HTMLElement ? getComputedStyle(node).display : "visible");
  }
  return { subtitleDisplays, viewDisplays };
}

export function readExpandedDividers() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const dividerLists = [];
  for (const list of panel.querySelectorAll("[data-solucoes-mega-menu-product-list]")) {
    if (!(list instanceof HTMLElement)) {
      dividerLists.push(null);
      continue;
    }
    const widths = [];
    for (const item of list.children) {
      if (item instanceof HTMLElement) {
        widths.push(Number.parseFloat(getComputedStyle(item).borderBottomWidth));
      }
    }
    dividerLists.push(widths);
  }
  return dividerLists;
}
