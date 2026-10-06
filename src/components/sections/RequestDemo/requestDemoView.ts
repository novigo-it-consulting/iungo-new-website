import type { RequestDemoMessages } from "@/i18n/catalog/requestDemoCatalog";

import {
  REQUEST_DEMO_CONTACT_CARDS,
  type ContactCardData,
} from "./ContactCards/contactCards.constants";
import { CONTACT_TYPE_OPTIONS } from "./Form/ContactType/contactType.constants";
import type { RequestDemoFeedbackCopy } from "./Form/formSubmitFeedback";
import { PRODUCT_INTEREST_OPTIONS } from "./Form/ProductInterest/productInterest.constants";

export type RequestDemoLabeledOption = {
  value: string;
  label: string;
};

type FieldCopy = {
  label: string;
  placeholder: string;
};

export type RequestDemoFormCopy = {
  contactType: {
    legend: string;
    options: readonly RequestDemoLabeledOption[];
  };
  name: FieldCopy;
  email: FieldCopy;
  company: FieldCopy;
  phone: FieldCopy;
  productInterest: {
    label: string;
    placeholder: string;
    options: readonly RequestDemoLabeledOption[];
  };
  message: FieldCopy;
  privacy: RequestDemoMessages["form"]["privacy"];
  honey: string;
  submit: string;
  submitting: string;
  security: string;
  validation: RequestDemoMessages["form"]["validation"];
  success: string;
  feedback: RequestDemoFeedbackCopy;
};

type ContactTypeLabels = RequestDemoMessages["form"]["contactType"];
type ProductLabels = RequestDemoMessages["form"]["productInterest"];
type ContactTypeValue = (typeof CONTACT_TYPE_OPTIONS)[number]["value"];

function contactOptionLabel(
  value: ContactTypeValue,
  labels: ContactTypeLabels,
): string {
  switch (value) {
    case "demonstracao":
      return labels.demonstracao;
    case "comercial":
      return labels.comercial;
    case "suporte":
      return labels.suporte;
  }
}

function productOptionLabel(
  value: string,
  labels: ProductLabels,
): string | undefined {
  switch (value) {
    case "organizer":
      return labels.organizer;
    case "concierge":
      return labels.concierge;
    case "behavior":
      return labels.behavior;
    case "resolve":
      return labels.resolve;
    case "attendant":
      return labels.attendant;
    case "convert":
      return labels.convert;
    case "iot":
      return labels.iot;
    default:
      return undefined;
  }
}

function withDisplayLabel(
  option: RequestDemoLabeledOption,
  displayLabel: string | undefined,
): RequestDemoLabeledOption {
  return {
    value: option.value,
    label: displayLabel ?? option.label,
  };
}

function contactCardText(
  id: string,
  cards: RequestDemoMessages["cards"],
): { title: string; description: string } | undefined {
  switch (id) {
    case "commercial":
      return cards.commercial;
    case "support":
      return cards.support;
    case "dpo":
      return cards.dpo;
    case "phone":
      return cards.phone;
    default:
      return undefined;
  }
}

export function localizeContactCards(
  cards: RequestDemoMessages["cards"],
): ContactCardData[] {
  return REQUEST_DEMO_CONTACT_CARDS.map((card) => {
    const text = contactCardText(card.id, cards);

    if (!text) {
      return card;
    }

    return {
      ...card,
      title: text.title,
      description: text.description,
    };
  });
}

export function buildRequestDemoFormCopy(
  messages: RequestDemoMessages,
): RequestDemoFormCopy {
  const { form } = messages;

  return {
    contactType: {
      legend: form.contactType.legend,
      options: CONTACT_TYPE_OPTIONS.map((option) =>
        withDisplayLabel(
          option,
          contactOptionLabel(option.value, form.contactType),
        ),
      ),
    },
    name: form.name,
    email: form.email,
    company: form.company,
    phone: form.phone,
    productInterest: {
      label: form.productInterest.label,
      placeholder: form.productInterest.placeholder,
      options: PRODUCT_INTEREST_OPTIONS.map((option) =>
        withDisplayLabel(
          option,
          productOptionLabel(option.value, form.productInterest),
        ),
      ),
    },
    message: form.message,
    privacy: form.privacy,
    honey: form.honey,
    submit: form.submit,
    submitting: form.submitting,
    security: form.security,
    validation: form.validation,
    success: form.success,
    feedback: messages.feedback,
  };
}
