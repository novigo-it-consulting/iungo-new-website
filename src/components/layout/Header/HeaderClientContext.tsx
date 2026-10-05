"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  DEFAULT_LANGUAGE_CODE,
  type HeaderLanguageCode,
} from "./languageSelector.constants";

type HeaderClientContextValue = {
  languageCode: HeaderLanguageCode;
  setLanguageCode: (code: HeaderLanguageCode) => void;
};

const HeaderClientContext = createContext<HeaderClientContextValue | null>(
  null,
);

export function HeaderClientProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [languageCode, setLanguageCode] = useState<HeaderLanguageCode>(
    DEFAULT_LANGUAGE_CODE,
  );

  const value = useMemo(
    () => ({
      languageCode,
      setLanguageCode,
    }),
    [languageCode],
  );

  return (
    <HeaderClientContext.Provider value={value}>
      {children}
    </HeaderClientContext.Provider>
  );
}

export function useHeaderClient() {
  const value = useContext(HeaderClientContext);

  if (!value) {
    throw new Error(
      "useHeaderClient deve ser usado dentro de HeaderClientProvider",
    );
  }

  return value;
}
