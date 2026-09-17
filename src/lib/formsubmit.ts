/**
 * Envio AJAX para o FormSubmit. O destinatário fica só neste módulo;
 * nenhum campo do formulário define o e-mail de destino.
 *
 * CAPTCHA: a documentação AJAX oficial (formsubmit.co/documentation)
 * descreve o reCAPTCHA somente para formulários HTML tradicionais.
 * Os exemplos de fetch/jQuery no endpoint /ajax não mencionam widget
 * nem token de verificação. Sem teste controlado contra o endpoint,
 * este módulo não afirma CAPTCHA ativo nem envia _captcha=false para
 * não desativar proteção existente por suposição.
 *
 * Honeypot (_honey): proteção documentada e disponível no fluxo AJAX.
 * Se preenchido, o FormSubmit ignora o envio. Não equivale a CAPTCHA.
 *
 * Classificação de resultados:
 *
 *  SUCESSO   — response.ok E success === true ou "true".
 *
 *  REJEIÇÃO  — HTTP 4xx: o serviço recusou a solicitação explicitamente.
 *              A solicitação não foi aceita pelo destinatário.
 *
 *  INCERTO   — fetch() lançou (rede, abort, timeout), HTTP 5xx,
 *              JSON inválido, success ausente ou valor inesperado.
 *              O servidor pode ter processado antes da falha;
 *              nunca transformamos ausência de confirmação em rejeição.
 */

export const FORMSUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/comercial@iungo-ai.com";

const FORMSUBMIT_TIMEOUT_MS = 15_000;

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

// Resultado incerto: não sabemos se o servidor processou.
const UNCERTAIN_MESSAGE =
  "Não foi possível confirmar o envio. Aguarde um momento antes de tentar novamente.";

// Rejeição explícita: o serviço recusou a solicitação (HTTP 4xx).
const REJECTION_MESSAGE =
  "Não foi possível enviar sua mensagem. Tente novamente em instantes.";

type FormSubmitBody = {
  success?: unknown;
};

/**
 * Verifica o campo success sem Boolean(), pois a string "false"
 * seria truthy. Aceita somente true (booleano) ou "true" (string).
 */
export function isFormSubmitSuccess(body: unknown): boolean {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const { success } = body as FormSubmitBody;
  return success === true || success === "true";
}

export async function sendRequestDemoEmail(
  payload: RequestDemoSubmitPayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    FORMSUBMIT_TIMEOUT_MS,
  );

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // HTTP 4xx: o serviço recusou a solicitação explicitamente.
    if (response.status >= 400 && response.status < 500) {
      return { ok: false, message: REJECTION_MESSAGE };
    }

    // Tenta decodificar o JSON. Falha aqui (5xx com HTML, resposta vazia,
    // conteúdo inesperado) é resultado incerto: não sabemos se chegou.
    let body: unknown;
    try {
      body = await response.json();
    } catch {
      return { ok: false, message: UNCERTAIN_MESSAGE };
    }

    // success ausente ou com valor inesperado → incerto.
    // success === true | "true" → sucesso.
    if (!isFormSubmitSuccess(body)) {
      return { ok: false, message: UNCERTAIN_MESSAGE };
    }

    return { ok: true };
  } catch {
    // fetch() lançou: rede, abort ou timeout → resultado incerto.
    return { ok: false, message: UNCERTAIN_MESSAGE };
  } finally {
    clearTimeout(timeoutId);
  }
}
