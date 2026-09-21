import type { ReactNode } from "react";

import PageContainer from "@/components/layout/PageContainer";

import {
  productHeroGridClassName,
  productHeroSectionBaseClassName,
} from "./productHero.styles";

type ProductHeroLayoutProps = {
  scope: string;
  titleId: string;
  gradientClassName: string;
  sectionClassName?: string;
  gridClassName?: string;
  content: ReactNode;
  visual: ReactNode;
  cta: ReactNode;
};

export default function ProductHeroLayout({
  scope,
  titleId,
  gradientClassName,
  sectionClassName = "",
  gridClassName = productHeroGridClassName,
  content,
  visual,
  cta,
}: Readonly<ProductHeroLayoutProps>) {
  const sectionClassNames = [
    productHeroSectionBaseClassName,
    gradientClassName,
    sectionClassName,
  ]
    .filter((value) => value.length > 0)
    .join(" ");

  return (
    <section
      {...{ [`data-${scope}-hero-section`]: true }}
      aria-labelledby={titleId}
      className={sectionClassNames}
    >
      <PageContainer
        {...{ [`data-${scope}-hero-container`]: true }}
        size="content1264"
        className={["min-w-0", gridClassName].join(" ")}
      >
        {content}
        {visual}
        {cta}
      </PageContainer>
    </section>
  );
}
