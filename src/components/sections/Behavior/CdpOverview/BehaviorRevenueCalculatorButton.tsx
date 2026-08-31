import Link from "next/link";

export default function BehaviorRevenueCalculatorButton() {
  return (
    <Link
      href="/#roi-calculator"
      data-behavior-revenue-calculator-cta
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[50px] bg-[#000D3F] px-[26px] py-[14px] font-reddit text-[15.2px] font-semibold leading-[22.8px] tracking-[0] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000D3F] focus-visible:ring-offset-2"
    >
      Calcular meu caso
    </Link>
  );
}
