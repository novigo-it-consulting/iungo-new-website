export const organizerCaseStudyResultsClassName =
  "min-w-0 bg-white p-6 sm:p-8 lg:col-span-3 lg:p-10";

export const organizerCaseStudyIndicatorsClassName = [
  "@container grid w-full min-w-0 grid-cols-3",
  "gap-3 sm:gap-4",
].join(" ");

export const organizerCaseStudyIndicatorClassName =
  "flex min-w-0 flex-col items-start gap-1";

/** Escala com a largura do card; em sm+ a altura de linha volta ao desktop aprovado. */
export const organizerCaseStudyIndicatorValueClassName = [
  "block max-w-full min-w-0 whitespace-nowrap",
  "bg-[linear-gradient(180deg,#1E9F67_0%,#1E9F67_60%,#178F5C_100%)] bg-clip-text text-transparent",
  "font-reddit font-bold tracking-[-0.045em]",
  "text-[clamp(20px,8.5cqi,30px)] leading-[1.15] sm:leading-[27px]",
].join(" ");

export const organizerCaseStudyIndicatorLabelClassName =
  "w-full font-reddit text-[12px] font-normal leading-[16px] tracking-[0px] text-[#71717A]";
