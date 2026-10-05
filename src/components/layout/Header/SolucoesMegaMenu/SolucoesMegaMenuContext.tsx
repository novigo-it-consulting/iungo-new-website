"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

import { useDismissOnOutsideAndEscape } from "../useDismissOnOutsideAndEscape";

type SolucoesMegaMenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  scheduleClose: () => void;
  cancelScheduledClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
};

const SolucoesMegaMenuContext =
  createContext<SolucoesMegaMenuContextValue | null>(null);

const CLOSE_DELAY_MS = 200;

export function SolucoesMegaMenuProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
  }, [clearCloseTimer]);

  const close = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [clearCloseTimer]);

  const toggle = useCallback(() => {
    setIsOpen((current) => {
      clearCloseTimer();
      return !current;
    });
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      const activeElement = document.activeElement;
      const focusIsInsidePanel = panelRef.current?.contains(activeElement);
      const focusIsOnTrigger = triggerRef.current?.contains(activeElement);

      if (!focusIsInsidePanel && !focusIsOnTrigger) {
        setIsOpen(false);
      }
    }, CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const cancelScheduledClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  const handleEscape = useCallback(() => {
    close();
    triggerRef.current?.focus();
  }, [close]);

  const isInsideMenu = useCallback((target: Node) => {
    return Boolean(
      triggerRef.current?.contains(target) || panelRef.current?.contains(target),
    );
  }, []);

  useDismissOnOutsideAndEscape({
    isOpen,
    isInside: isInsideMenu,
    onOutside: close,
    onEscape: handleEscape,
  });

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
      scheduleClose,
      cancelScheduledClose,
      triggerRef,
      panelRef,
    }),
    [
      cancelScheduledClose,
      close,
      isOpen,
      open,
      scheduleClose,
      toggle,
    ],
  );

  return (
    <SolucoesMegaMenuContext.Provider value={value}>
      {children}
    </SolucoesMegaMenuContext.Provider>
  );
}

export function useSolucoesMegaMenu() {
  const context = useContext(SolucoesMegaMenuContext);

  if (!context) {
    throw new Error(
      "useSolucoesMegaMenu must be used within SolucoesMegaMenuProvider",
    );
  }

  return context;
}
