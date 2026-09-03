import type { ComponentPropsWithoutRef } from "react";

import {
  requestDemoFieldGroupClassName,
  requestDemoSelectClassName,
  requestDemoTextFieldLabelClassName,
} from "./requestDemoField.styles";

export type RequestDemoSelectOption = {
  value: string;
  label: string;
};

type RequestDemoSelectFieldProps = {
  id: string;
  label: string;
  name: string;
  placeholderOption: RequestDemoSelectOption;
  options: readonly RequestDemoSelectOption[];
} & Pick<ComponentPropsWithoutRef<"select">, "defaultValue">;

export default function RequestDemoSelectField({
  id,
  label,
  name,
  placeholderOption,
  options,
  defaultValue = placeholderOption.value,
}: RequestDemoSelectFieldProps) {
  return (
    <div className={requestDemoFieldGroupClassName}>
      <label htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>

      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        className={requestDemoSelectClassName}
      >
        <option value={placeholderOption.value}>{placeholderOption.label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
