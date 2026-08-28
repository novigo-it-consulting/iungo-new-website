import type { ComponentPropsWithoutRef } from "react";

type PageContainerSize =
  | "default"
  | "organizer"
  | "organizerSteps"
  | "organizerCapabilities";

const sizeClasses: Record<PageContainerSize, string> = {
  default:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1260px]",
  // Em 3xl+ (≥1920px), a margem esquerda é travada em 327px para alinhar
  // com o logo do Header (fixo em 329px via mx-[233.16px] + pl-[95.84px]).
  organizer:
    "w-[calc(100%_-_48px)] sm:w-[calc(100%_-_64px)] max-w-[1266px] 3xl:ml-[327px] 3xl:w-auto",
  // Frame centralizado com padding interno horizontal (não subtrai margem).
  organizerSteps:
    "w-full max-w-[1280px] px-6 sm:px-8",
  // Frame Fill de 1280px com padding interno — margem de 320px em 1920px.
  organizerCapabilities:
    "w-full max-w-[1280px] px-6 sm:px-8",
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
