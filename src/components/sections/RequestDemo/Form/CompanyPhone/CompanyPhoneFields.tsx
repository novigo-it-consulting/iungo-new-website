import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import { companyPhoneRowClassName } from "./companyPhone.styles";

type CompanyPhoneFieldsProps = {
  companyError?: string;
  phoneError?: string;
};

export default function CompanyPhoneFields({
  companyError,
  phoneError,
}: Readonly<CompanyPhoneFieldsProps>) {
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
        maxLength: REQUEST_DEMO_FIELD_LIMITS.company,
        required: true,
        errorMessage: companyError,
      }}
      rightField={{
        id: "request-demo-phone",
        name: "phone",
        label: "TELEFONE / WHATSAPP",
        type: "tel",
        placeholder: "+55 11 9 0000-0000",
        autoComplete: "tel",
        inputMode: "tel",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.phone,
        errorMessage: phoneError,
      }}
    />
  );
}
