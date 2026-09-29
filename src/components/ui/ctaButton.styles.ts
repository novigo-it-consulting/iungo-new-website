/**
 * Forma (border-radius) e tipografia base dos botões CTA de produto no mobile.
 * Não inclui padding horizontal — cada variante define o seu próprio.
 *
 * Consumidores diretos: ctaMobileSizeAndTypographyClassName (px-7 padrão)
 *                       BehaviorRevenueCalculatorButton (px-[26px] próprio)
 */
export const ctaMobileTypographyAndShapeClassName =
  "rounded-[50px] text-[15.2px] font-semibold leading-[22.8px] tracking-[0px]";

/**
 * Adiciona o padding horizontal padrão (px-7) ao token base.
 * Consumidores: CtaButton (seção final) e PrimaryLink (Hero de produto).
 *
 * Padding vertical (py) e cores permanecem em cada variante/consumidor.
 * O desktop restaura suas próprias dimensões via xl: em cada arquivo.
 */
export const ctaMobileSizeAndTypographyClassName =
  `${ctaMobileTypographyAndShapeClassName} px-7`;
