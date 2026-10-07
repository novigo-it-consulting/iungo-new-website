export const LAYOUT_ROUTES = [
  "/",
  "/produtos/organizer",
  "/produtos/behavior",
  "/produtos/concierge",
  "/produtos/resolve",
  "/produtos/attendant",
  "/produtos/convert",
  "/produtos/iot",
  "/solicitar-demonstracao",
];

export const LAYOUT_LOCALES = [
  { id: "pt-BR", prefix: "" },
  { id: "en", prefix: "/en" },
  { id: "es", prefix: "/es" },
];

export const LAYOUT_WIDTHS = [375, 768, 1280, 1440];

/** Larguras extras só do Organizer, onde a tabela larga vazava a página. */
export const ORGANIZER_EXTRA_WIDTHS = [320, 396, 480];

export function layoutPath(prefix, route) {
  if (route === "/") {
    return prefix || "/";
  }

  return `${prefix}${route}`;
}

export function layoutJobKey(route, width) {
  return `${route}@${width}`;
}

export function compareControlHeights(baseline, current) {
  const grown = [];

  for (const key of Object.keys(current)) {
    const source = baseline[key];
    const next = current[key];
    if (!source || source.length !== next.length) {
      continue;
    }

    next.forEach((item, index) => {
      const previous = source[index];
      if (item.height > previous.height + 4) {
        grown.push({
          text: item.text,
          from: previous.height,
          to: item.height,
        });
      }
    });
  }

  return grown;
}
