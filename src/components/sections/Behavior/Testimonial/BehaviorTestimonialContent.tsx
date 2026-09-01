const titleClassName =
  "m-0 text-center font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] sm:text-[32px] sm:leading-[38px] sm:tracking-[-0.64px] xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]";

const subtitleClassName =
  "m-0 text-center font-reddit text-[14px] font-normal leading-[22px] text-[#71717A] xl:text-[16px] xl:leading-[24px]";

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
          className={titleClassName}
        >
          &ldquo;Saímos de um CDP batch noturno para o Iungo Behavior CDP. A
          ativação subiu 240% em 90 dias.&rdquo;
        </blockquote>
      </div>

      <div
        data-behavior-testimonial-subtitle-block
        className="w-full px-8"
      >
        <p data-behavior-testimonial-attribution className={subtitleClassName}>
          — CMO, varejo premium (case sob NDA)
        </p>
      </div>
    </div>
  );
}
