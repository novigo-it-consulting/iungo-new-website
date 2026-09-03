import RequestDemoField from "../RequestDemoField";
import {
  companyPhoneCompanyColumnClassName,
  companyPhonePhoneColumnClassName,
  companyPhoneRowClassName,
} from "./companyPhone.styles";

export default function CompanyPhoneFields() {
  return (
    <div data-request-demo-company-phone className={companyPhoneRowClassName}>
      <div className={companyPhoneCompanyColumnClassName}>
        <RequestDemoField
          id="request-demo-company"
          name="company"
          label="EMPRESA"
          type="text"
          placeholder="Razão social"
          autoComplete="organization"
        />
      </div>

      <div className={companyPhonePhoneColumnClassName}>
        <RequestDemoField
          id="request-demo-phone"
          name="phone"
          label="TELEFONE / WHATSAPP"
          type="tel"
          placeholder="+55 11 9 0000-0000"
          autoComplete="tel"
          inputMode="tel"
        />
      </div>
    </div>
  );
}
