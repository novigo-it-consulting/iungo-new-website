import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup from "./RequestDemoFieldGroup";
import { requestDemoFieldInputClassName } from "./requestDemoField.styles";

type RequestDemoFieldProps = {
  id: string;
  label: string;
} & Pick<
  ComponentPropsWithoutRef<"input">,
  | "name"
  | "type"
  | "placeholder"
  | "autoComplete"
  | "spellCheck"
  | "autoCapitalize"
  | "inputMode"
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
}: RequestDemoFieldProps) {
  return (
    <RequestDemoFieldGroup id={id} label={label}>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        autoCapitalize={autoCapitalize}
        inputMode={inputMode}
        className={requestDemoFieldInputClassName}
      />
    </RequestDemoFieldGroup>
  );
}
