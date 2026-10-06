/**
 * Lê o DOM do formulário no navegador.
 * inspectFormDom vai inteira para page.evaluate.
 */
export function inspectFormDom(selectors, requiredFieldIds) {
  const forms = [...document.querySelectorAll("form")];
  const demoForms = forms.filter((form) => form.querySelector(selectors.honeyName));
  const ids = [...document.querySelectorAll("[id]")].map((node) => node.id);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const honey = document.querySelector(selectors.honey);
  const submit = document.querySelector(selectors.submit);
  const honeyParentForm = honey instanceof HTMLInputElement ? honey.form : null;
  const submitForm = submit instanceof HTMLButtonElement ? submit.form : null;
  const textInputs = honeyParentForm
    ? [...honeyParentForm.querySelectorAll("input")]
        .filter((input) => input.type !== "hidden" && input.type !== "radio")
        .map((input) => input.name)
    : [];
  const requiredFields = requiredFieldIds.map((id) => {
    const node = document.getElementById(id);
    const hidden =
      node instanceof HTMLElement
        ? node.getAttribute("hidden") !== null ||
          node.disabled === true ||
          getComputedStyle(node).display === "none"
        : true;
    return { id, present: Boolean(node), hidden };
  });

  return {
    formCount: forms.length,
    demoFormCount: demoForms.length,
    duplicateIds: [...new Set(duplicateIds)],
    honeyLength: honey instanceof HTMLInputElement ? honey.value.length : -1,
    honeyAutocomplete: honey instanceof HTMLInputElement ? honey.autocomplete : null,
    honeyIsFirstTextInput: textInputs[0] === "_honey",
    submitInsideDemoForm: submitForm === honeyParentForm && submitForm !== null,
    textInputNames: textInputs,
    requiredFields,
  };
}

export function readFeedback(selectors) {
  const success = document.querySelector(selectors.success);
  const error = document.querySelector(selectors.error);
  const node = success instanceof HTMLElement ? success : error;
  return node instanceof HTMLElement ? node.textContent?.trim() ?? "" : "";
}

export function readHoneyLength(honeySelector) {
  const honey = document.querySelector(honeySelector);
  return honey instanceof HTMLInputElement ? honey.value.length : -1;
}
