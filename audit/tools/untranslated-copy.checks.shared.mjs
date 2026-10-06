/** Textos iguais ao pt-BR que podem permanecer: marca, endereço e cognatos corretos em espanhol. */
const EXACT_ALLOWLIST = new Set([
  "AV. BRIG. FARIA LIMA, 1234 - CONJ. 111 - JARDIM PAULISTANO - SÃO PAULO, SP - 01451-913",
  "NOVIGO TECNOLOGIA DA INFORMAÇÃO S.A. - GRUPO CONTROLADOR",
  "comercial@iungo-ai.com",
  "suporte@iungo-ai.com",
  "Iungo",
  "Iungo Intelligence",
  "Raia Drogasil",
  "Cláudia B.",
  "Catálogo. Cliente.",
  "Newsletter técnica",
  "Blog técnico",
  "Métricas por etapa",
  "CATÁLOGO",
  "Briefing de handoff",
  "CRM Lead · Grupo de moda multimarca",
  "CMO · Grupo de moda premium · 6 marcas",
  "Multi-tenant para grandes redes",
]);

const PORTUGUESE_WORDS = new Set([
  "de",
  "da",
  "do",
  "das",
  "dos",
  "para",
  "com",
  "não",
  "uma",
  "em",
  "que",
  "por",
  "seu",
  "sua",
  "mais",
  "como",
  "sem",
  "nas",
  "nos",
  "ou",
  "ao",
  "aos",
  "pela",
  "pelo",
]);

export const COPY_ROUTES = [
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

export const COPY_LOCALES = [
  { id: "pt-BR", prefix: "" },
  { id: "en", prefix: "/en" },
  { id: "es", prefix: "/es" },
];

export function localePath(prefix, route) {
  if (route === "/") {
    return prefix || "/";
  }

  return `${prefix}${route}`;
}

export function looksPortuguese(value) {
  if (/[áàâãéêíóôõúç]/i.test(value)) {
    return true;
  }

  return value
    .toLowerCase()
    .split(/[^a-záàâãéêíóôõúç]+/i)
    .filter(Boolean)
    .some((word) => PORTUGUESE_WORDS.has(word));
}

export function isAllowlistedCopy(value) {
  if (EXACT_ALLOWLIST.has(value)) {
    return true;
  }

  if (/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(value) && !looksPortuguese(value)) {
    return true;
  }

  return /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(value);
}

export function identicalPortuguese(sourceTexts, localizedTexts) {
  const source = new Set(sourceTexts);
  const seen = new Set();
  const findings = [];

  for (const text of localizedTexts) {
    if (!source.has(text) || seen.has(text) || isAllowlistedCopy(text)) {
      continue;
    }

    if (!looksPortuguese(text)) {
      continue;
    }

    seen.add(text);
    findings.push(text);
  }

  return findings;
}
