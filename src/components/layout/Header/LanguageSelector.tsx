"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

import LanguageSelectorChevronIcon from "@/components/icons/LanguageSelectorChevronIcon";

import { useHeaderClient } from "./HeaderClientContext";
import {
  LANGUAGE_SELECTOR_FLAG_SIZE,
  getHeaderLanguage,
  getOtherHeaderLanguages,
  type HeaderLanguage,
  type HeaderLanguageCode,
} from "./languageSelector.constants";
import {
  languageSelectorButtonClassName,
  languageSelectorChevronClassName,
  languageSelectorChevronOpenClassName,
  languageSelectorFlagClassName,
  languageSelectorLabelClassName,
  languageSelectorListClassName,
  languageSelectorOpenColumnClassName,
  languageSelectorOptionClassName,
  languageSelectorRootClassName,
} from "./languageSelector.styles";
import { useCloseOnHeaderDesktopMediaQuery } from "./useCloseOnHeaderDesktopMediaQuery";
import { useDismissOnOutsideAndEscape } from "./useDismissOnOutsideAndEscape";

type FocusOrigin = "keyboard" | "pointer";

type FocusWithVisibility = FocusOptions & { focusVisible?: boolean };

export type LanguageSelectorInstance = "desktop" | "mobile";

type LanguageSelectorProps = {
  instance: LanguageSelectorInstance;
};

function focusTrigger(
  element: HTMLElement | null,
  origin: FocusOrigin,
) {
  if (!element) {
    return;
  }

  if (origin === "keyboard" && document.activeElement === element) {
    element.blur();
  }

  element.focus({
    preventScroll: true,
    focusVisible: origin === "keyboard",
  } as FocusWithVisibility);
}

function clickOrigin(event: { detail: number }): FocusOrigin {
  return event.detail === 0 ? "keyboard" : "pointer";
}

function LanguageFlag({ language }: Readonly<{ language: HeaderLanguage }>) {
  return (
    <Image
      src={language.flagSrc}
      alt=""
      aria-hidden="true"
      width={LANGUAGE_SELECTOR_FLAG_SIZE}
      height={LANGUAGE_SELECTOR_FLAG_SIZE}
      unoptimized
      data-header-language-flag={language.code}
      className={languageSelectorFlagClassName}
    />
  );
}

export default function LanguageSelector({
  instance,
}: Readonly<LanguageSelectorProps>) {
  const {
    languageCode: currentCode,
    setLanguageCode: setCurrentCode,
  } = useHeaderClient();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  const currentLanguage = getHeaderLanguage(currentCode);
  const otherLanguages = getOtherHeaderLanguages(currentCode);
  const closeOnDesktop =
    instance === "mobile" ? "enter-desktop" : "leave-desktop";

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const closeAndRestoreFocus = useCallback((origin: FocusOrigin) => {
    setIsOpen(false);
    focusTrigger(triggerRef.current, origin);
  }, []);

  const selectLanguage = useCallback(
    (code: HeaderLanguageCode, origin: FocusOrigin) => {
      setCurrentCode(code);
      closeAndRestoreFocus(origin);
    },
    [closeAndRestoreFocus, setCurrentCode],
  );

  const isInsideSelector = useCallback((target: Node) => {
    return Boolean(rootRef.current?.contains(target));
  }, []);

  const closeFromEscape = useCallback(() => {
    closeAndRestoreFocus("keyboard");
  }, [closeAndRestoreFocus]);

  useDismissOnOutsideAndEscape({
    isOpen,
    isInside: isInsideSelector,
    onOutside: close,
    onEscape: closeFromEscape,
    consumeEscape: true,
  });

  useCloseOnHeaderDesktopMediaQuery(closeOnDesktop, close);

  return (
    <div
      ref={rootRef}
      data-header-language-root
      data-header-language-instance={instance}
      className={languageSelectorRootClassName}
      onBlur={(event) => {
        if (!isOpen) {
          return;
        }

        const nextTarget = event.relatedTarget;

        if (
          nextTarget instanceof Node &&
          rootRef.current?.contains(nextTarget)
        ) {
          return;
        }

        close();
      }}
    >
      {isOpen ? (
        <div
          aria-hidden="true"
          data-header-language-open-column
          className={languageSelectorOpenColumnClassName}
        />
      ) : null}
      <button
        ref={triggerRef}
        type="button"
        data-header-language-selector
        aria-label={`Idioma: ${currentLanguage.name}`}
        aria-expanded={isOpen}
        aria-controls={listId}
        className={languageSelectorButtonClassName}
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" || event.pointerType === "touch") {
            focusTrigger(event.currentTarget, "pointer");
          }
        }}
        onClick={() => {
          setIsOpen((open) => !open);
        }}
      >
        <LanguageFlag language={currentLanguage} />
        <span className={languageSelectorLabelClassName}>
          {currentLanguage.label}
        </span>
        <LanguageSelectorChevronIcon
          data-header-language-chevron
          className={[
            languageSelectorChevronClassName,
            isOpen ? languageSelectorChevronOpenClassName : "",
          ].join(" ")}
        />
      </button>
      {isOpen ? (
        <ul
          id={listId}
          data-header-language-list
          className={languageSelectorListClassName}
        >
          {otherLanguages.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                data-header-language-option={language.code}
                className={languageSelectorOptionClassName}
                onPointerDown={(event) => {
                  if (
                    event.pointerType === "mouse" ||
                    event.pointerType === "touch"
                  ) {
                    focusTrigger(event.currentTarget, "pointer");
                  }
                }}
                onClick={(event) => {
                  selectLanguage(language.code, clickOrigin(event));
                }}
              >
                <LanguageFlag language={language} />
                <span className={languageSelectorLabelClassName}>
                  {language.label}
                </span>
                <span className="sr-only" lang={language.code}>
                  {language.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
