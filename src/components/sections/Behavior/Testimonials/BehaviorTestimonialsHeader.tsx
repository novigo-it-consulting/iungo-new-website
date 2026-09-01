export default function BehaviorTestimonialsHeader() {
  return (
    <div
      data-behavior-testimonials-header
      className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-3 text-center"
    >
      <span
        data-behavior-testimonials-eyebrow
        className="inline-flex items-center justify-center rounded-[999px] border border-[#0024AE]/[0.18] bg-[#0024AE]/[0.07] px-[14px] py-[6px] font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]"
      >
        DEPOIMENTOS
      </span>

      <div
        data-behavior-testimonials-title-frame
        className="w-full pt-1"
      >
        <h2
          id="behavior-testimonials-title"
          data-behavior-testimonials-title
          className="m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] md:text-[36px] md:leading-[40px] md:tracking-[-0.72px]"
        >
          Quem ativou, sentiu.
        </h2>
      </div>

      <p
        data-behavior-testimonials-description
        className="m-0 w-full font-reddit text-base font-normal leading-6 tracking-normal text-[#71717A]"
      >
        Líderes de growth e CRM que substituíram Segment + ferramentas avulsas pela stack unificada.
      </p>
    </div>
  );
}
