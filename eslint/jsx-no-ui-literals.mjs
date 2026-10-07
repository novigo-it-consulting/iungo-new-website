/**
 * Acusa texto visível escrito direto no JSX.
 * A regra pronta react/jsx-no-literals, com noAttributeStrings, também
 * marca className e ids. Aqui o limite fica no texto do elemento e nos
 * atributos alt, aria-label, placeholder e title.
 */
const ALLOWED_STRINGS = new Set(["·", "+", "•", "/", "—"]);

const TEXT_ATTRIBUTES = new Set([
  "alt",
  "aria-label",
  "placeholder",
  "title",
]);

function isAllowed(value) {
  const trimmed = value.trim();
  return trimmed === "" || ALLOWED_STRINGS.has(trimmed);
}

const jsxNoUiLiterals = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Exige que texto visível, alt, aria-label, placeholder e title venham das mensagens.",
    },
    schema: [],
    messages: {
      literal:
        "Texto visível precisa vir das mensagens traduzidas, não de um literal no JSX.",
    },
  },
  create(context) {
    return {
      JSXText(node) {
        if (!isAllowed(node.value)) {
          context.report({ node, messageId: "literal" });
        }
      },
      JSXAttribute(node) {
        if (node.name.type !== "JSXIdentifier") {
          return;
        }

        if (!TEXT_ATTRIBUTES.has(node.name.name) || node.value?.type !== "Literal") {
          return;
        }

        if (typeof node.value.value === "string" && !isAllowed(node.value.value)) {
          context.report({ node, messageId: "literal" });
        }
      },
    };
  },
};

export default jsxNoUiLiterals;
