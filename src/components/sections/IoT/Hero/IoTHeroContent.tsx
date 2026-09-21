import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";

import { IOT_HERO_COPY } from "./iotHero.constants";

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
    </div>
  );
}
