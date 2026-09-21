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

/** Pílula azul compacta (Cases, ProductCard). Largura/altura ficam no consumidor. */
export const ctaPillBaseClassName = [
  "box-border inline-flex shrink-0 cursor-pointer items-center justify-center gap-[8.67px]",
  "whitespace-nowrap rounded-[43.36px] border-0 px-[13.88px] py-[6.94px] shadow-none",
].join(" ");

export const ctaPillLabelClassName =
  "h-auto w-fit whitespace-nowrap font-reddit text-[13.63px] font-bold leading-[20.8px] tracking-[0] text-white";
