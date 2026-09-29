import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup, {
  requestDemoErrorDescribedBy,
} from "./RequestDemoFieldGroup";
import {
  requestDemoFieldInputClassName,
  withRequestDemoInvalidClass,
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
}: Readonly<RequestDemoFieldProps>) {
  const describedBy = requestDemoErrorDescribedBy(id, errorMessage);
  const inputClassName = withRequestDemoInvalidClass(
    requestDemoFieldInputClassName,
    errorMessage,
  );

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
        className={inputClassName}
      />
    </RequestDemoFieldGroup>
  );
}
