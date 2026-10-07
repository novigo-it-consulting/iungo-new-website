/**
 * Conferências de foco com o menu mobile aberto e fechado.
 */
export function recordIsolation(record, isolation) {
  record("open:root", isolation.rootFound, isolation);
  record("open:logo-inert", isolation.logoInert, isolation);
  record("open:footer-inert", isolation.footerInert, isolation);
  record("open:main-inert", isolation.mainInert, isolation);
  record("open:no-tabbable-outside", isolation.tabbableOutside.length === 0, isolation.tabbableOutside);
}

export function recordFocusStaysInside(record, checkName, stops, detailKeys) {
  const escaped = stops.filter((stop) => !stop.inside);
  record(checkName, escaped.length === 0, {
    [detailKeys.stops]: stops,
    [detailKeys.escaped]: escaped,
  });
}

export function recordClosedInert(record, closed) {
  record("closed:logo-not-inert", !closed.logoInert, closed);
  record("closed:panel-inert", closed.panelInert, closed);
  record("closed:footer-not-inert", !closed.footerInert, closed);
}

export function recordCloseSnapshot(record, prefix, snapshot) {
  record(`${prefix}:focus-on-trigger`, snapshot.label === "Abrir menu", snapshot);
  record(`${prefix}:panel-inert`, snapshot.panelInert, snapshot);
  record(`${prefix}:no-page-jump`, snapshot.scrollY === 0, snapshot);
}
