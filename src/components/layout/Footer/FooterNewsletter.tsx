import { getTranslations } from "next-intl/server";

import FooterNewsletterForm from "./FooterNewsletterForm";

export default async function FooterNewsletter() {
  const t = await getTranslations("footerNewsletter");

  return (
    <div
      data-footer-newsletter
      className="flex w-full flex-col items-start gap-2"
    >
      <h2
        data-newsletter-title
        className="m-0 w-full font-reddit text-[16px] font-normal leading-6 text-white"
      >
        {t("title")}
      </h2>

      <div
        data-newsletter-description-frame
        className="w-full pt-1"
      >
        <p
          data-newsletter-description
          className="m-0 w-full font-reddit text-sm font-normal leading-5 text-white/60"
        >
          {t("description")}
        </p>
      </div>

      <FooterNewsletterForm />
    </div>
  );
}
