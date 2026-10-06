"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useId, useRef, useState } from "react";

import LanguageSelectorChevronIcon from "@/components/icons/LanguageSelectorChevronIcon";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LANGUAGE_SELECTOR_FLAG_SIZE,
  getHeaderLanguage,
  getOtherHeaderLanguages,
  type HeaderLanguage,
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
  const currentCode = useLocale();
  const pathname = usePathname();
  const t = useTranslations("languageSelector");
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
        aria-label={t("current", { languageName: currentLanguage.name })}
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
              <Link
                href={pathname}
                locale={language.code}
                hrefLang={language.code}
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
              >
                <LanguageFlag language={language} />
                <span className={languageSelectorLabelClassName}>
                  {language.label}
                </span>
                <span className="sr-only" lang={language.code}>
                  {language.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
