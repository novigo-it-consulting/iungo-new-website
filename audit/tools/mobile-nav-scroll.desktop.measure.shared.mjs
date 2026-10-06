/**
 * Mede o menu desktop e o que acontece ao alargar a janela.
 * Funções enviadas ao page.evaluate.
 */
export function readDesktopNav() {
  const hamburger = document.querySelector('[aria-label="Abrir menu"]');
  const mobilePanel = document.getElementById("mobile-navigation-menu");
  const desktopTrigger = document.querySelector('[data-header-nav-item="solucoes"]');
  return {
    hamburgerHidden:
      !hamburger || (hamburger instanceof HTMLElement && hamburger.offsetParent === null),
    mobilePanelHidden:
      !mobilePanel ||
      getComputedStyle(mobilePanel).visibility === "hidden" ||
      getComputedStyle(mobilePanel).pointerEvents === "none",
    hasDesktopTrigger:
      desktopTrigger instanceof HTMLElement && desktopTrigger.offsetParent !== null,
  };
}

export function readMegaMenu() {
  const panel = document.querySelector("[data-solucoes-mega-menu-panel]");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const styles = getComputedStyle(panel);
  const rect = panel.getBoundingClientRect();
  const isPainted = (node) =>
    node instanceof HTMLElement &&
    getComputedStyle(node).display !== "none" &&
    node.getBoundingClientRect().height > 0;
  const descriptions = [...panel.querySelectorAll("[data-solucoes-mega-menu-product] p")];
  const categorySubtitles = [
    ...panel.querySelectorAll("[data-solucoes-mega-menu-category-header] p"),
  ];
  const viewLinks = [...panel.querySelectorAll("[data-solucoes-mega-menu-view-solution-link]")];
  const lists = [...panel.querySelectorAll("[data-solucoes-mega-menu-product-list]")];
  const hasMobileDividers = lists.some((list) => {
    const items = [...list.children].filter((node) => node instanceof HTMLElement);
    return items.some(
      (item, index) =>
        index < items.length - 1 &&
        Number.parseFloat(getComputedStyle(item).borderBottomWidth) > 0,
    );
  });
  return {
    visible: rect.height > 0 && styles.visibility !== "hidden",
    maxHeight: styles.maxHeight,
    overflowY: styles.overflowY,
    withinViewport: rect.bottom <= window.innerHeight + 1,
    descriptionCount: descriptions.length,
    visibleDescriptionCount: descriptions.filter(isPainted).length,
    subtitleCount: categorySubtitles.length,
    visibleSubtitleCount: categorySubtitles.filter(isPainted).length,
    viewLinkCount: viewLinks.length,
    visibleViewLinkCount: viewLinks.filter(isPainted).length,
    hasMobileDividers,
  };
}

export function readResizeLock() {
  return {
    bodyOverscroll: document.body.style.overscrollBehavior,
    hamburgerOpen: Boolean(document.querySelector('[aria-label="Fechar menu"]')),
  };
}

export function readAfterResize() {
  const panel = document.getElementById("mobile-navigation-menu");
  const hamburger = document.querySelector(
    '[aria-label="Abrir menu"], [aria-label="Fechar menu"]',
  );
  return {
    hamburgerHidden:
      !hamburger || (hamburger instanceof HTMLElement && hamburger.offsetParent === null),
    panelInert: Boolean(panel && (panel.inert === true || panel.hasAttribute("inert"))),
    bodyOverscroll: document.body.style.overscrollBehavior,
  };
}
