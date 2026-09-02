import Link from "next/link";
import type { ReactNode } from "react";

import {
  primaryLinkClassName,
  primaryLinkLabelClassName,
} from "./primaryLink.styles";

interface PrimaryLinkProps {
  href: string;
  children: ReactNode;
}

export default function PrimaryLink({ href, children }: PrimaryLinkProps) {
  return (
    <Link href={href} className={primaryLinkClassName}>
      <span className={primaryLinkLabelClassName}>{children}</span>
    </Link>
  );
}
