import type { ComponentPropsWithoutRef } from "react";

import { pageOrganizerContainerClassName } from "./pageLayout.constants";

type PageContainerSize =
  | "default"
  | "organizer"
  | "organizerSteps"
  | "organizerCapabilities"
  | "organizerComparison"
  | "cta"
  | "content1280"
  | "content1152"
  | "hero1224"
  | "content1264";

const sizeClasses: Record<PageContainerSize, string> = {
  default:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1260px]",
  // Em 2xl+ (≥1536px), a margem esquerda é de 329px (PAGE_LEFT_RAIL_PX)
  // para alinhar com o trilho esquerdo do PageSideRails.
  organizer: pageOrganizerContainerClassName,
  // Frame centralizado com padding interno horizontal (não subtrai margem).
  organizerSteps:
    "w-full max-w-[1280px] px-6 sm:px-8",
  // Frame Fill de 1280px com padding interno — margem de 320px em 1920px.
  organizerCapabilities:
    "w-full max-w-[1280px] px-6 sm:px-8",
  // Frame centralizado de 1024px — área útil de 960px em qualquer resolução.
  organizerComparison:
    "w-full max-w-[1024px] px-6 sm:px-8",
  // Frame centralizado de 896px — reutilizado nas CTAs de produto.
  cta:
    "w-full max-w-[896px] px-6 sm:px-8",
  // Frame centralizado de 1280px — margem de 320px em 1920px.
  content1280:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1280px]",
  // Frame centralizado de 1152px — margem de 384px em 1920px.
  content1152:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1152px]",
  // Frame centralizado de 1224px — margem de 348px em 1920px.
  hero1224:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1224px]",
  // Frame centralizado de 1264px — margem de 328px em 1920px.
  // Alcança max-w em viewports >= 1328px (1264 + 32 + 32).
  content1264:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1264px]",
};

interface PageContainerProps extends ComponentPropsWithoutRef<"div"> {
  size?: PageContainerSize;
}

export default function PageContainer({
  size = "default",
  className = "",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
}
