/**
 * Envio AJAX para o FormSubmit, disparado pelo navegador.
 * O destinatário fica só neste módulo; nenhum campo do formulário
 * define o e-mail de destino.
 *
 * Content-Type application/json dispara um preflight CORS (OPTIONS).
 * No Chrome o OPTIONS para formsubmit.co fica pendente e o POST é
 * cancelado aos 15s — o lead nem sai. application/x-www-form-urlencoded
 * é pedido “simples”: o POST vai direto. Accept application/json continua
 * para o serviço devolver JSON. Origin/Referer são os do navegador.
 * Este módulo não inventa Origin, Referer nem `_url`.
 *
 * CAPTCHA: a documentação AJAX descreve o reCAPTCHA só para HTML
 * tradicional. Este módulo não envia _captcha=false.
 *
 * Honeypot (_honey): se preenchido, o FormSubmit ignora o envio.
 *
 * SUCESSO    — HTTP 2xx e success === true | "true".
 * ATIVAÇÃO   — success false e mensagem de Activate Form (classificação
 *              interna; a UI do visitante não instrui ativação).
 * REJEIÇÃO   — success false sem ativação, ou HTTP 4xx.
 * TIMEOUT    — AbortError do limite de 15s.
 * INCERTO    — rede, HTTP 5xx, JSON inválido ou success ausente.
 *              Não afirma que o e-mail não chegou.
 */

import {
  COMMERCIAL_EMAIL,
  FORMSUBMIT_MESSAGES,
  type FormSubmitFailureReason,
  type FormSubmitSendResult,
} from "./formsubmit.messages";

export {
  FORMSUBMIT_MESSAGES,
  type FormSubmitFailureReason,
  type FormSubmitSendResult,
} from "./formsubmit.messages";

export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${COMMERCIAL_EMAIL}`;

const FORMSUBMIT_TIMEOUT_MS = 15_000;

export const FORMSUBMIT_POST_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  Accept: "application/json",
} as const;

export function toFormSubmitBody(
  payload: RequestDemoSubmitPayload,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      params.set(key, value);
    }
  }

  return params;
}

/**
 * Tipo do payload enviado ao FormSubmit.
 * Chaves visíveis usam os mesmos rótulos da interface (template "table").
 * _honey é encaminhado do formulário; não deve ser sobrescrito com "".
 */
export type RequestDemoSubmitPayload = {
  "TIPO DE CONTATO": string;
  NOME: string;
  "EMAIL CORPORATIVO": string;
  EMPRESA: string;
  "TELEFONE / WHATSAPP"?: string;
  "PRODUTO DE INTERESSE"?: string;
  MENSAGEM?: string;
  _replyto: string;
  _subject: string;
  _template: "table";
  _honey: string;
};

type FormSubmitBody = {
  success?: unknown;
  message?: unknown;
};

let inFlight = false;

export function isFormSubmitSuccess(body: unknown): boolean {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const { success } = body as FormSubmitBody;
  return success === true || success === "true";
}

export function isFormSubmitExplicitFailure(body: unknown): boolean {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const { success } = body as FormSubmitBody;
  return success === false || success === "false";
}

export function isFormSubmitActivationMessage(serviceMessage: string): boolean {
  const normalized = serviceMessage.toLowerCase();

  return (
    normalized.includes("activation") ||
    normalized.includes("activate form") ||
    normalized.includes("actived") ||
    normalized.includes("confirmation link") ||
    normalized.includes("confirm the form")
  );
}

function readFormSubmitMessage(body: unknown): string {
  if (typeof body !== "object" || body === null) {
    return "";
  }

  const { message } = body as FormSubmitBody;
  return typeof message === "string" ? message : "";
}

function visitorFailure(
  reason: FormSubmitFailureReason,
): Extract<FormSubmitSendResult, { ok: false }> {
  const messageByReason: Record<FormSubmitFailureReason, string> = {
    "in-flight": FORMSUBMIT_MESSAGES.inFlight,
    timeout: FORMSUBMIT_MESSAGES.timeout,
    rejection: FORMSUBMIT_MESSAGES.rejection,
    activation: FORMSUBMIT_MESSAGES.activation,
    uncertain: FORMSUBMIT_MESSAGES.unconfirmed,
  };

  return {
    ok: false,
    message: messageByReason[reason],
    reason,
  };
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  );
}

export function classifyFormSubmitResponse(
  status: number,
  body: unknown,
  jsonParseFailed: boolean,
): FormSubmitSendResult {
  const isServerError = status >= 500;

  if (!jsonParseFailed && !isServerError) {
    if (status >= 200 && status < 300 && isFormSubmitSuccess(body)) {
      return { ok: true };
    }

    if (isFormSubmitExplicitFailure(body)) {
      const serviceMessage = readFormSubmitMessage(body);
      return visitorFailure(
        isFormSubmitActivationMessage(serviceMessage)
          ? "activation"
          : "rejection",
      );
    }
  }

  if (status >= 400 && status < 500) {
    return visitorFailure("rejection");
  }

  return visitorFailure("uncertain");
}

export async function sendRequestDemoEmail(
  payload: RequestDemoSubmitPayload,
): Promise<FormSubmitSendResult> {
  if (inFlight) {
    return visitorFailure("in-flight");
  }

  inFlight = true;
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    FORMSUBMIT_TIMEOUT_MS,
  );

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: { ...FORMSUBMIT_POST_HEADERS },
      body: toFormSubmitBody(payload),
      signal: controller.signal,
    });

    let body: unknown = undefined;
    let jsonParseFailed = false;

    try {
      body = await response.json();
    } catch {
      jsonParseFailed = true;
    }

    return classifyFormSubmitResponse(response.status, body, jsonParseFailed);
  } catch (error) {
    return visitorFailure(isAbortError(error) ? "timeout" : "uncertain");
  } finally {
    clearTimeout(timeoutId);
    inFlight = false;
  }
}
