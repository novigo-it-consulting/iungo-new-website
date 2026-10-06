import {
  productHeroTitleClassName,
  productHeroTitleFrameClassName,
} from "./productHero.styles";

type ProductHeroTitleProps = {
  id: string;
  title: string;
  dataPrefix: string;
};

export default function ProductHeroTitle({
  id,
  title,
  dataPrefix,
}: Readonly<ProductHeroTitleProps>) {
  return (
    <div
      {...{ [`data-${dataPrefix}-hero-title-frame`]: true }}
      className={productHeroTitleFrameClassName}
    >
      <h1
        id={id}
        {...{ [`data-${dataPrefix}-hero-title`]: true }}
        className={productHeroTitleClassName}
      >
        {title}
      </h1>
    </div>
  );
}
