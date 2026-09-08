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
  children: ReactNode;
};

export default function ProductHeroLayout({
  scope,
  titleId,
  gradientClassName,
  sectionClassName = "",
  children,
}: ProductHeroLayoutProps) {
  return (
    <section
      {...{ [`data-${scope}-hero-section`]: true }}
      aria-labelledby={titleId}
      className={`${productHeroSectionBaseClassName} ${gradientClassName} ${sectionClassName}`.trim()}
    >
      <PageContainer
        {...{ [`data-${scope}-hero-container`]: true }}
        size="content1264"
        className="min-w-0"
      >
        <div className={productHeroGridClassName}>{children}</div>
      </PageContainer>
    </section>
  );
}
