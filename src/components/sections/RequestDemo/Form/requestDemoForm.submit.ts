import { CONTACT_TYPE_OPTIONS } from "./ContactType/contactType.constants";
import { PRODUCT_INTEREST_OPTIONS } from "./ProductInterest/productInterest.constants";
import type { RequestDemoSubmitPayload } from "@/lib/formsubmit";

export type RequestDemoFormValues = {
  contactType: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  productInterest: string;
  message: string;
  honey: string;
};

export type RequestDemoFieldErrors = Partial<
  Record<
    | "contactType"
    | "name"
    | "email"
    | "company"
    | "phone"
    | "productInterest"
    | "message",
    string
  >
>;

export const REQUEST_DEMO_FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 150,
  phone: 40,
  message: 4000,
} as const;

export const REQUEST_DEMO_MESSAGES = {
  required: "Preencha este campo.",
  email: "Informe um e-mail corporativo válido.",
  option: "Selecione uma opção válida.",
  tooLong: "O texto ultrapassa o limite permitido.",
  phone: "Informe um telefone válido.",
  success:
    "Mensagem enviada com sucesso! Em breve, nossa equipe entrará em contato.",
} as const;

const CONTACT_TYPE_VALUES = new Set<string>(
  CONTACT_TYPE_OPTIONS.map((option) => option.value),
);
const PRODUCT_INTEREST_VALUES = new Set(
  PRODUCT_INTEREST_OPTIONS.map((option) => option.value),
);

const UNEXPECTED_HONEYPOT_TOKEN = "unexpected-honeypot";

function isDisallowedEmailCharacter(character: string): boolean {
  return (
    character === " " ||
    character === "\t" ||
    character === "\n" ||
    character === "\r" ||
    character === "\f" ||
    character === "\v"
  );
}

function isWellFormedEmail(value: string): boolean {
  let atCount = 0;
  let atIndex = -1;

  for (let index = 0; index < value.length; index += 1) {
    const character = value.charAt(index);
    if (isDisallowedEmailCharacter(character)) {
      return false;
    }

    if (character === "@") {
      atCount += 1;
      atIndex = index;
    }
  }

  if (atCount !== 1 || atIndex <= 0 || atIndex === value.length - 1) {
    return false;
  }

  const domain = value.slice(atIndex + 1);
  const lastDot = domain.lastIndexOf(".");
  return lastDot > 0 && lastDot < domain.length - 1;
}

function readTrimmedFormEntry(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function readHoneypotEntry(value: FormDataEntryValue | null): string {
  if (value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  return value.name || UNEXPECTED_HONEYPOT_TOKEN;
}

function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
): string | undefined {
  return options.find((option) => option.value === value)?.label;
}

function countDigits(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function readRequestDemoFormValuesFromData(
  data: FormData,
): RequestDemoFormValues {
  return {
    contactType: readTrimmedFormEntry(data.get("contactType")),
    name: readTrimmedFormEntry(data.get("name")),
    email: readTrimmedFormEntry(data.get("email")),
    company: readTrimmedFormEntry(data.get("company")),
    phone: readTrimmedFormEntry(data.get("phone")),
    productInterest: readTrimmedFormEntry(data.get("productInterest")),
    message: readTrimmedFormEntry(data.get("message")),
    // O honeypot é encaminhado como lido — nunca sobrescrito com "".
    honey: readHoneypotEntry(data.get("_honey")),
  };
}

export function readRequestDemoFormValues(
  form: HTMLFormElement,
): RequestDemoFormValues {
  return readRequestDemoFormValuesFromData(new FormData(form));
}

export function validateRequestDemoForm(
  values: RequestDemoFormValues,
): RequestDemoFieldErrors {
  const errors: RequestDemoFieldErrors = {};

  if (!values.contactType) {
    errors.contactType = REQUEST_DEMO_MESSAGES.required;
  } else if (!CONTACT_TYPE_VALUES.has(values.contactType)) {
    errors.contactType = REQUEST_DEMO_MESSAGES.option;
  }

  if (!values.name) {
    errors.name = REQUEST_DEMO_MESSAGES.required;
  } else if (values.name.length > REQUEST_DEMO_FIELD_LIMITS.name) {
    errors.name = REQUEST_DEMO_MESSAGES.tooLong;
  }

  if (!values.email) {
    errors.email = REQUEST_DEMO_MESSAGES.required;
  } else if (
    values.email.length > REQUEST_DEMO_FIELD_LIMITS.email ||
    !isWellFormedEmail(values.email)
  ) {
    errors.email = REQUEST_DEMO_MESSAGES.email;
  }

  if (!values.company) {
    errors.company = REQUEST_DEMO_MESSAGES.required;
  } else if (values.company.length > REQUEST_DEMO_FIELD_LIMITS.company) {
    errors.company = REQUEST_DEMO_MESSAGES.tooLong;
  }

  if (values.phone) {
    if (
      values.phone.length > REQUEST_DEMO_FIELD_LIMITS.phone ||
      countDigits(values.phone) < 8
    ) {
      errors.phone = REQUEST_DEMO_MESSAGES.phone;
    }
  }

  if (
    values.productInterest &&
    !PRODUCT_INTEREST_VALUES.has(values.productInterest)
  ) {
    errors.productInterest = REQUEST_DEMO_MESSAGES.option;
  }

  if (values.message.length > REQUEST_DEMO_FIELD_LIMITS.message) {
    errors.message = REQUEST_DEMO_MESSAGES.tooLong;
  }

  return errors;
}

export function mapRequestDemoPayload(
  values: RequestDemoFormValues,
): RequestDemoSubmitPayload {
  const contactTypeLabel = labelFor(CONTACT_TYPE_OPTIONS, values.contactType);
  const productInterestLabel = labelFor(
    PRODUCT_INTEREST_OPTIONS,
    values.productInterest,
  );

  const payload: RequestDemoSubmitPayload = {
    "TIPO DE CONTATO": contactTypeLabel ?? values.contactType,
    NOME: values.name,
    "EMAIL CORPORATIVO": values.email,
    EMPRESA: values.company,
    // _replyto define o Reply-To do e-mail; não cria linha de conteúdo
    // adicional no template "table", então o endereço aparece uma vez.
    _replyto: values.email,
    _subject: `Nova solicitação pelo site — ${contactTypeLabel ?? values.contactType}`,
    _template: "table",
    // Encaminha o valor lido do form, sem sobrescrever.
    _honey: values.honey,
  };

  if (values.phone) {
    payload["TELEFONE / WHATSAPP"] = values.phone;
  }

  if (productInterestLabel) {
    payload["PRODUTO DE INTERESSE"] = productInterestLabel;
  }

  if (values.message) {
    payload.MENSAGEM = values.message;
  }

  return payload;
}
