/**
 * Espaço entre botões de ação.
 * Referência: Header (“Área do Cliente” e “Solicitar Demonstração”).
 * O grupo do Header só aparece em xl+; o valor visível é 16px, e 20px em 2xl.
 */
export const actionButtonGroupGapClassName = "gap-4 2xl:gap-[20px]";

/** Dois botões na mesma linha, padrão do Header mobile. */
export const actionButtonPairClassName = [
  "grid w-full min-w-0 grid-cols-2",
  actionButtonGroupGapClassName,
].join(" ");
