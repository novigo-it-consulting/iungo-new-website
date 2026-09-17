import type { ReactNode } from "react";

import {
  requestDemoFieldErrorTextClassName,
  requestDemoFieldGroupClassName,
  requestDemoTextFieldLabelClassName,
} from "./requestDemoField.styles";

type RequestDemoFieldErrorProps = {
  id: string;
  message?: string;
};

export function RequestDemoFieldError({
  id,
  message,
}: Readonly<RequestDemoFieldErrorProps>) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className={requestDemoFieldErrorTextClassName}>
      {message}
    </p>
  );
}

type RequestDemoFieldGroupProps = {
  id: string;
  label: string;
  errorMessage?: string;
  children: ReactNode;
};

export default function RequestDemoFieldGroup({
  id,
  label,
  errorMessage,
  children,
}: Readonly<RequestDemoFieldGroupProps>) {
  return (
    <div className={requestDemoFieldGroupClassName}>
      <label htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>
      {children}
      <RequestDemoFieldError id={`${id}-error`} message={errorMessage} />
    </div>
  );
}
