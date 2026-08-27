export default function RoiCalculatorActions() {
  return (
    <div
      data-roi="actions"
      className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3"
    >
      <button
        type="button"
        data-roi="cta-primary"
        className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[50px] bg-white px-[25.6px] pb-[16.19px] pt-[14.39px] font-reddit text-[15.2px] font-medium leading-[22.8px] tracking-[0] text-[#000D3F] shadow-[0_1px_2px_rgba(0,13,63,0.06),0_4px_16px_rgba(0,13,63,0.10)] transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031358] motion-reduce:transition-none"
      >
        Agendar diagnóstico
      </button>

      <button
        type="button"
        data-roi="cta-secondary"
        className="inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[50px] border border-white/[0.18] bg-transparent px-[25.6px] pb-[15.19px] pt-[13.39px] font-reddit text-[15.2px] font-medium leading-[22.8px] tracking-[0] text-white/90 transition-colors duration-150 hover:bg-white/10 hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#031358] motion-reduce:transition-none"
      >
        Conhecer a plataforma
      </button>
    </div>
  );
}
