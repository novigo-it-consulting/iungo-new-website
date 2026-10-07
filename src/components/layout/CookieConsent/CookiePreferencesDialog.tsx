"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import {
  getRecordedConsentChoice,
  type CookieConsentChoice,
} from "@/lib/cookieConsent";

import { COOKIE_CONSENT_CONTACT_EMAIL } from "./cookieConsent.constants";
import {
  cookieCategoryCardClassName,
  cookieCategoryTextClassName,
  cookieCategoryTitleClassName,
  cookieChoiceControlClassName,
  cookieChoiceDotClassName,
  cookieChoiceFieldsetClassName,
  cookieChoiceLabelClassName,
  cookieChoiceLegendClassName,
  cookieChoiceRadioClassName,
  cookieDialogBodyClassName,
  cookieDialogClassName,
  cookieDialogCloseClassName,
  cookieDialogDescriptionClassName,
  cookieDialogFooterClassName,
  cookieDialogHeaderClassName,
  cookieDialogTitleClassName,
  cookieEmailClassName,
  cookieLiveNoticeClassName,
  cookieSaveActionClassName,
} from "./cookieConsent.styles";
import { useCookieConsent } from "./CookieConsentContext";

type DraftChoice = CookieConsentChoice | "";

type CookieChoiceOptionProps = {
  name: string;
  value: CookieConsentChoice;
  label: string;
  checked: boolean;
  onChange: (value: CookieConsentChoice) => void;
};

function CookieChoiceOption({
  name,
  value,
  label,
  checked,
  onChange,
}: Readonly<CookieChoiceOptionProps>) {
  const optionId = useId();

  return (
    <label htmlFor={optionId} className={cookieChoiceLabelClassName}>
      <span className={cookieChoiceControlClassName}>
        <input
          id={optionId}
          className={cookieChoiceRadioClassName}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => {
            onChange(value);
          }}
        />
        <span className={cookieChoiceDotClassName} aria-hidden="true" />
      </span>
      {label}
    </label>
  );
}

function CookieLiveNotice({
  children,
}: Readonly<{ children: string }>) {
  return (
    <output className={cookieLiveNoticeClassName} aria-live="polite">
      {children}
    </output>
  );
}

export default function CookiePreferencesDialog() {
  const {
    isPreferencesOpen,
    savePreferences,
    closePreferences,
    persisted,
    decision,
  } = useCookieConsent();
  const t = useTranslations("cookies");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wasOpenRef = useRef(false);
  const titleId = useId();
  const descriptionId = useId();
  const choiceGroupName = useId();
  const [draftChoice, setDraftChoice] = useState<DraftChoice>("");

  useEffect(() => {
    if (isPreferencesOpen && !wasOpenRef.current) {
      setDraftChoice(getRecordedConsentChoice(decision) ?? "");
    }

    wasOpenRef.current = isPreferencesOpen;
  }, [decision, isPreferencesOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isPreferencesOpen && !dialog.open) {
      dialog.showModal();
      titleRef.current?.focus({ preventScroll: true });
      return;
    }

    if (!isPreferencesOpen && dialog.open) {
      dialog.close();
    }
  }, [isPreferencesOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleClose = () => {
      closePreferences();
    };

    dialog.addEventListener("close", handleClose);

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, [closePreferences]);

  const canSave = draftChoice !== "";

  return (
    <dialog
      ref={dialogRef}
      data-cookie-preferences-dialog
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className={cookieDialogClassName}
    >
      <button
        type="button"
        className={cookieDialogCloseClassName}
        aria-label={t("actions.closePreferences")}
        onClick={() => {
          dialogRef.current?.close();
        }}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          width={18}
          height={18}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className={cookieDialogHeaderClassName}>
        <h2
          ref={titleRef}
          id={titleId}
          tabIndex={-1}
          className={cookieDialogTitleClassName}
        >
          {t("dialog.title")}
        </h2>
        <p id={descriptionId} className={cookieDialogDescriptionClassName}>
          {t("dialog.description")}
        </p>
      </div>

      <div className={cookieDialogBodyClassName}>
        <section className={cookieCategoryCardClassName}>
          <div className="flex items-start justify-between gap-3">
            <h3 className={cookieCategoryTitleClassName}>
              {t("necessary.title")}
            </h3>
            <p className={`${cookieCategoryTextClassName} shrink-0 font-semibold`}>
              {t("necessary.alwaysOn")}
            </p>
          </div>
          <p className={cookieCategoryTextClassName}>
            {t("necessary.description")}
          </p>
          <p className={cookieCategoryTextClassName}>{t("necessary.purpose")}</p>
          <p className={cookieCategoryTextClassName}>{t("necessary.vendor")}</p>
          <p className={cookieCategoryTextClassName}>
            {t("necessary.technology")}
          </p>
          <p className={cookieCategoryTextClassName}>
            {t("necessary.duration")}
          </p>
        </section>

        <fieldset className={cookieChoiceFieldsetClassName}>
          <legend className={cookieChoiceLegendClassName}>
            {t("choice.legend")}
          </legend>
          <CookieChoiceOption
            name={choiceGroupName}
            value="accept-all"
            label={t("actions.acceptAll")}
            checked={draftChoice === "accept-all"}
            onChange={setDraftChoice}
          />
          <CookieChoiceOption
            name={choiceGroupName}
            value="reject-non-essential"
            label={t("actions.rejectNonEssential")}
            checked={draftChoice === "reject-non-essential"}
            onChange={setDraftChoice}
          />
          {!canSave ? (
            <CookieLiveNotice>{t("choice.requiredHint")}</CookieLiveNotice>
          ) : null}
        </fieldset>

        <p className={cookieCategoryTextClassName}>{t("browserManagement")}</p>
        <p className={cookieCategoryTextClassName}>
          {t("contactPrefix")}
          <a
            href={`mailto:${COOKIE_CONSENT_CONTACT_EMAIL}`}
            className={cookieEmailClassName}
          >
            {COOKIE_CONSENT_CONTACT_EMAIL}
          </a>
          {"."}
        </p>
        {!persisted && decision !== null ? (
          <CookieLiveNotice>{t("sessionOnlyNotice")}</CookieLiveNotice>
        ) : null}
      </div>

      <div className={cookieDialogFooterClassName}>
        <button
          type="button"
          className={cookieSaveActionClassName}
          disabled={!canSave}
          onClick={() => {
            if (!canSave) {
              return;
            }

            savePreferences(draftChoice);
          }}
        >
          {t("actions.savePreferences")}
        </button>
      </div>
    </dialog>
  );
}
