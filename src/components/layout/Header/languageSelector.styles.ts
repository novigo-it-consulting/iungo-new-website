import {
  mutedFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";

/**
 * Botão fechado do seletor de idioma (desktop, xl+).
 * Medidas do Figma: 89×42px, padding assimétrico, raio 43.36px, fundo action-muted.
 * Visível apenas em xl+; o container pai já aplica hidden/xl:flex.
 */
export const languageSelectorButtonClassName = [
  "box-border inline-flex h-[42px] w-[89px] shrink-0 cursor-pointer items-center justify-center gap-[7px]",
  "pt-[6.94px] pr-[13.88px] pb-[6.94px] pl-[8px]",
  "rounded-[43.36px] bg-action-muted",
  solidButtonHoverClassName,
  mutedFocusVisibleClassName,
].join(" ");

export const languageSelectorFlagClassName = "shrink-0";

export const languageSelectorChevronClassName = "shrink-0";

/** Rótulo do botão: reaproveita ctaPillLabelClassName (mesma fonte, peso, tamanho, tracking e cor). */
export { ctaPillLabelClassName as languageSelectorLabelClassName } from "@/components/ui/actionButtonGroup.styles";
