import { afterEach, describe, expect, it, vi } from "vitest";

import {
  FORMSUBMIT_ENDPOINT,
  isFormSubmitSuccess,
  sendRequestDemoEmail,
  type RequestDemoSubmitPayload,
} from "./formsubmit";

function makePayload(
  overrides: Partial<RequestDemoSubmitPayload> = {},
): RequestDemoSubmitPayload {
  return {
    "TIPO DE CONTATO": "Demonstração",
    NOME: "Ana Silva",
    "EMAIL CORPORATIVO": "ana@empresa.com.br",
    EMPRESA: "Empresa Exemplo",
    _replyto: "ana@empresa.com.br",
    _subject: "Nova solicitação pelo site — Demonstração",
    _template: "table",
    _honey: "",
    ...overrides,
  };
}

// ----- isFormSubmitSuccess -----

describe("isFormSubmitSuccess", () => {
  it("retorna true para success: true (booleano)", () => {
    expect(isFormSubmitSuccess({ success: true })).toBe(true);
  });

  it("retorna true para success: \"true\" (string)", () => {
    expect(isFormSubmitSuccess({ success: "true" })).toBe(true);
  });

  it("retorna false para success: false", () => {
    expect(isFormSubmitSuccess({ success: false })).toBe(false);
  });

  it("retorna false para success: \"false\" (sem falso positivo por Boolean)", () => {
    expect(isFormSubmitSuccess({ success: "false" })).toBe(false);
  });

  it("retorna false quando success está ausente", () => {
    expect(isFormSubmitSuccess({})).toBe(false);
  });

  it("retorna false para corpo não-objeto", () => {
    expect(isFormSubmitSuccess("string")).toBe(false);
    expect(isFormSubmitSuccess(null)).toBe(false);
    expect(isFormSubmitSuccess(42)).toBe(false);
  });
});

// ----- sendRequestDemoEmail -----
//
// Classificação esperada:
//   SUCESSO   — response.ok E success === true | "true"
//   REJEIÇÃO  — HTTP 4xx  (o serviço recusou a solicitação)
//   INCERTO   — fetch lançou, HTTP 5xx, JSON inválido, success ausente/inesperado

describe("sendRequestDemoEmail", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    vi.stubGlobal("fetch", originalFetch);
    vi.restoreAllMocks();
  });

  // ── Sucesso ──────────────────────────────────────────────────────────────

  it("sucesso: HTTP 200 e success: true (booleano)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: true }),
      }),
    );

    expect((await sendRequestDemoEmail(makePayload())).ok).toBe(true);
  });

  it("sucesso: HTTP 200 e success: \"true\" (string)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: "true" }),
      }),
    );

    expect((await sendRequestDemoEmail(makePayload())).ok).toBe(true);
  });

  // ── Rejeição explícita (HTTP 4xx — serviço recusou a solicitação) ─────────

  it("rejeição: HTTP 400 (Bad Request)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({}),
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/enviar sua mensagem/i);
  });

  it("rejeição: HTTP 429 (Too Many Requests)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: async () => ({}),
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/enviar sua mensagem/i);
  });

  // ── Resultado incerto (não transformar ausência de confirmação em rejeição) ──

  it("incerto: fetch lançou (erro de rede — TypeError)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  it("incerto: fetch lançou (AbortError — timeout)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("aborted", "AbortError")),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  it("incerto: HTTP 500 (erro interno do servidor)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ success: false }),
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  it("incerto: corpo não-JSON (servidor respondeu com HTML ou texto)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError("Unexpected token");
        },
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  it("incerto: success ausente no corpo", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({}),
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  it("incerto: success com valor inesperado (success: \"false\" — não é rejeição confirmada)", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ success: "false" }),
      }),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result.ok).toBe(false);
    expect("message" in result && result.message).toMatch(/confirmar o envio/i);
  });

  // ── Integridade do payload ────────────────────────────────────────────────

  it("envia para o endpoint correto via POST com JSON", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const payload = makePayload();
    await sendRequestDemoEmail(payload);

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FORMSUBMIT_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toMatchObject(payload);
  });

  it("não inclui o destinatário no body enviado", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await sendRequestDemoEmail(makePayload());

    const body = JSON.parse(
      (mockFetch.mock.calls[0] as [string, RequestInit])[1].body as string,
    ) as Record<string, unknown>;

    expect(body).not.toHaveProperty("email");
    expect(body).not.toHaveProperty("to");
    expect(body).not.toHaveProperty("_to");
  });

  it("encaminha _honey sem sobrescrever", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const payload = makePayload({ _honey: "bot-value" });
    await sendRequestDemoEmail(payload);

    const body = JSON.parse(
      (mockFetch.mock.calls[0] as [string, RequestInit])[1].body as string,
    ) as Record<string, unknown>;

    expect(body._honey).toBe("bot-value");
  });
});
