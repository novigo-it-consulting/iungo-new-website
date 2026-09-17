/**
 * Bloco de feedback após envio do formulário.
 *
 * - Sucesso: fundo verde claro, borda lateral verde, ícone de check.
 *   role="status" → aria-live="polite" (leitores de tela anunciam após a
 *   interação em curso, sem interromper).
 *
 * - Erro: fundo vermelho claro, borda lateral vermelha, ícone de X.
 *   role="alert" → aria-live="assertive" (anúncio imediato; o usuário precisa
 *   saber que a ação falhou).
 *
 * Diferenciação: texto + ícone, não apenas cor.
 * Posicionado após o botão para manter o foco visual próximo ao ponto de ação.
 */

import {
  requestDemoFeedbackErrorClassName,
  requestDemoFeedbackErrorIconClassName,
  requestDemoFeedbackErrorTextClassName,
  requestDemoFeedbackSuccessClassName,
  requestDemoFeedbackSuccessIconClassName,
  requestDemoFeedbackSuccessTextClassName,
} from "./requestDemoFeedback.styles";

export type RequestDemoFeedbackType = "success" | "error";

interface RequestDemoFeedbackProps {
  type: RequestDemoFeedbackType;
  message: string;
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-[1px] shrink-0"
    >
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 10.25L8.75 12.5L13.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-[1px] shrink-0"
    >
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function RequestDemoFeedback({
  type,
  message,
}: Readonly<RequestDemoFeedbackProps>) {
  const isSuccess = type === "success";

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      className={
        isSuccess
          ? requestDemoFeedbackSuccessClassName
          : requestDemoFeedbackErrorClassName
      }
    >
      <span
        className={
          isSuccess
            ? requestDemoFeedbackSuccessIconClassName
            : requestDemoFeedbackErrorIconClassName
        }
      >
        {isSuccess ? <CheckIcon /> : <XIcon />}
      </span>
      <p
        className={
          isSuccess
            ? requestDemoFeedbackSuccessTextClassName
            : requestDemoFeedbackErrorTextClassName
        }
      >
        {message}
      </p>
    </div>
  );
}
