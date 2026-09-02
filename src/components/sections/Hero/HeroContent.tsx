import HeroActions from "./HeroActions";
import {
  homeHeroContentClassName,
  homeHeroCopyClassName,
  homeHeroDescriptionClassName,
  homeHeroTitleClassName,
  homeHeroTitleLineClassName,
} from "./homeHero.styles";

export default function HeroContent() {
  return (
    <div data-hero-content className={homeHeroContentClassName}>
      <div data-hero-copy className={homeHeroCopyClassName}>
        <h1
          id="hero-title"
          data-hero-title
          data-gradient-heading
          data-page-content-anchor="hero"
          className={homeHeroTitleClassName}
        >
          <span className={homeHeroTitleLineClassName}>Catálogo. Cliente.</span>
          <span className={homeHeroTitleLineClassName}>Atendimento. Vendas.</span>
          <span
            data-hero-highlight
            className={`${homeHeroTitleLineClassName} font-bold text-[#0024AE]`}
          >
            Em uma IA unificada.
          </span>
        </h1>
        <p data-hero-description className={homeHeroDescriptionClassName}>
          A única plataforma do Brasil que integra PIM, CDP, Concierge, AI
          Agents e IoT sobre uma infraestrutura proprietária de IA pronta para
          varejo digital de alta complexidade.
        </p>
      </div>

      <HeroActions />
    </div>
  );
}
