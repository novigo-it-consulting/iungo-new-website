import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

import {
  primaryLinkClassName,
  primaryLinkLabelClassName,
} from "./primaryLink.styles";

type PrimaryLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
};

export default function PrimaryLink({
  href,
  children,
  className = primaryLinkClassName,
  labelClassName = primaryLinkLabelClassName,
}: Readonly<PrimaryLinkProps>) {
  return (
    <Link href={href} className={className}>
      <span className={labelClassName}>{children}</span>
    </Link>
  );
}
