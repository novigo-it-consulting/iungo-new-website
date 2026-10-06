import { COMMERCIAL_EMAIL } from "@/components/sections/RequestDemo/ContactCards/contactCards.constants";
import ptRequestDemo from "@/messages/pt-BR/requestDemo.json";

export { COMMERCIAL_EMAIL };

export const FORMSUBMIT_MESSAGES = {
  unconfirmed: ptRequestDemo.feedback.unconfirmed,
  timeout: ptRequestDemo.feedback.timeout,
  rejection: ptRequestDemo.feedback.rejection,
  activation: ptRequestDemo.feedback.activation,
  inFlight: ptRequestDemo.feedback.inFlight,
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
