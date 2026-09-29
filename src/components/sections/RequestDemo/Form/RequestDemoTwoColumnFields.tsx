import type { ComponentPropsWithoutRef } from "react";

import RequestDemoField from "./RequestDemoField";
import { requestDemoFormRowColumnClassName } from "./requestDemoFormRow.styles";

type RequestDemoInputFieldConfig = {
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

type RequestDemoTwoColumnFieldsProps = {
  dataAttribute: string;
  rowClassName: string;
  leftField: RequestDemoInputFieldConfig;
  rightField: RequestDemoInputFieldConfig;
};

export default function RequestDemoTwoColumnFields({
  dataAttribute,
  rowClassName,
  leftField,
  rightField,
}: Readonly<RequestDemoTwoColumnFieldsProps>) {
  return (
    <div {...{ [`data-${dataAttribute}`]: true }} className={rowClassName}>
      <div className={requestDemoFormRowColumnClassName}>
        <RequestDemoField {...leftField} />
      </div>

      <div className={requestDemoFormRowColumnClassName}>
        <RequestDemoField {...rightField} />
      </div>
    </div>
  );
}
