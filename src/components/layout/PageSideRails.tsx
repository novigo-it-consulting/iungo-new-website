import type { ReactNode } from "react";

interface PageSideRailsProps {
  scope: string;
  children: ReactNode;
  className?: string;
  mainClassName?: string;
}

export default function PageSideRails({
  scope,
  children,
  className = "",
  mainClassName = "",
}: PageSideRailsProps) {
  return (
    <div
      data-page-rail-layout={scope}
      className={`grid w-full grid-cols-1 2xl:grid-cols-[329px_minmax(0,1fr)_325px] ${className}`}
    >
      <div
        data-page-left-rail={scope}
        aria-hidden="true"
        className="hidden bg-transparent 2xl:block"
      />

      <div
        data-page-main-content={scope}
        className={`min-w-0 ${mainClassName}`}
      >
        {children}
      </div>

      <div
        data-page-right-rail={scope}
        aria-hidden="true"
        className="hidden bg-transparent 2xl:block"
      />
    </div>
  );
}
