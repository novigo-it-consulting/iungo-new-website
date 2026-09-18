"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { isAvailableHref } from "@/constants/routes";
import { actionButtonGroupGapClassName } from "@/components/ui/actionButtonGroup.styles";

import { NAV_LINK_ITEMS, HEADER_BUTTONS } from "./header.constants";
import SolucoesMobileNavGroup from "./SolucoesMegaMenu/SolucoesMobileNavGroup";

const mobileNavItemClassName =
  "block min-h-[44px] cursor-pointer rounded py-3 font-reddit text-lg font-normal leading-8 text-[#383838] transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-1";

const mobileAreaClienteClassName =
  "flex h-[55px] w-full cursor-pointer items-center justify-center rounded-full bg-[#687681] px-[18.33px] font-reddit text-lg font-bold leading-[27.49px] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#687681] focus-visible:ring-offset-2";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = "mobile-navigation-menu";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const areaClienteHref = HEADER_BUTTONS.areaCliente.href;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
      >
        <span
          aria-hidden="true"
          className={[
            "block h-0.5 w-6 origin-center bg-[#383838] transition-transform duration-200",
            isOpen ? "translate-y-[7px] rotate-45" : "",
          ].join(" ")}
        />
        <span
          aria-hidden="true"
          className={[
            "block h-0.5 w-6 bg-[#383838] transition-opacity duration-200",
            isOpen ? "opacity-0" : "",
          ].join(" ")}
        />
        <span
          aria-hidden="true"
          className={[
            "block h-0.5 w-6 origin-center bg-[#383838] transition-transform duration-200",
            isOpen ? "-translate-y-[7px] -rotate-45" : "",
          ].join(" ")}
        />
      </button>

      <div
        id={menuId}
        role="dialog"
        aria-label="Menu de navegação"
        aria-modal="true"
        className={[
          "absolute left-0 top-full w-full bg-white shadow-lg transition-all duration-200",
          isOpen ? "visible opacity-100" : "invisible opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-[1728px] px-4 py-6 md:px-8">
          <nav aria-label="Navegação mobile">
            <ul className="mb-6 flex flex-col">
              <SolucoesMobileNavGroup onNavigate={close} />
              {NAV_LINK_ITEMS.map((item) => (
                <li key={item.id}>
                  {isAvailableHref(item.href) ? (
                    <Link
                      href={item.href}
                      onClick={close}
                      className={mobileNavItemClassName}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={mobileNavItemClassName}>{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={`flex flex-col ${actionButtonGroupGapClassName}`}>
            {isAvailableHref(areaClienteHref) ? (
              <Link
                href={areaClienteHref}
                onClick={close}
                className={mobileAreaClienteClassName}
              >
                {HEADER_BUTTONS.areaCliente.label}
              </Link>
            ) : (
              <span className={mobileAreaClienteClassName}>
                {HEADER_BUTTONS.areaCliente.label}
              </span>
            )}
            <Link
              href={HEADER_BUTTONS.solicitarDemo.href}
              onClick={close}
              className="flex h-[54px] w-full items-center justify-center rounded-full bg-[#0024AE] px-[18.33px] font-reddit text-lg font-bold leading-[27.49px] text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0024AE] focus-visible:ring-offset-2"
            >
              {HEADER_BUTTONS.solicitarDemo.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
