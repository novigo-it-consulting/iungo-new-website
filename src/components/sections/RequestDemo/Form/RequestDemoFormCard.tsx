"use client";

import { useState, type FormEvent } from "react";

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    setIsSubmitting(true);
    setFeedback(null);

    const values = readRequestDemoFormValues(form);
    const errors = validateRequestDemoForm(values);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
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
      setIsSubmitting(false);
      return;
    }

    form.reset();
    setSelectResetKey((current) => current + 1);
    setFeedback({
      type: "success",
      message: REQUEST_DEMO_MESSAGES.success,
    });
    setIsSubmitting(false);
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
        {/*
         * Honeypot (_honey): campo invisível para scrapers de spam.
         * - aria-hidden: não anunciado por leitores de tela.
         * - tabIndex={-1}: fora do fluxo de teclado.
         * - autoComplete="off": não preenchido por gerenciadores de senha.
         * - position absolute + overflow hidden: fora do layout, sem ocupar espaço.
         * Se um bot preencher este campo, o FormSubmit ignora o envio em silêncio.
         * Não equivale a CAPTCHA — é apenas uma camada de triagem.
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
          />
        </div>

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
        <RequestDemoSubmitButton isSubmitting={isSubmitting} />
        {/*
         * Feedback posicionado após o botão: o usuário clica, acompanha
         * "Enviando…" no botão e vê a resposta imediatamente abaixo.
         * role="status" para sucesso (polite) e role="alert" para erro (assertive).
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
