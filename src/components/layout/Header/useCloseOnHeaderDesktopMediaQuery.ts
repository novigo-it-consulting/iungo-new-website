"use client";

import { useEffect } from "react";

import { HEADER_DESKTOP_MEDIA_QUERY } from "./header.constants";

export type HeaderDesktopCloseOn = "enter-desktop" | "leave-desktop";

/**
 * Fecha um painel do Header ao cruzar o breakpoint `xl` (80rem).
 * `enter-desktop`: fecha ao entrar em xl+ (instância mobile, menu mobile).
 * `leave-desktop`: fecha ao sair de xl (instância desktop do seletor).
 */
export function useCloseOnHeaderDesktopMediaQuery(
  closeOn: HeaderDesktopCloseOn,
  close: () => void,
) {
  useEffect(() => {
    const desktopQuery = window.matchMedia(HEADER_DESKTOP_MEDIA_QUERY);

    const handleChange = () => {
      const shouldClose =
        closeOn === "enter-desktop"
          ? desktopQuery.matches
          : !desktopQuery.matches;

      if (shouldClose) {
        close();
      }
    };

    handleChange();
    desktopQuery.addEventListener("change", handleChange);

    return () => {
      desktopQuery.removeEventListener("change", handleChange);
    };
  }, [close, closeOn]);
}
