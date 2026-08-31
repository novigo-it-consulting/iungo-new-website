import SectionEyebrow from "@/components/ui/SectionEyebrow";

export default function ConciergeTestimonialsHeader() {
  return (
    <header
      data-concierge-testimonials-header
      className="flex w-full max-w-[672px] flex-col items-center gap-3"
    >
      <SectionEyebrow variant="compact">DEPOIMENTOS</SectionEyebrow>

      <div
        data-concierge-testimonials-title-frame
        className="flex w-full items-start justify-center pr-1 xl:h-[40px]"
      >
        <h2
          id="concierge-testimonials-title"
          data-concierge-testimonials-title
          className="w-full max-w-[496px] text-center font-reddit text-[28px] font-bold leading-[34px] tracking-[-0.56px] text-[#27272A] sm:text-[32px] sm:leading-[38px] sm:tracking-[-0.64px] xl:text-[36px] xl:leading-[40px] xl:tracking-[-0.72px]"
        >
          Marketing solta a régua sem TI.
        </h2>
      </div>

      <p
        data-concierge-testimonials-description
        className="w-full max-w-[619px] text-center font-reddit text-[14px] font-normal leading-[22px] tracking-normal text-[#71717A] sm:text-[15px] sm:leading-[23px] xl:text-[16px] xl:leading-[24px]"
      >
        CMOs e CRM leads que pararam de depender de tickets de engenharia para
        testar uma jornada.
      </p>
    </header>
  );
}
