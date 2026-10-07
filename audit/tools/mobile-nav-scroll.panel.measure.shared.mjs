/**
 * Mede o painel do menu mobile fechado, rolado e depois de fechar.
 * Funções enviadas ao page.evaluate.
 */
export function readCollapsedBanner() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const demo = [...panel.querySelectorAll("a, span")].find(
    (element) => element.textContent?.trim() === "Solicitar Demonstração",
  );
  if (!(demo instanceof HTMLElement)) {
    return null;
  }
  const group = document.querySelector("#mobile-solucoes-nav-group");
  const details = group ? group.closest("details") : null;
  const panelRect = panel.getBoundingClientRect();
  const demoRect = demo.getBoundingClientRect();
  return {
    solucoesOpen: details instanceof HTMLDetailsElement && details.open,
    panelBottom: Math.round(panelRect.bottom),
    demoBottom: Math.round(demoRect.bottom),
    viewportHeight: window.innerHeight,
    gapBelowButtons: Math.round(panelRect.bottom - demoRect.bottom),
    unusedViewport: Math.round(window.innerHeight - panelRect.bottom),
  };
}

export function readPanelBox() {
  const panel = document.getElementById("mobile-navigation-menu");
  if (!(panel instanceof HTMLElement)) {
    return null;
  }
  const rect = panel.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: Math.min(rect.top + Math.max(rect.height / 2, 40), window.innerHeight - 24),
  };
}

export function readScrollBack() {
  const panel = document.getElementById("mobile-navigation-menu");
  const summary = panel ? panel.querySelector("summary") : null;
  if (!(panel instanceof HTMLElement) || !(summary instanceof HTMLElement)) {
    return { scrollTop: null, summaryVisible: false };
  }
  const rect = summary.getBoundingClientRect();
  return {
    scrollTop: panel.scrollTop,
    summaryVisible:
      rect.top >= panel.getBoundingClientRect().top - 1 && rect.bottom <= window.innerHeight + 1,
  };
}

export function readClosedMenu() {
  const panel = document.getElementById("mobile-navigation-menu");
  const panelStyle = panel ? getComputedStyle(panel) : null;
  return {
    bodyOverflow: document.body.style.overflow,
    htmlOverflow: document.documentElement.style.overflow,
    bodyOverscroll: document.body.style.overscrollBehavior,
    pointerEvents: panelStyle ? panelStyle.pointerEvents : null,
    inert: Boolean(panel && (panel.inert === true || panel.hasAttribute("inert"))),
    ariaHidden: panel ? panel.getAttribute("aria-hidden") : null,
  };
}

export function expandSolucoesInPage() {
  const group = document.querySelector("#mobile-solucoes-nav-group");
  const details = group ? group.closest("details") : null;
  if (details) {
    details.setAttribute("open", "");
  }
  const summary = document.querySelector("#mobile-navigation-menu summary");
  const summaryDetails = summary ? summary.closest("details") : null;
  if (
    summary instanceof HTMLElement &&
    summaryDetails instanceof HTMLDetailsElement &&
    !summaryDetails.open
  ) {
    summary.click();
  }
}

export function toggleDetailsBeforeClose() {
  const group = document.querySelector("#mobile-solucoes-nav-group");
  const details = group ? group.closest("details") : null;
  if (details instanceof HTMLDetailsElement) {
    details.open = false;
    details.open = true;
  }
}
