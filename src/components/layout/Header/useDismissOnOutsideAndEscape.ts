"use client";

import { useEffect } from "react";

type UseDismissOnOutsideAndEscapeParams = {
  isOpen: boolean;
  isInside: (target: Node) => boolean;
  onOutside: () => void;
  onEscape: () => void;
  /**
   * Quando true, Escape é ouvido na captura e o evento é consumido
   * (`preventDefault` + `stopImmediatePropagation`) para não fechar
   * outro overlay no mesmo aperto — usado pelo seletor de idioma mobile.
   * Desligado por padrão para o mega menu e demais consumidores.
   */
  consumeEscape?: boolean;
};

/**
 * Clique fora (mousedown) e Escape — o mesmo padrão do mega menu de Soluções.
 */
export function useDismissOnOutsideAndEscape({
  isOpen,
  isInside,
  onOutside,
  onEscape,
  consumeEscape = false,
}: UseDismissOnOutsideAndEscapeParams) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (isInside(event.target as Node)) {
        return;
      }

      onOutside();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      if (consumeEscape) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }

      onEscape();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown, consumeEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown, consumeEscape);
    };
  }, [consumeEscape, isInside, isOpen, onEscape, onOutside]);
}
