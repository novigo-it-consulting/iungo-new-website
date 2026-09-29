import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import { nameEmailRowClassName } from "./nameEmail.styles";

type NameEmailFieldsProps = {
  nameError?: string;
  emailError?: string;
};

export default function NameEmailFields({
  nameError,
  emailError,
}: Readonly<NameEmailFieldsProps>) {
  return (
    <RequestDemoTwoColumnFields
      dataAttribute="request-demo-name-email"
      rowClassName={nameEmailRowClassName}
      leftField={{
        id: "request-demo-name",
        name: "name",
        label: "NOME",
        type: "text",
        placeholder: "Seu nome completo",
        autoComplete: "name",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.name,
        required: true,
        errorMessage: nameError,
      }}
      rightField={{
        id: "request-demo-email",
        name: "email",
        label: "EMAIL CORPORATIVO",
        type: "email",
        placeholder: "voce@empresa.com.br",
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
