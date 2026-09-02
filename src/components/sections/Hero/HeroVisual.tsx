import Image from "next/image";

import {
  homeHeroImageClassName,
  homeHeroImageSizes,
  homeHeroVisualClassName,
} from "./homeHero.styles";

export default function HeroVisual() {
  return (
    <div data-hero-visual className={homeHeroVisualClassName}>
      <Image
        src="/images/hero/hero-platform-icons.png"
        alt="Ícones representando atendimento, automação, integração, vendas e análise da plataforma Iungo"
        fill
        preload
        sizes={homeHeroImageSizes}
        className={homeHeroImageClassName}
      />
    </div>
  );
}
