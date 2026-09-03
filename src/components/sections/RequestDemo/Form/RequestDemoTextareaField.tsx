import type { ComponentPropsWithoutRef } from "react";

import {
  requestDemoFieldGroupClassName,
  requestDemoTextFieldLabelClassName,
} from "./requestDemoField.styles";

type RequestDemoTextareaFieldProps = {
  id: string;
  label: string;
  textareaClassName: string;
} & Pick<
  ComponentPropsWithoutRef<"textarea">,
  "name" | "placeholder" | "spellCheck"
>;

export default function RequestDemoTextareaField({
  id,
  label,
  name,
  placeholder,
  spellCheck,
  textareaClassName,
}: RequestDemoTextareaFieldProps) {
  return (
    <div className={requestDemoFieldGroupClassName}>
      <label htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        spellCheck={spellCheck}
        className={textareaClassName}
      />
    </div>
  );
}
