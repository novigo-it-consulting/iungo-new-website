import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import { nameEmailRowClassName } from "./nameEmail.styles";

type TextFieldCopy = {
  label: string;
  placeholder: string;
};

type NameEmailFieldsProps = {
  nameError?: string;
  emailError?: string;
  nameField: TextFieldCopy;
  emailField: TextFieldCopy;
};

export default function NameEmailFields({
  nameError,
  emailError,
  nameField,
  emailField,
}: Readonly<NameEmailFieldsProps>) {
  return (
    <RequestDemoTwoColumnFields
      dataAttribute="request-demo-name-email"
      rowClassName={nameEmailRowClassName}
      leftField={{
        id: "request-demo-name",
        name: "name",
        label: nameField.label,
        type: "text",
        placeholder: nameField.placeholder,
        autoComplete: "name",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.name,
        required: true,
        errorMessage: nameError,
      }}
      rightField={{
        id: "request-demo-email",
        name: "email",
        label: emailField.label,
        type: "email",
        placeholder: emailField.placeholder,
        autoComplete: "email",
        spellCheck: false,
        autoCapitalize: "none",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.email,
        required: true,
        errorMessage: emailError,
      }}
    />
  );
}
