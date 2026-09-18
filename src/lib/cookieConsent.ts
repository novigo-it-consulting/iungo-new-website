/**
 * Preferências locais de cookies no navegador.
 *
 * COOKIE_CONSENT_MAX_AGE_MS (365 dias) é uma escolha técnica configurável,
 * não um prazo legal da ANPD nem da política institucional (ainda inexistente).
 * Pendente de validação do responsável.
 *
 * O registro no localStorage representa a escolha neste dispositivo.
 * Não é uma trilha de auditoria centralizada.
 *
 * Categorias opcionais conhecidas hoje: nenhuma. Aceitar todos e rejeitar
 * cookies não necessários persistem a mesma decisão até existir integração.
 */

export const COOKIE_CONSENT_STORAGE_KEY = "iungo.cookie-consent";
export const COOKIE_CONSENT_FORMAT_VERSION = 1;
export const COOKIE_CONSENT_POLICY_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const CLOCK_SKEW_MS = 60_000;

export const COOKIE_CONSENT_CHOICES = [
  "accept-all",
  "reject-non-essential",
] as const;

export type CookieConsentChoice = (typeof COOKIE_CONSENT_CHOICES)[number];

export type CookieConsentCategories = {
  necessary: true;
};

export type CookieConsentRecord = {
  formatVersion: number;
  policyVersion: number;
  decidedAt: string;
  categories: CookieConsentCategories;
  /**
   * Escolha explícita do titular. Ausente em registros antigos.
   * Não deve ser inferida só porque não há categorias opcionais.
   */
  choice?: CookieConsentChoice;
};

export type CookieConsentParseOptions = {
  now?: number;
  formatVersion?: number;
  policyVersion?: number;
  maxAgeMs?: number;
};

export type KeyValueStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function resolveParseOptions(options: CookieConsentParseOptions = {}) {
  return {
    now: options.now ?? Date.now(),
    formatVersion: options.formatVersion ?? COOKIE_CONSENT_FORMAT_VERSION,
    policyVersion: options.policyVersion ?? COOKIE_CONSENT_POLICY_VERSION,
    maxAgeMs: options.maxAgeMs ?? COOKIE_CONSENT_MAX_AGE_MS,
  };
}

function parseChoice(value: unknown): CookieConsentChoice | undefined {
  if (value === "accept-all" || value === "reject-non-essential") {
    return value;
  }

  return undefined;
}

export function getRecordedConsentChoice(
  record: CookieConsentRecord | null,
): CookieConsentChoice | null {
  return record?.choice ?? null;
}

function parseCategories(value: unknown): CookieConsentCategories | null {
  if (!isRecord(value) || value.necessary !== true) {
    return null;
  }

  return { necessary: true };
}

export function parseConsentRecord(
  value: unknown,
  options: CookieConsentParseOptions = {},
): CookieConsentRecord | null {
  const parsedOptions = resolveParseOptions(options);

  if (!isRecord(value)) {
    return null;
  }

  if (value.formatVersion !== parsedOptions.formatVersion) {
    return null;
  }

  if (value.policyVersion !== parsedOptions.policyVersion) {
    return null;
  }

  if (typeof value.decidedAt !== "string") {
    return null;
  }

  const decidedAtMs = Date.parse(value.decidedAt);

  if (!Number.isFinite(decidedAtMs)) {
    return null;
  }

  if (decidedAtMs > parsedOptions.now + CLOCK_SKEW_MS) {
    return null;
  }

  if (parsedOptions.now - decidedAtMs > parsedOptions.maxAgeMs) {
    return null;
  }

  const categories = parseCategories(value.categories);

  if (!categories) {
    return null;
  }

  const choice = parseChoice(value.choice);

  return {
    formatVersion: parsedOptions.formatVersion,
    policyVersion: parsedOptions.policyVersion,
    decidedAt: new Date(decidedAtMs).toISOString(),
    categories,
    ...(choice ? { choice } : {}),
  };
}

export function isConsentRecordCurrentlyValid(
  record: CookieConsentRecord | null,
  options: CookieConsentParseOptions = {},
): record is CookieConsentRecord {
  return parseConsentRecord(record, options) !== null;
}

function createRecord(
  now: number,
  choice: CookieConsentChoice,
): CookieConsentRecord {
  return {
    formatVersion: COOKIE_CONSENT_FORMAT_VERSION,
    policyVersion: COOKIE_CONSENT_POLICY_VERSION,
    decidedAt: new Date(now).toISOString(),
    categories: { necessary: true },
    choice,
  };
}

export function createAcceptAllRecord(now: number): CookieConsentRecord {
  return createRecord(now, "accept-all");
}

export function createRejectNonEssentialRecord(
  now: number,
): CookieConsentRecord {
  return createRecord(now, "reject-non-essential");
}

/**
 * Lê e valida o registro persistido (estrutura, versão e expiração).
 * Retorna null quando o JSON é inválido, está expirado ou o storage falha.
 */
export function readConsentRecord(
  storage: KeyValueStorage,
  options: CookieConsentParseOptions = {},
): CookieConsentRecord | null {
  let raw: string | null;

  try {
    raw = storage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }

  if (typeof raw !== "string" || raw.length === 0) {
    return null;
  }

  try {
    return parseConsentRecord(JSON.parse(raw), options);
  } catch {
    return null;
  }
}

export function writeConsentRecord(
  storage: KeyValueStorage,
  record: CookieConsentRecord,
): boolean {
  try {
    storage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}
