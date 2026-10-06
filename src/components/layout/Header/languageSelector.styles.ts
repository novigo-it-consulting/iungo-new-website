import {
  darkSurfaceFocusVisibleClassName,
  mutedFocusVisibleClassName,
  solidButtonHoverClassName,
} from "@/components/ui/buttonInteraction.styles";
import { disclosureChevronClassName } from "@/components/ui/disclosureChevron.styles";

/**
 * Base compartilhada do botão e dos itens da lista.
 * Medidas, padding do Figma (incl. pl 8px), justify-start, hover — sem fundo, raio nem foco.
 */
export const languageSelectorPillBaseClassName = [
  "box-border inline-flex h-[42px] w-[89px] shrink-0 cursor-pointer items-center justify-start gap-[7px]",
  "pt-[6.94px] pr-[13.88px] pb-[6.94px] pl-[8px]",
  solidButtonHoverClassName,
].join(" ");

/** Botão do idioma atual: pílula action-muted com raio 43.36px e foco muted. */
export const languageSelectorButtonClassName = [
  languageSelectorPillBaseClassName,
  "relative z-[2] rounded-[43.36px] bg-action-muted",
  mutedFocusVisibleClassName,
].join(" ");

/** Itens da lista: sem fundo próprio; foco para superfície escura. */
export const languageSelectorOptionClassName = [
  languageSelectorPillBaseClassName,
  "relative z-[2] bg-transparent",
  darkSurfaceFocusVisibleClassName,
].join(" ");

/**
 * z-[60] no root: a lista absoluta herda este stacking context e fica acima
 * do painel mobile (z-50), que é irmão — não descendente — do seletor.
 */
export const languageSelectorRootClassName =
  "relative z-[60] w-[89px] shrink-0";

/**
 * Único fundo da lista aberta: 89×126, raio 21px, action-muted-strong.
 * Absoluto a partir do topo do botão; não entra no fluxo do Header.
 */
export const languageSelectorOpenColumnClassName =
  "pointer-events-none absolute top-0 left-0 z-[1] h-[126px] w-[89px] rounded-[21px] bg-action-muted-strong";

/**
 * Lista absoluta colada na base do botão, sem fundo próprio.
 * z-[60]: acima do mega menu (z-40) e do painel mobile (z-50), abaixo dos cookies (z-[200]/z-[300]).
 */
export const languageSelectorListClassName =
  "absolute top-full left-0 z-[60] m-0 flex w-[89px] list-none flex-col p-0";

export const languageSelectorFlagClassName =
  "shrink-0 object-contain object-center";

export const languageSelectorChevronClassName = [
  "shrink-0",
  disclosureChevronClassName,
].join(" ");

export { disclosureChevronOpenClassName as languageSelectorChevronOpenClassName } from "@/components/ui/disclosureChevron.styles";

/** Rótulo: reaproveita ctaPillLabelClassName (mesma fonte, peso, tamanho, tracking e cor). */
export { ctaPillLabelClassName as languageSelectorLabelClassName } from "@/components/ui/actionButtonGroup.styles";
