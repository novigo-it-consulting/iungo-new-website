import type { ReactNode } from "react";

import {
  requestDemoFieldGroupClassName,
  requestDemoTextFieldLabelClassName,
} from "./requestDemoField.styles";

type RequestDemoFieldGroupProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export default function RequestDemoFieldGroup({
  id,
  label,
  children,
}: Readonly<RequestDemoFieldGroupProps>) {
  return (
    <div className={requestDemoFieldGroupClassName}>
      <label htmlFor={id} className={requestDemoTextFieldLabelClassName}>
        {label}
      </label>
      {children}
    </div>
  );
}
