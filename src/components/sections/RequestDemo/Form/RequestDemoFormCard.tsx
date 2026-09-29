"use client";

import { useRef, useState, type FormEvent } from "react";

import { sendRequestDemoEmail } from "@/lib/formsubmit";

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
import {
  mapRequestDemoPayload,
  readRequestDemoFormValues,
  REQUEST_DEMO_MESSAGES,
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

export default function RequestDemoFormCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RequestDemoFieldErrors>({});
  const [feedback, setFeedback] = useState<FeedbackState>(null);
  const [selectResetKey, setSelectResetKey] = useState(0);
  const inFlightRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      const errors = validateRequestDemoForm(values);

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        queueMicrotask(() => {
          form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
        });
        return;
      }

      setFieldErrors({});

      const result = await sendRequestDemoEmail(mapRequestDemoPayload(values));

      if (!result.ok) {
        // Dados preservados: não reseta o formulário em caso de falha.
        setFeedback({ type: "error", message: result.message });
        return;
      }

      form.reset();
      setSelectResetKey((current) => current + 1);
      setFeedback({
        type: "success",
        message: REQUEST_DEMO_MESSAGES.success,
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
        <ContactTypeField errorMessage={fieldErrors.contactType} />
        <NameEmailFields
          nameError={fieldErrors.name}
          emailError={fieldErrors.email}
        />
        <CompanyPhoneFields
          companyError={fieldErrors.company}
          phoneError={fieldErrors.phone}
        />
        <ProductInterestField
          resetKey={selectResetKey}
          errorMessage={fieldErrors.productInterest}
        />
        <MessageField errorMessage={fieldErrors.message} />
        <PrivacyNotice />
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
          <label htmlFor="request-demo-honey">Não preencha este campo</label>
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
        <RequestDemoSubmitButton isSubmitting={isSubmitting} />
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
