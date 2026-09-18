"use client";

import { useEffect, useId, useRef, useState } from "react";

import {
  getRecordedConsentChoice,
  type CookieConsentChoice,
} from "@/lib/cookieConsent";

import {
  COOKIE_ACCEPT_ALL_LABEL,
  COOKIE_BROWSER_MANAGEMENT,
  COOKIE_CHOICE_LEGEND,
  COOKIE_CHOICE_REQUIRED_HINT,
  COOKIE_CLOSE_PREFERENCES_LABEL,
  COOKIE_CONSENT_CONTACT_EMAIL,
  COOKIE_CONTACT_PREFIX,
  COOKIE_DIALOG_DESCRIPTION,
  COOKIE_DIALOG_TITLE,
  COOKIE_NECESSARY_ALWAYS_ON,
  COOKIE_NECESSARY_DESCRIPTION,
  COOKIE_NECESSARY_DURATION,
  COOKIE_NECESSARY_PURPOSE,
  COOKIE_NECESSARY_TECHNOLOGY,
  COOKIE_NECESSARY_TITLE,
  COOKIE_NECESSARY_VENDOR,
  COOKIE_REJECT_NON_ESSENTIAL_LABEL,
  COOKIE_SAVE_PREFERENCES_LABEL,
  COOKIE_SESSION_ONLY_NOTICE,
} from "./cookieConsent.constants";
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
        aria-label={COOKIE_CLOSE_PREFERENCES_LABEL}
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
          {COOKIE_DIALOG_TITLE}
        </h2>
        <p id={descriptionId} className={cookieDialogDescriptionClassName}>
          {COOKIE_DIALOG_DESCRIPTION}
        </p>
      </div>

      <div className={cookieDialogBodyClassName}>
        <section className={cookieCategoryCardClassName}>
          <div className="flex items-start justify-between gap-3">
            <h3 className={cookieCategoryTitleClassName}>
              {COOKIE_NECESSARY_TITLE}
            </h3>
            <p className={`${cookieCategoryTextClassName} shrink-0 font-semibold`}>
              {COOKIE_NECESSARY_ALWAYS_ON}
            </p>
          </div>
          <p className={cookieCategoryTextClassName}>
            {COOKIE_NECESSARY_DESCRIPTION}
          </p>
          <p className={cookieCategoryTextClassName}>{COOKIE_NECESSARY_PURPOSE}</p>
          <p className={cookieCategoryTextClassName}>{COOKIE_NECESSARY_VENDOR}</p>
          <p className={cookieCategoryTextClassName}>
            {COOKIE_NECESSARY_TECHNOLOGY}
          </p>
          <p className={cookieCategoryTextClassName}>
            {COOKIE_NECESSARY_DURATION}
          </p>
        </section>

        <fieldset className={cookieChoiceFieldsetClassName}>
          <legend className={cookieChoiceLegendClassName}>
            {COOKIE_CHOICE_LEGEND}
          </legend>
          <CookieChoiceOption
            name={choiceGroupName}
            value="accept-all"
            label={COOKIE_ACCEPT_ALL_LABEL}
            checked={draftChoice === "accept-all"}
            onChange={setDraftChoice}
          />
          <CookieChoiceOption
            name={choiceGroupName}
            value="reject-non-essential"
            label={COOKIE_REJECT_NON_ESSENTIAL_LABEL}
            checked={draftChoice === "reject-non-essential"}
            onChange={setDraftChoice}
          />
          {!canSave ? (
            <CookieLiveNotice>{COOKIE_CHOICE_REQUIRED_HINT}</CookieLiveNotice>
          ) : null}
        </fieldset>

        <p className={cookieCategoryTextClassName}>{COOKIE_BROWSER_MANAGEMENT}</p>
        <p className={cookieCategoryTextClassName}>
          {COOKIE_CONTACT_PREFIX}
          <a
            href={`mailto:${COOKIE_CONSENT_CONTACT_EMAIL}`}
            className={cookieEmailClassName}
          >
            {COOKIE_CONSENT_CONTACT_EMAIL}
          </a>
          {"."}
        </p>
        {!persisted && decision !== null ? (
          <CookieLiveNotice>{COOKIE_SESSION_ONLY_NOTICE}</CookieLiveNotice>
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
          {COOKIE_SAVE_PREFERENCES_LABEL}
        </button>
      </div>
    </dialog>
  );
}
