import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { companyPhoneRowClassName } from "./companyPhone.styles";

export default function CompanyPhoneFields() {
  return (
    <RequestDemoTwoColumnFields
      dataAttribute="request-demo-company-phone"
      rowClassName={companyPhoneRowClassName}
      leftField={{
        id: "request-demo-company",
        name: "company",
        label: "EMPRESA",
        type: "text",
        placeholder: "Razão social",
        autoComplete: "organization",
      }}
      rightField={{
        id: "request-demo-phone",
        name: "phone",
        label: "TELEFONE / WHATSAPP",
        type: "tel",
        placeholder: "+55 11 9 0000-0000",
        autoComplete: "tel",
        inputMode: "tel",
      }}
    />
  );
}
