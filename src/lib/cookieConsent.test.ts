import { describe, expect, it } from "vitest";

import {
  COOKIE_CONSENT_FORMAT_VERSION,
  COOKIE_CONSENT_MAX_AGE_MS,
  COOKIE_CONSENT_POLICY_VERSION,
  COOKIE_CONSENT_STORAGE_KEY,
  createAcceptAllRecord,
  createRejectNonEssentialRecord,
  getRecordedConsentChoice,
  isConsentRecordCurrentlyValid,
  parseConsentRecord,
  readConsentRecord,
  writeConsentRecord,
  type CookieConsentRecord,
  type KeyValueStorage,
} from "./cookieConsent";

const NOW = Date.parse("2026-09-18T12:00:00.000Z");
const DAY_MS = 24 * 60 * 60 * 1000;

class MemoryStorage implements KeyValueStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

class ThrowingStorage implements KeyValueStorage {
  getItem(): string | null {
    throw new Error("storage blocked");
  }

  setItem(): void {
    throw new Error("storage blocked");
  }
}

function validRecord(
  overrides: Partial<CookieConsentRecord> = {},
): CookieConsentRecord {
  return {
    formatVersion: COOKIE_CONSENT_FORMAT_VERSION,
    policyVersion: COOKIE_CONSENT_POLICY_VERSION,
    decidedAt: new Date(NOW).toISOString(),
    categories: { necessary: true },
    ...overrides,
  };
}

describe("parseConsentRecord", () => {
  it("aceita um registro válido", () => {
    expect(parseConsentRecord(validRecord(), { now: NOW })).toEqual(
      validRecord(),
    );
  });

  it("rejeita valores ausentes ou que não são objeto", () => {
    expect(parseConsentRecord(null, { now: NOW })).toBeNull();
    expect(parseConsentRecord(undefined, { now: NOW })).toBeNull();
    expect(parseConsentRecord("aceito", { now: NOW })).toBeNull();
    expect(parseConsentRecord([], { now: NOW })).toBeNull();
  });

  it("rejeita JSON estruturalmente inválido", () => {
    expect(
      parseConsentRecord(
        { ...validRecord(), formatVersion: "1" },
        { now: NOW },
      ),
    ).toBeNull();
    expect(
      parseConsentRecord({ ...validRecord(), decidedAt: 123 }, { now: NOW }),
    ).toBeNull();
    expect(
      parseConsentRecord(
        { ...validRecord(), categories: { necessary: false } },
        { now: NOW },
      ),
    ).toBeNull();
  });

  it("rejeita data inválida", () => {
    expect(
      parseConsentRecord(
        { ...validRecord(), decidedAt: "ontem" },
        { now: NOW },
      ),
    ).toBeNull();
  });

  it("rejeita registro expirado", () => {
    const decidedAt = new Date(NOW - COOKIE_CONSENT_MAX_AGE_MS - 1).toISOString();

    expect(
      parseConsentRecord({ ...validRecord(), decidedAt }, { now: NOW }),
    ).toBeNull();
  });

  it("aceita registro ainda dentro do prazo técnico", () => {
    const decidedAt = new Date(NOW - COOKIE_CONSENT_MAX_AGE_MS + DAY_MS).toISOString();

    expect(
      parseConsentRecord({ ...validRecord(), decidedAt }, { now: NOW }),
    ).not.toBeNull();
  });

  it("rejeita versão de formato ou de política diferente", () => {
    expect(
      parseConsentRecord(validRecord(), { now: NOW, formatVersion: 2 }),
    ).toBeNull();
    expect(
      parseConsentRecord(validRecord(), { now: NOW, policyVersion: 2 }),
    ).toBeNull();
  });

  it("não autoriza chaves extras como categorias concedidas", () => {
    const parsed = parseConsentRecord(
      {
        ...validRecord(),
        categories: { necessary: true, analytics: true, marketing: true },
      },
      { now: NOW },
    );

    expect(parsed?.categories).toEqual({ necessary: true });
  });

  it("não infere aceite total só porque não há categorias opcionais", () => {
    const parsed = parseConsentRecord(validRecord(), { now: NOW });

    expect(parsed?.categories).toEqual({ necessary: true });
    expect(getRecordedConsentChoice(parsed)).toBeNull();
  });

  it("preserva escolha explícita e ignora valor inválido sem invalidar o registro", () => {
    expect(
      getRecordedConsentChoice(
        parseConsentRecord(
          { ...validRecord(), choice: "accept-all" },
          { now: NOW },
        ),
      ),
    ).toBe("accept-all");

    const parsed = parseConsentRecord(
      { ...validRecord(), choice: "todos" },
      { now: NOW },
    );

    expect(parsed).not.toBeNull();
    expect(getRecordedConsentChoice(parsed)).toBeNull();
  });
});

describe("ações de consentimento", () => {
  it("aceitar e rejeitar geram as mesmas permissões enquanto não há categorias opcionais, mas registram escolhas distintas", () => {
    const accepted = createAcceptAllRecord(NOW);
    const rejected = createRejectNonEssentialRecord(NOW);

    expect(accepted.categories).toEqual({ necessary: true });
    expect(rejected.categories).toEqual({ necessary: true });
    expect(accepted.choice).toBe("accept-all");
    expect(rejected.choice).toBe("reject-non-essential");
  });
});

describe("readConsentRecord e writeConsentRecord", () => {
  it("persiste e relê uma decisão válida", () => {
    const storage = new MemoryStorage();
    const record = createRejectNonEssentialRecord(NOW);

    expect(writeConsentRecord(storage, record)).toBe(true);
    expect(readConsentRecord(storage, { now: NOW })).toEqual(record);
    expect(storage.getItem(COOKIE_CONSENT_STORAGE_KEY)).toContain(
      '"necessary":true',
    );
  });

  it("rejeita registro persistido expirado", () => {
    const storage = new MemoryStorage();
    const expired = createAcceptAllRecord(NOW - COOKIE_CONSENT_MAX_AGE_MS - 1);

    expect(writeConsentRecord(storage, expired)).toBe(true);
    expect(readConsentRecord(storage, { now: NOW })).toBeNull();
  });

  it("trata JSON inválido como ausência de decisão", () => {
    const storage = new MemoryStorage();
    storage.setItem(COOKIE_CONSENT_STORAGE_KEY, "{não-json");

    expect(readConsentRecord(storage, { now: NOW })).toBeNull();
  });

  it("trata storage indisponível sem lançar", () => {
    const storage = new ThrowingStorage();

    expect(readConsentRecord(storage, { now: NOW })).toBeNull();
    expect(writeConsentRecord(storage, createAcceptAllRecord(NOW))).toBe(false);
  });
});

describe("isConsentRecordCurrentlyValid", () => {
  it("invalida uma decisão já lida quando o prazo técnico passa", () => {
    const record = createAcceptAllRecord(NOW);

    expect(isConsentRecordCurrentlyValid(record, { now: NOW })).toBe(true);
    expect(
      isConsentRecordCurrentlyValid(record, {
        now: NOW + COOKIE_CONSENT_MAX_AGE_MS + 1,
      }),
    ).toBe(false);
  });

  it("rejeita registro nulo", () => {
    expect(isConsentRecordCurrentlyValid(null, { now: NOW })).toBe(false);
  });
});
