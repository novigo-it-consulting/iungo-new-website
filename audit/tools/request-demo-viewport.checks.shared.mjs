/**
 * Conferências do payload e do DOM do formulário.
 */
function summarizePayload(body) {
  return {
    keys: Object.keys(body).sort((left, right) => left.localeCompare(right)),
    honeyLength: typeof body._honey === "string" ? body._honey.length : -1,
    hasNome: typeof body.NOME === "string" && body.NOME.length > 0,
    hasEmail: typeof body["EMAIL CORPORATIVO"] === "string",
    hasEmpresa: typeof body.EMPRESA === "string" && body.EMPRESA.length > 0,
    hasTemplate: body._template === "table",
  };
}

export function payloadSummary(bodyText) {
  try {
    return summarizePayload(JSON.parse(bodyText));
  } catch {
    const params = new URLSearchParams(bodyText ?? "");
    const body = Object.fromEntries(params.entries());
    if (Object.keys(body).length === 0) {
      return { parseError: true };
    }
    return summarizePayload(body);
  }
}

export function recordDomChecks(record, prefix, dom) {
  record(`${prefix}:single-demo-form`, dom.demoFormCount === 1, {
    demoFormCount: dom.demoFormCount,
    formCount: dom.formCount,
  });
  record(`${prefix}:no-duplicate-ids`, dom.duplicateIds.length === 0, {
    duplicateIds: dom.duplicateIds,
  });
  record(`${prefix}:submit-bound-to-form`, dom.submitInsideDemoForm, {
    submitInsideDemoForm: dom.submitInsideDemoForm,
  });
  record(`${prefix}:honey-empty-before-submit`, dom.honeyLength === 0, {
    honeyLength: dom.honeyLength,
    honeyAutocomplete: dom.honeyAutocomplete,
    honeyIsFirstTextInput: dom.honeyIsFirstTextInput,
    textInputNames: dom.textInputNames,
  });
  record(`${prefix}:honey-not-first-text-input`, !dom.honeyIsFirstTextInput, {
    textInputNames: dom.textInputNames,
  });
  record(
    `${prefix}:required-fields-present`,
    dom.requiredFields.every((field) => field.present && !field.hidden),
    { requiredFields: dom.requiredFields },
  );
}

export function recordCapturedRequest(record, prefix, captured) {
  const post = captured.find((item) => item.method === "POST");
  record(
    `${prefix}:request-fired-once`,
    captured.filter((item) => item.method === "POST").length === 1,
    { methods: captured.map((item) => item.method) },
  );
  record(`${prefix}:no-preflight`, !captured.some((item) => item.method === "OPTIONS"), {
    methods: captured.map((item) => item.method),
  });
  record(
    `${prefix}:same-endpoint-post-json`,
    Boolean(
      post?.payload.hasNome &&
        post?.payload.hasEmail &&
        post?.payload.hasEmpresa &&
        post?.payload.hasTemplate &&
        post?.payload.honeyLength === 0,
    ),
    post ?? "missing-request",
  );
}

export function recordMockedSuccess(record, prefix, feedback, consoleErrors) {
  record(`${prefix}:mocked-success-ui`, /sucesso/i.test(feedback), {
    feedbackLength: feedback.length,
    consoleErrors,
  });
}
