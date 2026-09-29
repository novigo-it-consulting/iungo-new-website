import { primaryFocusVisibleClassName } from "@/components/ui/buttonInteraction.styles";

const requestDemoFeedbackBaseClassName =
  "mt-[20px] flex w-full min-w-0 items-start gap-3 rounded-[8px] border-l-[3px] px-4 py-3";

export const requestDemoFeedbackSuccessClassName = [
  requestDemoFeedbackBaseClassName,
  "border-[#16A34A] bg-[#F0FDF4]",
].join(" ");

export const requestDemoFeedbackErrorClassName = [
  requestDemoFeedbackBaseClassName,
  "border-[#A72121] bg-[#FEF2F2]",
].join(" ");

export const requestDemoFeedbackSuccessIconClassName = "text-[#16A34A]";

export const requestDemoFeedbackErrorIconClassName = "text-[#A72121]";

export const requestDemoFeedbackSuccessTextClassName =
  "m-0 font-reddit text-[14.5px] font-medium leading-[21px] tracking-[0] text-[#14532D]";

export const requestDemoFeedbackErrorTextClassName =
  "m-0 font-reddit text-[14.5px] font-medium leading-[21px] tracking-[0] text-[#7F1D1D]";

export const requestDemoFeedbackErrorLinkClassName = [
  "underline underline-offset-2",
  primaryFocusVisibleClassName,
].join(" ");
