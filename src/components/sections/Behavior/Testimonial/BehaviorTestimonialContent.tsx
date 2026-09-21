import {
  productSectionDescriptionClassName,
  productSectionTitleClassName,
} from "@/components/ui/sectionTitle.styles";

export default function BehaviorTestimonialContent() {
  return (
    <div
      data-behavior-testimonial-content
      className="mx-auto flex w-full max-w-[1024px] flex-col gap-4"
    >
      <div
        data-behavior-testimonial-title-block
        className="w-full px-8"
      >
        <blockquote
          data-behavior-testimonial-quote
          className={productSectionTitleClassName}
        >
          &ldquo;Saímos de um CDP batch noturno para o Iungo Behavior CDP. A
          ativação subiu 240% em 90 dias.&rdquo;
        </blockquote>
      </div>

      <div
        data-behavior-testimonial-subtitle-block
        className="w-full px-8"
      >
        <p
          data-behavior-testimonial-attribution
          className={productSectionDescriptionClassName}
        >
          — CMO, varejo premium (case sob NDA)
        </p>
      </div>
    </div>
  );
}
