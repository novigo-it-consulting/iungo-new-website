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

function isLocalEmailChar(char) {
  return /[A-Za-z0-9_+.-]/.test(char);
}

function isDomainEmailChar(char) {
  return /[A-Za-z0-9_.-]/.test(char);
}

function isEmailLetter(char) {
  return /[A-Za-z]/.test(char);
}

function domainBodyIsValid(domain, dot) {
  if (dot < 1) {
    return false;
  }

  for (let index = 0; index < dot; index += 1) {
    if (!isDomainEmailChar(domain[index])) {
      return false;
    }
  }

  return true;
}

function tldLength(domain, dot) {
  let letters = 0;
  let cursor = dot + 1;

  while (cursor < domain.length && isEmailLetter(domain[cursor])) {
    letters += 1;
    cursor += 1;
  }

  return letters;
}

function domainHasEmailEnding(domain) {
  let dot = domain.indexOf(".");

  while (dot !== -1) {
    const bodyOk = domainBodyIsValid(domain, dot);
    if (bodyOk && tldLength(domain, dot) >= 2) {
      return true;
    }
    if (!bodyOk) {
      return false;
    }
    dot = domain.indexOf(".", dot + 1);
  }

  return false;
}

/** Acha um e-mail no texto, sem a regex antiga que volta atrás. */
function containsEmailAddress(value) {
  let at = value.indexOf("@");

  while (at !== -1) {
    if (at > 0 && isLocalEmailChar(value[at - 1]) && domainHasEmailEnding(value.slice(at + 1))) {
      return true;
    }
    at = value.indexOf("@", at + 1);
  }

  return false;
}

export function isAllowlistedCopy(value) {
  if (EXACT_ALLOWLIST.has(value)) {
    return true;
  }

  if (containsEmailAddress(value) && !looksPortuguese(value)) {
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
