/**
 * Rotas, larguras e seletores da auditoria visual.
 */
import path from "node:path";

import { AUDIT_TOOLS_DIR } from "./audit.shared.mjs";

export const AUDIT_REVIEW_DIR = path.join(AUDIT_TOOLS_DIR, "../review");

export const AUDIT_ROUTES = [
  "/",
  "/produtos/attendant",
  "/produtos/behavior",
  "/produtos/concierge",
  "/produtos/convert",
  "/produtos/iot",
  "/produtos/organizer",
  "/produtos/resolve",
  "/solicitar-demonstracao",
];

export const AUDIT_VIEWPORTS = [
  { name: "390", width: 390, height: 844 },
  { name: "1366", width: 1366, height: 768 },
  { name: "1920", width: 1920, height: 1080 },
];

export const AUDIT_OPTIONS = [
  { value: "audit-organizer", label: "Iungo Organizer (teste)" },
  { value: "audit-behavior", label: "Iungo Behavior (teste)" },
  { value: "audit-convert", label: "Iungo Convert (teste)" },
  { value: "audit-attendant", label: "Iungo Attendant (teste)" },
  { value: "audit-resolve", label: "Iungo Resolve (teste)" },
  { value: "audit-iot", label: "Iungo IoT (teste)" },
  { value: "audit-concierge", label: "Iungo Concierge (teste)" },
];

export const PRODUCT_INTEREST = "#request-demo-product-interest";
export const PRODUCT_LISTBOX = "#request-demo-product-interest-listbox";
export const PRODUCT_INTEREST_INPUT = 'input[name="productInterest"]';
export const PRODUCT_OPTION = '[role="option"]';

export const FONT_CAPTURES = [
  {
    route: "/produtos/convert",
    viewport: "1366",
    selectors: [
      "[data-convert-hero-icon]",
      "[data-convert-hero-title]",
      "[data-convert-testimonials]",
      "[data-footer-nav]",
    ],
  },
  {
    route: "/solicitar-demonstracao",
    viewport: "1366",
    selectors: [
      "h1#request-demo-title",
      "#request-demo-product-interest",
      "label[for='request-demo-name']",
    ],
  },
];

export function routeSlug(routePath) {
  return routePath === "/" ? "home" : routePath.replaceAll("/", "-").slice(1);
}
