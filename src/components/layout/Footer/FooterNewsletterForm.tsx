"use client";

import { useTranslations } from "next-intl";

export default function FooterNewsletterForm() {
  const t = useTranslations("footerNewsletter");

  return (
    <form
      data-newsletter-form
      onSubmit={(event) => event.preventDefault()}
      noValidate={false}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex w-full items-center gap-2 pt-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          {t("emailLabel")}
        </label>

        <input
          type="email"
          id="footer-newsletter-email"
          name="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          required
          className="h-[42px] min-w-0 flex-1 rounded-[50px] border border-white/[0.15] bg-white/[0.05] px-3 py-[11px] font-reddit text-sm font-normal text-white outline-none transition-colors placeholder:text-white/40 hover:border-white/25 focus-visible:border-white/40 focus-visible:ring-2 focus-visible:ring-white/20"
        />

        <button
          type="submit"
          data-newsletter-submit
          className="inline-flex h-[42px] min-w-[90px] w-fit shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[50px] bg-white px-4 py-[11px] font-reddit text-sm font-medium leading-5 text-[#0A0B14] transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0B14]"
        >
          {t("submit")}
        </button>
      </div>

      <small className="block w-full text-left font-reddit text-[10px] font-normal leading-[15px] text-white/40">
        {t("consentNote")}
      </small>
    </form>
  );
}
