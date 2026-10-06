export const MESSAGE_NAMESPACES = [
  "metadata",
  "header",
  "megaMenu",
  "mobileNav",
  "footer",
  "footerNewsletter",
  "cookies",
  "languageSelector",
  "products",
  "common",
  "home",
  "productPages",
] as const;

export type MessageNamespace = (typeof MESSAGE_NAMESPACES)[number];

/** Namespaces usados por Client Components. O restante fica no servidor. */
export const CLIENT_MESSAGE_NAMESPACES = [
  "header",
  "megaMenu",
  "mobileNav",
  "footerNewsletter",
  "cookies",
  "languageSelector",
  "products",
  "common",
] as const satisfies readonly MessageNamespace[];

export type ClientMessageNamespace = (typeof CLIENT_MESSAGE_NAMESPACES)[number];
