// Contêiner do bloco de feedback (sucesso / erro).
// Estrutura compartilhada: margem, flex, espaçamento, borda lateral e arredondamento.
// As cores distinguem os dois estados sem depender apenas de tom.

export const requestDemoFeedbackSuccessClassName =
  "mt-[20px] flex items-start gap-3 rounded-[8px] border-l-[3px] border-[#16A34A] bg-[#F0FDF4] px-4 py-3";

export const requestDemoFeedbackErrorClassName =
  "mt-[20px] flex items-start gap-3 rounded-[8px] border-l-[3px] border-[#A72121] bg-[#FEF2F2] px-4 py-3";

export const requestDemoFeedbackSuccessIconClassName = "text-[#16A34A]";

export const requestDemoFeedbackErrorIconClassName = "text-[#A72121]";

export const requestDemoFeedbackSuccessTextClassName =
  "m-0 font-reddit text-[14.5px] font-medium leading-[21px] tracking-[0] text-[#14532D]";

export const requestDemoFeedbackErrorTextClassName =
  "m-0 font-reddit text-[14.5px] font-medium leading-[21px] tracking-[0] text-[#7F1D1D]";
