"use client";

import Link from "next/link";

import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export type SolucoesMegaMenuArrowLinkKind =
  | "view-solution"
  | "featured-case"
  | "featured-case-pending";

const ARROW_LINK_DATA_ATTRIBUTES: Record<
  SolucoesMegaMenuArrowLinkKind,
  Record<string, true>
> = {
  "view-solution": { "data-solucoes-mega-menu-view-solution-link": true },
  "featured-case": { "data-solucoes-mega-menu-featured-case-link": true },
  "featured-case-pending": {
    "data-solucoes-mega-menu-featured-case-link-pending": true,
  },
};

type SolucoesMegaMenuArrowLinkProps = {
  label: string;
  className: string;
  linkKind: SolucoesMegaMenuArrowLinkKind;
  href?: string | null;
  onNavigate?: () => void;
};

function SolucoesMegaMenuArrowLinkContent({
  label,
}: Readonly<{ label: string }>) {
  return (
    <>
      <span>{label}</span>
      <ArrowRightIcon className="size-3 shrink-0" aria-hidden="true" />
    </>
  );
}

export default function SolucoesMegaMenuArrowLink({
  label,
  className,
  linkKind,
  href,
  onNavigate,
}: Readonly<SolucoesMegaMenuArrowLinkProps>) {
  const dataAttributes = ARROW_LINK_DATA_ATTRIBUTES[linkKind];

  if (href) {
    return (
      <Link
        href={href}
        {...dataAttributes}
        className={className}
        onClick={onNavigate}
      >
        <SolucoesMegaMenuArrowLinkContent label={label} />
      </Link>
    );
  }

  return (
    <span {...dataAttributes} className={className}>
      <SolucoesMegaMenuArrowLinkContent label={label} />
    </span>
  );
}
