import type { FormSubmitFailureReason } from "@/lib/formsubmit";

export type RequestDemoFeedbackCopy = {
  unconfirmed: string;
  timeout: string;
  rejection: string;
  activation: string;
  inFlight: string;
};

export function messageForFormSubmitReason(
  reason: FormSubmitFailureReason,
  feedback: RequestDemoFeedbackCopy,
): string {
  switch (reason) {
    case "rejection":
      return feedback.rejection;
    case "timeout":
      return feedback.timeout;
    case "activation":
      return feedback.activation;
    case "uncertain":
      return feedback.unconfirmed;
    case "in-flight":
      return feedback.inFlight;
  }
}
