"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  COOKIE_CONSENT_STORAGE_KEY,
  createAcceptAllRecord,
  createRejectNonEssentialRecord,
  isConsentRecordCurrentlyValid,
  readConsentRecord,
  writeConsentRecord,
  type CookieConsentChoice,
  type CookieConsentRecord,
  type KeyValueStorage,
} from "@/lib/cookieConsent";

import { COOKIE_SETTINGS_TRIGGER_ID } from "./cookieConsent.constants";

export type CookieConsentContextValue = {
  hydrated: boolean;
  decision: CookieConsentRecord | null;
  persisted: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (choice: CookieConsentChoice) => void;
  openPreferences: (trigger?: HTMLElement | null) => void;
  closePreferences: () => void;
};

type ConsentSnapshot = {
  hydrated: boolean;
  decision: CookieConsentRecord | null;
  persisted: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

const memoryStore = new Map<string, string>();

const memoryStorage: KeyValueStorage = {
  getItem(key) {
    return memoryStore.get(key) ?? null;
  },
  setItem(key, value) {
    memoryStore.set(key, value);
  },
};

const SERVER_SNAPSHOT: ConsentSnapshot = {
  hydrated: false,
  decision: null,
  persisted: true,
};

let sessionDecision: CookieConsentRecord | null = null;
let clientSnapshot: ConsentSnapshot = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();
let localStorageUsable: boolean | undefined;

function canUseLocalStorage(): boolean {
  if (localStorageUsable !== undefined) {
    return localStorageUsable;
  }

  try {
    const probeKey = "__iungo_cookie_consent_probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    localStorageUsable = true;
  } catch {
    localStorageUsable = false;
  }

  return localStorageUsable;
}

function getConsentStorage(): { storage: KeyValueStorage; durable: boolean } {
  if (typeof window === "undefined" || !canUseLocalStorage()) {
    return { storage: memoryStorage, durable: false };
  }

  return { storage: window.localStorage, durable: true };
}

function readSnapshot(): ConsentSnapshot {
  const { storage, durable } = getConsentStorage();
  const stored = readConsentRecord(storage);

  if (stored) {
    sessionDecision = stored;
    return { hydrated: true, decision: stored, persisted: durable };
  }

  if (
    !durable &&
    sessionDecision &&
    isConsentRecordCurrentlyValid(sessionDecision)
  ) {
    return { hydrated: true, decision: sessionDecision, persisted: false };
  }

  sessionDecision = null;
  return { hydrated: true, decision: null, persisted: durable };
}

function snapshotsAreEqual(left: ConsentSnapshot, right: ConsentSnapshot) {
  return (
    left.hydrated === right.hydrated &&
    left.persisted === right.persisted &&
    JSON.stringify(left.decision) === JSON.stringify(right.decision)
  );
}

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

function refreshFromStorage() {
  const next = readSnapshot();

  if (snapshotsAreEqual(clientSnapshot, next)) {
    return;
  }

  clientSnapshot = next;
  emit();
}

function handleVisibility() {
  if (document.visibilityState === "visible") {
    refreshFromStorage();
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key === null || event.key === COOKIE_CONSENT_STORAGE_KEY) {
    refreshFromStorage();
  }
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  if (listeners.size === 1) {
    window.addEventListener("focus", refreshFromStorage);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("storage", handleStorage);
    refreshFromStorage();
  }

  return () => {
    listeners.delete(onStoreChange);

    if (listeners.size === 0) {
      window.removeEventListener("focus", refreshFromStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getClientSnapshot() {
  if (!clientSnapshot.hydrated) {
    clientSnapshot = readSnapshot();
  }

  return clientSnapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

function persistRecord(record: CookieConsentRecord) {
  const { storage, durable } = getConsentStorage();
  const wrote = writeConsentRecord(storage, record);
  sessionDecision = record;
  clientSnapshot = {
    hydrated: true,
    decision: record,
    persisted: durable && wrote,
  };
  emit();
}

function restoreFocus(trigger: HTMLElement | null) {
  const target = trigger?.isConnected
    ? trigger
    : document.getElementById(COOKIE_SETTINGS_TRIGGER_ID);

  target?.focus({ preventScroll: true });
}

export function CookieConsentStateProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const persistDecision = useCallback(
    (record: CookieConsentRecord) => {
      persistRecord(record);

      if (isPreferencesOpen) {
        setIsPreferencesOpen(false);
        return;
      }

      const trigger = triggerRef.current;
      triggerRef.current = null;
      queueMicrotask(() => {
        restoreFocus(trigger);
      });
    },
    [isPreferencesOpen],
  );

  const savePreferences = useCallback(
    (choice: CookieConsentChoice) => {
      persistDecision(
        choice === "accept-all"
          ? createAcceptAllRecord(Date.now())
          : createRejectNonEssentialRecord(Date.now()),
      );
    },
    [persistDecision],
  );

  const acceptAll = useCallback(() => {
    savePreferences("accept-all");
  }, [savePreferences]);

  const rejectNonEssential = useCallback(() => {
    savePreferences("reject-non-essential");
  }, [savePreferences]);

  const openPreferences = useCallback((trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? null;
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    queueMicrotask(() => {
      restoreFocus(trigger);
    });
  }, []);

  const value = useMemo(
    () => ({
      hydrated: snapshot.hydrated,
      decision: snapshot.decision,
      persisted: snapshot.persisted,
      isPreferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
    }),
    [
      acceptAll,
      closePreferences,
      isPreferencesOpen,
      openPreferences,
      rejectNonEssential,
      savePreferences,
      snapshot.decision,
      snapshot.hydrated,
      snapshot.persisted,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsent deve ser usado dentro de um CookieConsentProvider",
    );
  }

  return context;
}
