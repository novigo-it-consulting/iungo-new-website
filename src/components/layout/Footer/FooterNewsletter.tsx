import FooterNewsletterForm from "./FooterNewsletterForm";

export default function FooterNewsletter() {
  return (
    <div
      data-footer-newsletter
      className="flex w-full flex-col items-start gap-2"
    >
      <h2
        data-newsletter-title
        className="m-0 w-full font-reddit text-[16px] font-normal leading-6 text-white"
      >
        Newsletter técnica
      </h2>

      <div
        data-newsletter-description-frame
        className="w-full pt-1"
      >
        <p
          data-newsletter-description
          className="m-0 w-full font-reddit text-sm font-normal leading-5 text-white/60"
        >
          Cases reais, benchmarks BR e novidades de produto. Mensal. Sem spam.
        </p>
      </div>

      <FooterNewsletterForm />

      {/* Texto de confirmação dupla/LGPD será adicionado na próxima etapa */}
    </div>
  );
}
