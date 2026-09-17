import { describe, expect, it } from "vitest";

import {
  mapRequestDemoPayload,
  REQUEST_DEMO_FIELD_LIMITS,
  REQUEST_DEMO_MESSAGES,
  validateRequestDemoForm,
  type RequestDemoFormValues,
} from "./requestDemoForm.submit";

function values(
  overrides: Partial<RequestDemoFormValues> = {},
): RequestDemoFormValues {
  return {
    contactType: "demonstracao",
    name: "Ana Silva",
    email: "ana@empresa.com.br",
    company: "Empresa Exemplo",
    phone: "",
    productInterest: "",
    message: "",
    honey: "",
    ...overrides,
  };
}

describe("validateRequestDemoForm", () => {
  it("exige tipo de contato, nome, e-mail e empresa", () => {
    const errors = validateRequestDemoForm(
      values({
        contactType: "",
        name: "",
        email: "",
        company: "",
      }),
    );

    expect(errors.contactType).toBe(REQUEST_DEMO_MESSAGES.required);
    expect(errors.name).toBe(REQUEST_DEMO_MESSAGES.required);
    expect(errors.email).toBe(REQUEST_DEMO_MESSAGES.required);
    expect(errors.company).toBe(REQUEST_DEMO_MESSAGES.required);
    expect(errors.phone).toBeUndefined();
    expect(errors.productInterest).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("aceita telefone, produto e mensagem vazios", () => {
    const errors = validateRequestDemoForm(values());
    expect(errors).toEqual({});
  });

  it("rejeita e-mail inválido e opção de contato desconhecida", () => {
    const errors = validateRequestDemoForm(
      values({
        contactType: "financeiro",
        email: "nao-e-email",
      }),
    );

    expect(errors.contactType).toBe(REQUEST_DEMO_MESSAGES.option);
    expect(errors.email).toBe(REQUEST_DEMO_MESSAGES.email);
  });

  it("valida telefone e produto somente quando preenchidos", () => {
    const errors = validateRequestDemoForm(
      values({
        phone: "123",
        productInterest: "produto-inventado",
      }),
    );

    expect(errors.phone).toBe(REQUEST_DEMO_MESSAGES.phone);
    expect(errors.productInterest).toBe(REQUEST_DEMO_MESSAGES.option);
  });

  it("respeita o limite de tamanho da mensagem", () => {
    const errors = validateRequestDemoForm(
      values({
        message: "a".repeat(REQUEST_DEMO_FIELD_LIMITS.message + 1),
      }),
    );

    expect(errors.message).toBe(REQUEST_DEMO_MESSAGES.tooLong);
  });
});

describe("mapRequestDemoPayload", () => {
  it("envia rótulos legíveis e omite opcionais vazios", () => {
    const payload = mapRequestDemoPayload(values());

    expect(payload["TIPO DE CONTATO"]).toBe("Demonstração");
    expect(payload.NOME).toBe("Ana Silva");
    expect(payload["EMAIL CORPORATIVO"]).toBe("ana@empresa.com.br");
    expect(payload.EMPRESA).toBe("Empresa Exemplo");
    expect(payload._replyto).toBe("ana@empresa.com.br");
    expect(payload._template).toBe("table");
    expect(payload._honey).toBe("");

    // Opcionais ausentes não devem aparecer no payload.
    expect(payload).not.toHaveProperty("TELEFONE / WHATSAPP");
    expect(payload).not.toHaveProperty("PRODUTO DE INTERESSE");
    expect(payload).not.toHaveProperty("MENSAGEM");

    // Campos internos do formulário não devem vazar.
    expect(payload).not.toHaveProperty("contactType");
    expect(payload).not.toHaveProperty("productInterest");

    // Destinatário não deve estar no payload (fica só na constante do endpoint).
    expect(payload).not.toHaveProperty("email");
    expect(payload).not.toHaveProperty("to");
    expect(payload).not.toHaveProperty("_to");
  });

  it("inclui telefone, produto e mensagem quando preenchidos", () => {
    const payload = mapRequestDemoPayload(
      values({
        contactType: "suporte",
        phone: "+55 11 9 1111-2222",
        productInterest: "organizer",
        message: "Linha 1\nLinha 2",
      }),
    );

    expect(payload["TIPO DE CONTATO"]).toBe("Suporte");
    expect(payload["TELEFONE / WHATSAPP"]).toBe("+55 11 9 1111-2222");
    expect(payload.MENSAGEM).toBe("Linha 1\nLinha 2");
    // "organizer" deve ser mapeado para o rótulo legível.
    expect(payload["PRODUTO DE INTERESSE"]).toBeDefined();
    expect(typeof payload["PRODUTO DE INTERESSE"]).toBe("string");
    expect(payload["PRODUTO DE INTERESSE"]!.length).toBeGreaterThan(0);
    expect(payload).not.toHaveProperty("contactType");
    expect(payload).not.toHaveProperty("productInterest");
  });

  it("gera _subject com rótulo legível do tipo de contato", () => {
    const payload = mapRequestDemoPayload(values({ contactType: "comercial" }));
    expect(payload._subject).toBe("Nova solicitação pelo site — Comercial");
  });

  it("encaminha o honeypot sem sobrescrever", () => {
    const payload = mapRequestDemoPayload(values({ honey: "bot-value" }));
    expect(payload._honey).toBe("bot-value");
  });
});
