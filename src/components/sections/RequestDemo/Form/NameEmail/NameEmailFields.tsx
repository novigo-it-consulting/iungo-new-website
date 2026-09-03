import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { nameEmailRowClassName } from "./nameEmail.styles";

export default function NameEmailFields() {
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
      }}
    />
  );
}
