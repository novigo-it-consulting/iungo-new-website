import type { ComponentPropsWithoutRef } from "react";

type PageContainerSize =
  | "default"
  | "organizerSteps"
  | "organizerCapabilities"
  | "organizerComparison"
  | "cta"
  | "content1280"
  | "content1152"
  | "content1264";

const sizeClasses: Record<PageContainerSize, string> = {
  // Frame padrão — margem de 330px em 1920px.
  default:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1260px]",
  // Frame Organizer Steps — 1280px com padding interno horizontal.
  organizerSteps:
    "w-full max-w-[1280px] px-6 sm:px-8",
  // Frame Organizer Capabilities — 1280px com padding interno horizontal.
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
  // Frame estrutural principal — margem de 328px em 1920px.
  // Alcança max-w em viewports >= 1328px (1264 + 32 + 32).
  // Usado pelo Header, heróis e conteúdo principal.
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
