/**
 * Seletores do formulário de demonstração na auditoria de envio.
 */
export const DEMO_FORM_SELECTORS = {
  card: "[data-request-demo-form-card]",
  form: "[data-request-demo-form-card] form",
  honey: "#request-demo-honey",
  honeyName: 'input[name="_honey"]',
  submit: "[data-request-demo-form-card] button[type='submit']",
  success: "[data-request-demo-form-card] output",
  error: '[data-request-demo-form-card] [role="alert"]',
  contactType: 'label[for="request-demo-contactType-demonstracao"]',
  name: "#request-demo-name",
  email: "#request-demo-email",
  company: "#request-demo-company",
};

export const REQUIRED_FIELD_IDS = [
  "request-demo-name",
  "request-demo-email",
  "request-demo-company",
  "request-demo-contactType-demonstracao",
];
