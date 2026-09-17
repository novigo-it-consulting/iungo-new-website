import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup from "./RequestDemoFieldGroup";
import {
  requestDemoFieldInputClassName,
  requestDemoFieldInvalidClassName,
} from "./requestDemoField.styles";

type RequestDemoFieldProps = {
  id: string;
  label: string;
  errorMessage?: string;
} & Pick<
  ComponentPropsWithoutRef<"input">,
  | "name"
  | "type"
  | "placeholder"
  | "autoComplete"
  | "spellCheck"
  | "autoCapitalize"
  | "inputMode"
  | "maxLength"
  | "required"
>;

export default function RequestDemoField({
  id,
  label,
  name,
  type,
  placeholder,
  autoComplete,
  spellCheck,
  autoCapitalize,
  inputMode,
  maxLength,
  required,
  errorMessage,
}: RequestDemoFieldProps) {
  const describedBy = errorMessage ? `${id}-error` : undefined;

  return (
    <RequestDemoFieldGroup id={id} label={label} errorMessage={errorMessage}>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        maxLength={maxLength}
        required={required}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={describedBy}
        className={`${requestDemoFieldInputClassName}${errorMessage ? ` ${requestDemoFieldInvalidClassName}` : ""}`}
      />
    </RequestDemoFieldGroup>
  );
}
