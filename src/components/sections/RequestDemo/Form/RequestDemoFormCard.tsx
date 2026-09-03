"use client";

import CompanyPhoneFields from "./CompanyPhone/CompanyPhoneFields";
import ContactTypeField from "./ContactType/ContactTypeField";
import NameEmailFields from "./NameEmail/NameEmailFields";
import MessageField from "./Message/MessageField";
import PrivacyNotice from "./Privacy/PrivacyNotice";
import ProductInterestField from "./ProductInterest/ProductInterestField";
import RequestDemoSubmitButton from "./Submit/RequestDemoSubmitButton";
import {
  requestDemoFormCardClassName,
  requestDemoFormInnerClassName,
} from "./requestDemoForm.styles";

import "./requestDemoForm.css";

export default function RequestDemoFormCard() {
  return (
    <div
      data-request-demo-form-card
      className={requestDemoFormCardClassName}
    >
      <form className={requestDemoFormInnerClassName} noValidate onSubmit={(e) => e.preventDefault()}>
        <ContactTypeField />
        <NameEmailFields />
        <CompanyPhoneFields />
        <ProductInterestField />
        <MessageField />
        <PrivacyNotice />
        <RequestDemoSubmitButton />
      </form>
    </div>
  );
}
