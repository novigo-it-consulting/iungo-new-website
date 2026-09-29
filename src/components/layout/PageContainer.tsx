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

const fluidGutteredWidthClassName =
  "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)]";

const paddedFrameClassName = "w-full px-6 sm:px-8";

const sizeClasses: Record<PageContainerSize, string> = {
  // Frame padrão — margem de 330px em 1920px.
  default: `${fluidGutteredWidthClassName} max-w-[1260px]`,
  // Frame Organizer Steps — 1280px com padding interno horizontal.
  organizerSteps: `${paddedFrameClassName} max-w-[1280px]`,
  // Frame Organizer Capabilities — 1280px com padding interno horizontal.
  organizerCapabilities: `${paddedFrameClassName} max-w-[1280px]`,
  // Frame centralizado de 1024px — área útil de 960px em qualquer resolução.
  organizerComparison: `${paddedFrameClassName} max-w-[1024px]`,
  // Frame centralizado de 896px — reutilizado nas CTAs de produto.
  cta: `${paddedFrameClassName} max-w-[896px]`,
  // Frame centralizado de 1280px — margem de 320px em 1920px.
  content1280: `${fluidGutteredWidthClassName} max-w-[1280px]`,
  // Frame centralizado de 1152px — margem de 384px em 1920px.
  content1152: `${fluidGutteredWidthClassName} max-w-[1152px]`,
  // Frame estrutural principal — margem de 328px em 1920px.
  // Alcança max-w em viewports >= 1328px (1264 + 32 + 32).
  // Usado pelo Header, heróis e conteúdo principal.
  content1264: `${fluidGutteredWidthClassName} max-w-[1264px]`,
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
