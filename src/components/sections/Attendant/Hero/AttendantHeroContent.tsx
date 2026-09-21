import ProductHeroTitle from "@/components/sections/shared/Hero/ProductHeroTitle";
import {
  productHeroContentClassName,
  productHeroDescriptionBlockClassName,
  productHeroIconSpacingClassName,
  productHeroParagraphClassName,
} from "@/components/sections/shared/Hero/productHero.styles";
import ProductHeroIcon from "@/components/sections/shared/Hero/ProductHeroIcon";
import { PRODUCT_HERO_ICONS } from "@/components/sections/shared/Hero/productHeroIcon.config";

export default function AttendantHeroContent() {
  return (
    <div data-attendant-hero-content className={productHeroContentClassName}>
      <div className={productHeroIconSpacingClassName}>
        <ProductHeroIcon {...PRODUCT_HERO_ICONS.attendant} />
      </div>

      <ProductHeroTitle
        id="attendant-hero-title"
        title="Iungo Attendant"
        dataPrefix="attendant"
      />

      <div
        data-attendant-hero-description-block
        className={`${productHeroDescriptionBlockClassName} max-w-[566px]`}
      >
        <p
          data-attendant-hero-description
          className={productHeroParagraphClassName}
        >
          O agente que executa, não só responde.
          <br />
          Cancela pedido, troca tamanho, emite segunda via, atualiza endereço,
          gera nota fiscal. Operações reais via APIs do seu ERP, OMS e WMS —
          com auditoria completa.
        </p>
      </div>
    </div>
  );
}
