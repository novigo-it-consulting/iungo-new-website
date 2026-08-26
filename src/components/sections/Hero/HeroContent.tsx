import HeroActions from "./HeroActions";

export default function HeroContent() {
  return (
    <div
      data-hero-content
      className="relative z-10 w-full pt-10 xl:w-[46%] xl:pt-16 2xl:w-[741px] 2xl:pt-[87px]"
    >
      <div data-hero-copy className="w-full">
        <h1
          id="hero-title"
          data-hero-title
          className="m-0 w-full font-reddit text-[40px] font-semibold leading-[48px] tracking-[-0.01em] text-[#424241] sm:text-[48px] sm:leading-[58px] xl:text-[58px] xl:leading-[72px] 2xl:h-[285.61px] 2xl:text-[66px] 2xl:leading-[89px]"
        >
          <span className="2xl:block">Catálogo. Cliente.</span>{" "}
          <span className="2xl:block">Atendimento. Vendas.</span>{" "}
          <span
            data-hero-highlight
            className="block font-bold text-[#0024AE]"
          >
            Em uma IA unificada.
          </span>
        </h1>

        <p
          data-hero-description
          className="m-0 mt-6 w-full max-w-[561px] font-reddit text-[16px] font-normal leading-7 tracking-[0em] text-[#909090] sm:mt-7 sm:text-[18px] sm:leading-8 xl:leading-[34px] 2xl:mt-[30.39px] 2xl:w-[561px] 2xl:text-[20px] 2xl:leading-[40px]"
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
