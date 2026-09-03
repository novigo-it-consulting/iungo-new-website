import PrimaryLink from "@/components/ui/PrimaryLink";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";
import ProductHeroCta from "@/components/sections/shared/Hero/ProductHeroCta";

import { IOT_HERO_COPY } from "./iotHero.constants";
import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function IoTHeroContent() {
  return (
    <div data-iot-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.iot} />
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

      <ProductHeroCta productSlug="iot">
        <PrimaryLink href={SOLICITAR_DEMONSTRACAO_HREF}>
          Solicitar Demonstração
        </PrimaryLink>
      </ProductHeroCta>
    </div>
  );
}
