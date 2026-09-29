/** Rótulo do fieldset “TIPO DE CONTATO” — gap de 16px até os selos. */
export const requestDemoFieldLabelClassName =
  "mb-4 block w-fit p-0 font-reddit text-[15.48px] font-normal leading-[20.6px] tracking-[0.77px] text-[#71717A]";

/** Rótulo dos campos de texto — gap de 11,36px até o input (Y input 31,96 − line-height 20,6). */
export const requestDemoTextFieldLabelClassName =
  "mb-[11.36px] block w-fit p-0 font-reddit text-[15.48px] font-normal leading-[20.6px] tracking-[0.77px] text-[#71717A]";

export const requestDemoFieldGroupClassName = "flex min-w-0 flex-col";

export const requestDemoFieldInputClassName =
  "box-border h-[54.18px] w-full min-w-0 rounded-[64.49px] border-[1.29px] border-solid border-[#E4E4E7] bg-white px-[19.35px] font-reddit text-[18.06px] font-normal leading-[21.7px] tracking-[0] text-[#27272A] outline-none placeholder:text-[#27272A] focus-visible:border-[#0024AE] focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 motion-reduce:transition-none";

export const requestDemoSelectClassName =
  "box-border h-[54.18px] w-full min-w-0 appearance-none rounded-[64.49px] border-[1.29px] border-solid border-[#E4E4E7] bg-[#EFEFEF] px-[19.35px] font-reddit text-[18.06px] font-normal leading-[21.7px] tracking-[0] text-[#27272A] outline-none focus-visible:border-[#0024AE] focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2 motion-reduce:transition-none";

export const requestDemoFieldInvalidClassName =
  "border-[#A72121] focus-visible:border-[#A72121] focus-visible:ring-[#A72121]";

export function withRequestDemoInvalidClass(
  baseClassName: string,
  errorMessage?: string,
): string {
  if (!errorMessage) {
    return baseClassName;
  }

  return `${baseClassName} ${requestDemoFieldInvalidClassName}`;
}

export const requestDemoFieldErrorTextClassName =
  "mt-2 font-reddit text-[12.9px] font-normal leading-[19.3px] tracking-[0] text-[#A72121]";
