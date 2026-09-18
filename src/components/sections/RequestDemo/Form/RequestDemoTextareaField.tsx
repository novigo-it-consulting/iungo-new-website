import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup, {
  requestDemoErrorDescribedBy,
} from "./RequestDemoFieldGroup";
import { withRequestDemoInvalidClass } from "./requestDemoField.styles";

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
}: Readonly<RequestDemoTextareaFieldProps>) {
  const describedBy = requestDemoErrorDescribedBy(id, errorMessage);
  const fieldClassName = withRequestDemoInvalidClass(
    textareaClassName,
    errorMessage,
  );

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
        className={fieldClassName}
      />
    </RequestDemoFieldGroup>
  );
}
