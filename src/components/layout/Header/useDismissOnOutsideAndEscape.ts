"use client";

import { useEffect } from "react";

type UseDismissOnOutsideAndEscapeParams = {
  isOpen: boolean;
  isInside: (target: Node) => boolean;
  onOutside: () => void;
  onEscape: () => void;
};

/**
 * Clique fora (mousedown) e Escape — o mesmo padrão do mega menu de Soluções.
 */
export function useDismissOnOutsideAndEscape({
  isOpen,
  isInside,
  onOutside,
  onEscape,
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

      onEscape();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInside, isOpen, onEscape, onOutside]);
}
