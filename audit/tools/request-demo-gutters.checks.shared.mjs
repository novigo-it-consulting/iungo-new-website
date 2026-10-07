/**
 * Conferências das margens laterais de Solicitar Demonstração.
 */
const SM_MIN_WIDTH = 640;
const ALIGN_TOLERANCE = 2;

function expectedGutter(layoutWidth) {
  if (layoutWidth >= 1328) {
    return Math.round((layoutWidth - 1264) / 2);
  }
  if (layoutWidth >= SM_MIN_WIDTH) {
    return 32;
  }
  return 24;
}

function recordAlignment(record, label, viewport, metrics) {
  const isDesktopColumns = viewport.width >= 1249;
  const stackedAligned =
    Math.abs(metrics.titleLeft - metrics.formLeft) <= ALIGN_TOLERANCE &&
    Math.abs(metrics.formLeft - metrics.cardsLeft) <= ALIGN_TOLERANCE;
  const desktopAligned = Math.abs(metrics.titleLeft - metrics.formLeft) <= ALIGN_TOLERANCE;
  record(`${label}:aligned-start`, isDesktopColumns ? desktopAligned : stackedAligned, {
    titleLeft: metrics.titleLeft,
    formLeft: metrics.formLeft,
    cardsLeft: metrics.cardsLeft,
  });
  if (!isDesktopColumns) {
    record(`${label}:stacked-mobile`, metrics.stacked === true, { stacked: metrics.stacked });
  }
  return isDesktopColumns;
}

function recordFrame(record, label, metrics) {
  const expected = expectedGutter(metrics.layoutWidth);
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
    Math.abs(metrics.frameLeft - (metrics.layoutWidth - metrics.frameRight)) <= 1,
    { left: metrics.frameLeft, right: metrics.layoutWidth - metrics.frameRight },
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
}

function recordCardsAndScroll(record, label, metrics) {
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
    record(`${label}:matches-header`, Math.abs(metrics.frameLeft - metrics.headerLeft) <= ALIGN_TOLERANCE, {
      frameLeft: metrics.frameLeft,
      headerLeft: metrics.headerLeft,
    });
  }
  record(`${label}:no-horizontal-scroll`, metrics.pageWidth <= metrics.layoutWidth + 1, {
    pageWidth: metrics.pageWidth,
    layoutWidth: metrics.layoutWidth,
  });
}

function recordContacts(record, label, metrics) {
  const contacts = Array.isArray(metrics.contacts) ? metrics.contacts : [];
  record(`${label}:contacts-inside-card`, contacts.filter((contact) => contact.overflow).length === 0, {
    overflowingContacts: contacts.filter((contact) => contact.overflow),
  });
  record(
    `${label}:emails-unbroken-when-they-fit`,
    contacts.filter((contact) => contact.wrapsUnnecessarily).length === 0,
    { fragmentedContacts: contacts.filter((contact) => contact.wrapsUnnecessarily) },
  );
}

export function recordGutterAssertions(record, viewport, metrics) {
  recordAlignment(record, viewport.name, viewport, metrics);
  recordFrame(record, viewport.name, metrics);
  recordCardsAndScroll(record, viewport.name, metrics);
  recordContacts(record, viewport.name, metrics);
}
