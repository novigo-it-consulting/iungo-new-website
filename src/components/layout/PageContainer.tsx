import type { ComponentPropsWithoutRef } from "react";

type PageContainerSize =
  | "default"
  | "organizer"
  | "organizerSteps"
  | "organizerCapabilities"
  | "organizerComparison"
  | "cta"
  | "content1280"
  | "content1152"
  | "hero1224";

const sizeClasses: Record<PageContainerSize, string> = {
  default:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1260px]",
  // Em 2xl+ (≥1536px), a margem esquerda é travada em 329px para alinhar
  // com o logo do Header (fixo em 329px via mx-[233.16px] + pl-[95.84px]).
  organizer:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1266px] 2xl:ml-[329px] 2xl:w-auto",
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
