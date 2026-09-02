import PrimaryLink from "@/components/ui/PrimaryLink";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroCtaClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import { IOT_HERO_COPY } from "./iotHero.constants";
import IoTHeroIcon from "./IoTHeroIcon";

export default function IoTHeroContent() {
  return (
    <div data-iot-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <IoTHeroIcon />
      </div>

      <ProductHeroTitle
        id="iot-hero-title"
        title={IOT_HERO_COPY.title}
        dataPrefix="iot"
      />

      <div
        data-iot-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[615px]`}
      >
        <p data-iot-hero-presentation className={productHeroParagraphClassName}>
          {IOT_HERO_COPY.paragraphs[0]}
        </p>

        <p
          data-iot-hero-description
          className={`mt-[14px] ${productHeroParagraphClassName}`}
        >
          {IOT_HERO_COPY.paragraphs[1]}
        </p>
      </div>

      <div data-iot-hero-cta className={productHeroCtaClassName}>
        <PrimaryLink href="/solicitar-demonstracao">
          Solicitar Demonstração
        </PrimaryLink>
      </div>
    </div>
  );
}
