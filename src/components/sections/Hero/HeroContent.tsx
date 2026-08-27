import HeroActions from "./HeroActions";

export default function HeroContent() {
  return (
    <div
      data-hero-content
      className="relative z-10 w-full pt-10 xl:w-[46%] xl:pt-16 2xl:flex 2xl:h-full 2xl:flex-col 2xl:pl-[2.78px] 2xl:pt-[71.13px] 2xl:pb-[56px]"
    >
      <div
        data-hero-copy
        className="flex w-full flex-col items-start 2xl:w-[561.03px] 2xl:gap-[23px]"
      >
        <h1
          id="hero-title"
          data-hero-title
          data-gradient-heading
          data-page-content-anchor="hero"
          className="m-0 w-full font-reddit text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[#424241] sm:text-[48px] sm:leading-[58px] xl:text-[58px] xl:leading-[72px] 2xl:h-[216.25px] 2xl:w-[561.03px] 2xl:text-[49.97px] 2xl:leading-[67.4px] 2xl:tracking-[-0.01em]"
        >
          <span className="block">Catálogo. Cliente.</span>
          <span className="block">Atendimento. Vendas.</span>
          <span
            data-hero-highlight
            className="block font-bold text-[#0024AE]"
          >
            Em uma IA unificada.
          </span>
        </h1>

        <p
          data-hero-description
          className="m-0 mt-6 w-full max-w-[561px] font-reddit text-[16px] font-normal leading-7 tracking-[0em] text-[#909090] sm:mt-7 sm:text-[18px] sm:leading-8 xl:leading-[34px] 2xl:mt-0 2xl:h-[90.86px] 2xl:w-[424.75px] 2xl:text-[15.14px] 2xl:font-normal 2xl:leading-[30.3px] 2xl:tracking-normal"
        >
          A única plataforma do Brasil que integra PIM, CDP, Concierge, AI
          Agents e IoT sobre uma infraestrutura proprietária de IA pronta para
          varejo digital de alta complexidade.
        </p>
      </div>

      <HeroActions />
    </div>
  );
}
