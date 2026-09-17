import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup from "./RequestDemoFieldGroup";
import { requestDemoFieldInvalidClassName } from "./requestDemoField.styles";

type RequestDemoTextareaFieldProps = {
  id: string;
  label: string;
  textareaClassName: string;
  errorMessage?: string;
} & Pick<
  ComponentPropsWithoutRef<"textarea">,
  "name" | "placeholder" | "spellCheck" | "maxLength"
>;

export default function RequestDemoTextareaField({
  id,
  label,
  name,
  placeholder,
  spellCheck,
  maxLength,
  textareaClassName,
  errorMessage,
}: RequestDemoTextareaFieldProps) {
  const describedBy = errorMessage ? `${id}-error` : undefined;

  return (
    <RequestDemoFieldGroup id={id} label={label} errorMessage={errorMessage}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        spellCheck={spellCheck}
        maxLength={maxLength}
        aria-invalid={Boolean(errorMessage)}
        aria-describedby={describedBy}
        className={`${textareaClassName}${errorMessage ? ` ${requestDemoFieldInvalidClassName}` : ""}`}
      />
    </RequestDemoFieldGroup>
  );
}
