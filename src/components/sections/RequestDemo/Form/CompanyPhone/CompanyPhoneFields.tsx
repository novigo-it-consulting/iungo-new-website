import RequestDemoTwoColumnFields from "../RequestDemoTwoColumnFields";
import { REQUEST_DEMO_FIELD_LIMITS } from "../requestDemoForm.submit";
import { companyPhoneRowClassName } from "./companyPhone.styles";

type TextFieldCopy = {
  label: string;
  placeholder: string;
};

type CompanyPhoneFieldsProps = {
  companyError?: string;
  phoneError?: string;
  companyField: TextFieldCopy;
  phoneField: TextFieldCopy;
};

export default function CompanyPhoneFields({
  companyError,
  phoneError,
  companyField,
  phoneField,
}: Readonly<CompanyPhoneFieldsProps>) {
  return (
    <RequestDemoTwoColumnFields
      dataAttribute="request-demo-company-phone"
      rowClassName={companyPhoneRowClassName}
      leftField={{
        id: "request-demo-company",
        name: "company",
        label: companyField.label,
        type: "text",
        placeholder: companyField.placeholder,
        autoComplete: "organization",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.company,
        required: true,
        errorMessage: companyError,
      }}
      rightField={{
        id: "request-demo-phone",
        name: "phone",
        label: phoneField.label,
        type: "tel",
        placeholder: phoneField.placeholder,
        autoComplete: "tel",
        inputMode: "tel",
        maxLength: REQUEST_DEMO_FIELD_LIMITS.phone,
        errorMessage: phoneError,
      }}
    />
  );
}
