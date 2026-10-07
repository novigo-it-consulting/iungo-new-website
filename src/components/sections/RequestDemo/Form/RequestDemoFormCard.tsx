"use client";

import { useRef, useState, type SubmitEvent } from "react";

import { sendRequestDemoEmail, type FormSubmitSendResult } from "@/lib/formsubmit";

import type { RequestDemoFormCopy } from "../requestDemoView";
import CompanyPhoneFields from "./CompanyPhone/CompanyPhoneFields";
import ContactTypeField from "./ContactType/ContactTypeField";
import MessageField from "./Message/MessageField";
import NameEmailFields from "./NameEmail/NameEmailFields";
import PrivacyNotice from "./Privacy/PrivacyNotice";
import ProductInterestField from "./ProductInterest/ProductInterestField";
import RequestDemoFeedback, {
  type RequestDemoFeedbackType,
} from "./RequestDemoFeedback";
import RequestDemoSubmitButton from "./Submit/RequestDemoSubmitButton";
import { messageForFormSubmitReason } from "./formSubmitFeedback";
import {
  mapRequestDemoPayload,
  readRequestDemoFormValues,
  validateRequestDemoForm,
  type RequestDemoFieldErrors,
} from "./requestDemoForm.submit";
import {
  requestDemoFormCardClassName,
  requestDemoFormInnerClassName,
} from "./requestDemoForm.styles";

import "./requestDemoForm.css";

type FeedbackState = {
  type: RequestDemoFeedbackType;
  message: string;
} | null;

type RequestDemoFormCardProps = {
  copy: RequestDemoFormCopy;
};

function reportSubmitResult(
  result: FormSubmitSendResult,
  form: HTMLFormElement,
  copy: RequestDemoFormCopy,
  setFeedback: (feedback: FeedbackState) => void,
  bumpSelectResetKey: () => void,
): void {
  if (!result.ok) {
    setFeedback({
      type: "error",
      message: messageForFormSubmitReason(result.reason, copy.feedback),
    });
    return;
  }

  form.reset();
  bumpSelectResetKey();
  setFeedback({ type: "success", message: copy.success });
}

export default function RequestDemoFormCard({
  copy,
}: Readonly<RequestDemoFormCardProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RequestDemoFieldErrors>({});
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [selectResetKey, setSelectResetKey] = useState(0);
  const inFlightRef = useRef(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (inFlightRef.current) {
      return;
    }

    const form = event.currentTarget;
    inFlightRef.current = true;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const values = readRequestDemoFormValues(form);
      const errors = validateRequestDemoForm(values, copy.validation);

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        queueMicrotask(() => {
          form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
        });
        return;
      }

      setFieldErrors({});

      const result = await sendRequestDemoEmail(mapRequestDemoPayload(values));
      reportSubmitResult(result, form, copy, setFeedback, () => {
        setSelectResetKey((current) => current + 1);
      });
    } finally {
      inFlightRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div
      data-request-demo-form-card
      className={requestDemoFormCardClassName}
    >
      <form
        className={requestDemoFormInnerClassName}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
      >
        <ContactTypeField
          legend={copy.contactType.legend}
          options={copy.contactType.options}
          errorMessage={fieldErrors.contactType}
        />
        <NameEmailFields
          nameError={fieldErrors.name}
          emailError={fieldErrors.email}
          nameField={copy.name}
          emailField={copy.email}
        />
        <CompanyPhoneFields
          companyError={fieldErrors.company}
          phoneError={fieldErrors.phone}
          companyField={copy.company}
          phoneField={copy.phone}
        />
        <ProductInterestField
          resetKey={selectResetKey}
          errorMessage={fieldErrors.productInterest}
          label={copy.productInterest.label}
          placeholder={copy.productInterest.placeholder}
          options={copy.productInterest.options}
        />
        <MessageField
          label={copy.message.label}
          placeholder={copy.message.placeholder}
          errorMessage={fieldErrors.message}
        />
        <PrivacyNotice {...copy.privacy} />
        {/*
         * Honeypot (_honey): depois dos campos reais. No desktop o
         * gerenciador de senhas costuma preencher o primeiro <input type="text">
         * do formulário; se esse for o honeypot, o FormSubmit descarta o envio.
         * - aria-hidden: não anunciado por leitores de tela.
         * - tabIndex={-1}: fora do fluxo de teclado.
         * - autoComplete="off" + data-lpignore/data-1p-ignore: reduz autofill.
         * Não remover este campo para “fazer o envio passar”.
         */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            overflow: "hidden",
            width: 0,
            height: 0,
          }}
        >
          <label htmlFor="request-demo-honey">{copy.honey}</label>
          <input
            type="text"
            id="request-demo-honey"
            name="_honey"
            defaultValue=""
            tabIndex={-1}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            data-lpignore="true"
            data-1p-ignore="true"
          />
        </div>
        <RequestDemoSubmitButton
          isSubmitting={isSubmitting}
          label={copy.submit}
          submittingLabel={copy.submitting}
          securityNotice={copy.security}
        />
        {/*
         * Feedback posicionado após o botão: o usuário clica, acompanha
         * "Enviando…" no botão e vê a resposta imediatamente abaixo.
         * <output> (status) para sucesso (polite) e role="alert" para erro.
         */}
        {feedback ? (
          <RequestDemoFeedback
            type={feedback.type}
            message={feedback.message}
          />
        ) : null}
      </form>
    </div>
  );
}
