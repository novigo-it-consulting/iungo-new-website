import RequestDemoField from "../RequestDemoField";
import {
  nameEmailEmailColumnClassName,
  nameEmailNameColumnClassName,
  nameEmailRowClassName,
} from "./nameEmail.styles";

export default function NameEmailFields() {
  return (
    <div data-request-demo-name-email className={nameEmailRowClassName}>
      <div className={nameEmailNameColumnClassName}>
        <RequestDemoField
          id="request-demo-name"
          name="name"
          label="NOME"
          type="text"
          placeholder="Seu nome completo"
          autoComplete="name"
        />
      </div>

      <div className={nameEmailEmailColumnClassName}>
        <RequestDemoField
          id="request-demo-email"
          name="email"
          label="EMAIL CORPORATIVO"
          type="email"
          placeholder="voce@empresa.com.br"
          autoComplete="email"
          spellCheck={false}
          autoCapitalize="none"
        />
      </div>
    </div>
  );
}
