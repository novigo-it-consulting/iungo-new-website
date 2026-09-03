import type { ComponentPropsWithoutRef } from "react";

import {
  requestDemoFieldGroupClassName,
  requestDemoFieldInputClassName,
  requestDemoTextFieldLabelClassName,
} from "./requestDemoField.styles";

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
    <div className={requestDemoFieldGroupClassName}>
      <label htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>

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
    </div>
  );
}
