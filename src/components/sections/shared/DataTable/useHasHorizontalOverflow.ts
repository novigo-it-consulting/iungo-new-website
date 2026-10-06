"use client";

import { useEffect, useState, type RefObject } from "react";

function hasHorizontalOverflow(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth;
}

/**
 * True quando o elemento precisa de rolagem horizontal.
 * Começa false para o HTML do servidor e o primeiro paint coincidirem.
 */
export function useHasHorizontalOverflow(ref: RefObject<HTMLElement | null>) {
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    const update = () => {
      setOverflows(hasHorizontalOverflow(element));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return overflows;
}
