/**
 * Bloco de feedback após envio do formulário.
 *
 * - Sucesso: fundo verde claro, borda lateral verde, ícone de check.
 *   <output> (role implícito status) com aria-live="polite": leitores de tela
 *   anunciam após a interação em curso, sem interromper.
 *
 * - Erro: fundo vermelho claro, borda lateral vermelha, ícone de X.
 *   role="alert" → aria-live="assertive" (anúncio imediato; o usuário precisa
 *   saber que a ação falhou).
 *
 * Diferenciação: texto + ícone, não apenas cor.
 * Posicionado após o botão para manter o foco visual próximo ao ponto de ação.
 */

import type { ReactNode } from "react";

import { COMMERCIAL_EMAIL } from "@/components/sections/RequestDemo/ContactCards/contactCards.constants";

import {
  requestDemoFeedbackErrorClassName,
  requestDemoFeedbackErrorIconClassName,
  requestDemoFeedbackErrorLinkClassName,
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

function FeedbackGlyph({ children }: Readonly<{ children: ReactNode }>) {
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
      {children}
    </svg>
  );
}

function CheckIcon() {
  return (
    <FeedbackGlyph>
      <path
        d="M6.5 10.25L8.75 12.5L13.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </FeedbackGlyph>
  );
}

function XIcon() {
  return (
    <FeedbackGlyph>
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </FeedbackGlyph>
  );
}

function FeedbackMessage({
  message,
  className,
}: Readonly<{ message: string; className: string }>) {
  const parts = message.split(COMMERCIAL_EMAIL);

  if (parts.length === 1) {
    return <span className={className}>{message}</span>;
  }

  return (
    <span className={className}>
      {parts[0]}
      <a
        href={`mailto:${COMMERCIAL_EMAIL}`}
        className={requestDemoFeedbackErrorLinkClassName}
      >
        {COMMERCIAL_EMAIL}
      </a>
      {parts.slice(1).join(COMMERCIAL_EMAIL)}
    </span>
  );
}

export default function RequestDemoFeedback({
  type,
  message,
}: Readonly<RequestDemoFeedbackProps>) {
  const isSuccess = type === "success";
  const iconClassName = isSuccess
    ? requestDemoFeedbackSuccessIconClassName
    : requestDemoFeedbackErrorIconClassName;
  const textClassName = isSuccess
    ? requestDemoFeedbackSuccessTextClassName
    : requestDemoFeedbackErrorTextClassName;

  const content = (
    <>
      <span className={iconClassName}>
        {isSuccess ? <CheckIcon /> : <XIcon />}
      </span>
      <FeedbackMessage message={message} className={textClassName} />
    </>
  );

  if (isSuccess) {
    return (
      <output
        className={requestDemoFeedbackSuccessClassName}
        aria-live="polite"
      >
        {content}
      </output>
    );
  }

  return (
    <div role="alert" className={requestDemoFeedbackErrorClassName}>
      {content}
    </div>
  );
}
