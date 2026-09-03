import type { ComponentPropsWithoutRef } from "react";

import RequestDemoFieldGroup from "./RequestDemoFieldGroup";

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
    <RequestDemoFieldGroup id={id} label={label}>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        spellCheck={spellCheck}
        className={textareaClassName}
      />
    </RequestDemoFieldGroup>
  );
}
