"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import HeaderDesktopNav from "./HeaderDesktopNav";
import {
  headerFrameClassName,
} from "./header.styles";
import MobileNavigation from "./MobileNavigation";
import SolucoesMegaMenuPanel from "./SolucoesMegaMenu/SolucoesMegaMenuPanel";
import { SolucoesMegaMenuProvider } from "./SolucoesMegaMenu/SolucoesMegaMenuContext";

type HeaderShellProps = {
  actions: ReactNode;
};

export default function HeaderShell({ actions }: Readonly<HeaderShellProps>) {
  return (
    <SolucoesMegaMenuProvider>
      <div data-header-frame className={headerFrameClassName}>
        <div
          data-header-content
          data-page-main-content="header"
          className="flex h-full min-w-0 items-center justify-between gap-4 xl:max-w-[1271px] xl:mx-auto xl:gap-6 2xl:gap-8"
        >
          <Link
            data-header-logo
            data-page-content-anchor="header"
            href="/"
            aria-label="Iungo Intelligence — página inicial"
            className="block shrink-0 2xl:h-[42.4px] 2xl:w-[118.87px]"
          >
            <Image
              src="/images/logo.png"
              alt="Iungo Intelligence"
              width={157}
              height={56}
              className="h-auto w-[130px] object-contain sm:w-[145px] xl:w-[150px] 2xl:h-full 2xl:w-full 2xl:max-w-[157px]"
              priority
            />
          </Link>

          <HeaderDesktopNav />

          {actions}

          <MobileNavigation />
        </div>
      </div>

      <SolucoesMegaMenuPanel />
    </SolucoesMegaMenuProvider>
  );
}
