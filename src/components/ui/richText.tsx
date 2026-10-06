import type { ReactNode } from "react";

/** `<strong class="font-bold text-[#27272A]">`. O mesmo markup em Studio, CDP e calculadora. */
export function renderInkStrong(chunks: ReactNode) {
  return <strong className="font-bold text-[#27272A]">{chunks}</strong>;
}
