import { afterEach, describe, expect, it, vi } from "vitest";

import {
  classifyFormSubmitResponse,
  FORMSUBMIT_ENDPOINT,
  FORMSUBMIT_MESSAGES,
  FORMSUBMIT_POST_HEADERS,
  isFormSubmitActivationMessage,
  isFormSubmitExplicitFailure,
  isFormSubmitSuccess,
  sendRequestDemoEmail,
  toFormSubmitBody,
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

function readPostedParams(init: RequestInit): URLSearchParams {
  const { body } = init;

  if (body instanceof URLSearchParams) {
    return body;
  }

  if (typeof body === "string") {
    return new URLSearchParams(body);
  }

  throw new Error("expected urlencoded body");
}

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

function failure(
  reason: "activation" | "rejection" | "timeout" | "uncertain" | "in-flight",
) {
  const message = {
    activation: FORMSUBMIT_MESSAGES.activation,
    rejection: FORMSUBMIT_MESSAGES.rejection,
    timeout: FORMSUBMIT_MESSAGES.timeout,
    uncertain: FORMSUBMIT_MESSAGES.unconfirmed,
    "in-flight": FORMSUBMIT_MESSAGES.inFlight,
  }[reason];

  return { ok: false as const, message, reason };
}

describe("isFormSubmitSuccess", () => {
  it("retorna true para success: true (booleano)", () => {
    expect(isFormSubmitSuccess({ success: true })).toBe(true);
  });

  it("retorna true para success: \"true\" (string)", () => {
    expect(isFormSubmitSuccess({ success: "true" })).toBe(true);
  });

  it("retorna false para success: false e \"false\"", () => {
    expect(isFormSubmitSuccess({ success: false })).toBe(false);
    expect(isFormSubmitSuccess({ success: "false" })).toBe(false);
  });

  it("retorna false quando success está ausente ou o corpo não é objeto", () => {
    expect(isFormSubmitSuccess({})).toBe(false);
    expect(isFormSubmitSuccess("string")).toBe(false);
    expect(isFormSubmitSuccess(null)).toBe(false);
  });
});

describe("isFormSubmitExplicitFailure", () => {
  it("reconhece success falso e não trata ausente como recusa", () => {
    expect(isFormSubmitExplicitFailure({ success: false })).toBe(true);
    expect(isFormSubmitExplicitFailure({ success: "false" })).toBe(true);
    expect(isFormSubmitExplicitFailure({})).toBe(false);
    expect(isFormSubmitExplicitFailure({ success: true })).toBe(false);
  });
});

describe("isFormSubmitActivationMessage", () => {
  it("reconhece a mensagem real de Activate Form", () => {
    expect(
      isFormSubmitActivationMessage(
        "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!",
      ),
    ).toBe(true);
  });

  it("não trata recusa genérica como ativação", () => {
    expect(isFormSubmitActivationMessage("Rejected by spam filter")).toBe(
      false,
    );
  });
});

describe("FORMSUBMIT_MESSAGES", () => {
  it("separa rejeição, timeout e ativação sem instruir o visitante a ativar", () => {
    expect(FORMSUBMIT_MESSAGES.rejection).not.toBe(FORMSUBMIT_MESSAGES.timeout);
    expect(FORMSUBMIT_MESSAGES.timeout).not.toBe(FORMSUBMIT_MESSAGES.activation);
    expect(FORMSUBMIT_MESSAGES.activation).not.toBe(
      FORMSUBMIT_MESSAGES.rejection,
    );
    expect(FORMSUBMIT_MESSAGES.activation).not.toMatch(/ativar/i);
    expect(FORMSUBMIT_MESSAGES.timeout).toContain("comercial@iungo-ai.com");
    expect(FORMSUBMIT_MESSAGES.rejection).toContain("comercial@iungo-ai.com");
    expect(FORMSUBMIT_MESSAGES.activation).toContain("comercial@iungo-ai.com");
  });
});

describe("classifyFormSubmitResponse", () => {
  it("sucesso confirmado: HTTP 200 e success true", () => {
    expect(classifyFormSubmitResponse(200, { success: true }, false)).toEqual({
      ok: true,
    });
    expect(
      classifyFormSubmitResponse(200, { success: "true" }, false),
    ).toEqual({ ok: true });
  });

  it("não trata HTTP 200 como sucesso quando success é false", () => {
    expect(
      classifyFormSubmitResponse(
        200,
        { success: "false", message: "Rejected by spam filter" },
        false,
      ),
    ).toEqual(failure("rejection"));
  });

  it("classifica ativação só com a mensagem explícita do serviço", () => {
    const result = classifyFormSubmitResponse(
      200,
      {
        success: "false",
        message:
          "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be actived!",
      },
      false,
    );

    expect(result).toEqual(failure("activation"));
    expect("message" in result && result.message).not.toMatch(/ativar/i);
  });

  it("rejeição: HTTP 4xx", () => {
    expect(classifyFormSubmitResponse(400, {}, false)).toEqual(
      failure("rejection"),
    );
    expect(classifyFormSubmitResponse(429, {}, true)).toEqual(
      failure("rejection"),
    );
  });

  it("incerto: HTTP 5xx, JSON inválido ou success ausente", () => {
    expect(classifyFormSubmitResponse(500, { success: true }, false)).toEqual(
      failure("uncertain"),
    );
    expect(classifyFormSubmitResponse(200, {}, false)).toEqual(
      failure("uncertain"),
    );
    expect(classifyFormSubmitResponse(200, undefined, true)).toEqual(
      failure("uncertain"),
    );
  });
});

describe("sendRequestDemoEmail", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    vi.stubGlobal("fetch", originalFetch);
    vi.restoreAllMocks();
  });

  it("sucesso: HTTP 200 e success true", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, { success: true })));
    expect((await sendRequestDemoEmail(makePayload())).ok).toBe(true);
  });

  it("sucesso: HTTP 200 e success \"true\"", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(200, { success: "true" })),
    );
    expect((await sendRequestDemoEmail(makePayload())).ok).toBe(true);
  });

  it("ativação explícita não vira instrução na UI do visitante", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          success: "false",
          message:
            "This form needs Activation. We've sent you an email containing an 'Activate Form' link.",
        }),
      ),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result).toEqual(failure("activation"));
  });

  it("rejeição explícita: success false genérico", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse(200, {
          success: false,
          message: "Rejected by spam filter",
        }),
      ),
    );

    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("rejection"),
    );
  });

  it("rejeição: HTTP 400 e 429", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(400, {})));
    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("rejection"),
    );

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(429, {})));
    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("rejection"),
    );
  });

  it("incerto: erro de rede", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );

    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("uncertain"),
    );
  });

  it("timeout: AbortError usa mensagem distinta, sem hipótese de ativação", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("aborted", "AbortError")),
    );

    const result = await sendRequestDemoEmail(makePayload());

    expect(result).toEqual(failure("timeout"));
    expect("message" in result && result.message).not.toMatch(/ativa/i);
    expect(result).not.toEqual(failure("rejection"));
    expect(result).not.toEqual(failure("activation"));
  });

  it("incerto: HTTP 500 e JSON inválido", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(500, { success: false })),
    );
    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("uncertain"),
    );

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
    expect(await sendRequestDemoEmail(makePayload())).toEqual(
      failure("uncertain"),
    );
  });

  it("bloqueia clique duplicado enquanto o envio está em curso", async () => {
    let release!: (value: unknown) => void;
    const pending = new Promise((resolve) => {
      release = resolve;
    });
    const mockFetch = vi.fn().mockReturnValue(pending);
    vi.stubGlobal("fetch", mockFetch);

    const first = sendRequestDemoEmail(makePayload());
    const second = await sendRequestDemoEmail(makePayload());

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(second).toEqual(failure("in-flight"));

    release(jsonResponse(200, { success: true }));
    expect((await first).ok).toBe(true);
  });

  it("envia POST urlencoded sem Origin/Referer inventados, para não disparar OPTIONS", async () => {
    const mockFetch = vi.fn().mockResolvedValue(jsonResponse(200, { success: true }));
    vi.stubGlobal("fetch", mockFetch);

    const payload = makePayload({
      "TELEFONE / WHATSAPP": "11999999999",
      MENSAGEM: "Olá",
    });
    await sendRequestDemoEmail(payload);

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FORMSUBMIT_ENDPOINT);
    expect(url).toContain("comercial@iungo-ai.com");
    expect(init.method).toBe("POST");

    const posted = readPostedParams(init);
    expect(posted.get("NOME")).toBe(payload.NOME);
    expect(posted.get("EMAIL CORPORATIVO")).toBe(payload["EMAIL CORPORATIVO"]);
    expect(posted.get("_honey")).toBe("");
    expect(posted.get("TELEFONE / WHATSAPP")).toBe("11999999999");
    expect(posted.get("MENSAGEM")).toBe("Olá");
    expect(posted.get("email")).toBeNull();
    expect(posted.get("to")).toBeNull();

    const headers = init.headers as Record<string, string>;
    expect(headers["Content-Type"]).toBe(FORMSUBMIT_POST_HEADERS["Content-Type"]);
    expect(headers["Content-Type"]).not.toContain("application/json");
    expect(headers.Accept).toBe("application/json");
    expect(headers).not.toHaveProperty("Origin");
    expect(headers).not.toHaveProperty("Referer");
  });

  it("não inclui o destinatário no body e encaminha _honey", async () => {
    const mockFetch = vi.fn().mockResolvedValue(jsonResponse(200, { success: true }));
    vi.stubGlobal("fetch", mockFetch);

    await sendRequestDemoEmail(makePayload({ _honey: "bot-value" }));

    const posted = readPostedParams(
      (mockFetch.mock.calls[0] as [string, RequestInit])[1],
    );

    expect(posted.get("email")).toBeNull();
    expect(posted.get("to")).toBeNull();
    expect(posted.get("_to")).toBeNull();
    expect(posted.get("_honey")).toBe("bot-value");
  });
});

describe("toFormSubmitBody", () => {
  it("omite opcionais ausentes e mantém honeypot vazio", () => {
    const params = toFormSubmitBody(makePayload());

    expect(params.get("_template")).toBe("table");
    expect(params.get("_honey")).toBe("");
    expect(params.get("TELEFONE / WHATSAPP")).toBeNull();
    expect(params.get("PRODUTO DE INTERESSE")).toBeNull();
    expect(params.get("MENSAGEM")).toBeNull();
  });
});
