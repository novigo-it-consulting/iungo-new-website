import { COMMERCIAL_EMAIL } from "@/components/sections/RequestDemo/ContactCards/contactCards.constants";

export { COMMERCIAL_EMAIL };

export const FORMSUBMIT_MESSAGES = {
  unconfirmed: `Não conseguimos confirmar o envio agora. Você também pode entrar em contato pelo e-mail ${COMMERCIAL_EMAIL}.`,
  timeout: `A confirmação demorou mais do que o esperado. Os dados foram preservados. Você também pode entrar em contato pelo e-mail ${COMMERCIAL_EMAIL}.`,
  rejection: `Não foi possível enviar sua mensagem. Tente novamente em instantes. Você também pode entrar em contato pelo e-mail ${COMMERCIAL_EMAIL}.`,
  activation: `Não conseguimos concluir o envio neste momento. Você também pode entrar em contato pelo e-mail ${COMMERCIAL_EMAIL}.`,
  inFlight:
    "O envio já está em andamento. Aguarde a confirmação antes de enviar de novo.",
} as const;

export type FormSubmitFailureReason =
  | "activation"
  | "rejection"
  | "timeout"
  | "uncertain"
  | "in-flight";

export type FormSubmitSendResult =
  | { ok: true }
  | { ok: false; message: string; reason: FormSubmitFailureReason };
