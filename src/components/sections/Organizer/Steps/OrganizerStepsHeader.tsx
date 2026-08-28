export default function OrganizerStepsHeader() {
  return (
    <div
      data-organizer-steps-header
      className="flex w-full max-w-[768px] min-w-0 flex-col items-center justify-start gap-4"
    >
      <span
        data-organizer-steps-badge
        className="inline-flex w-fit shrink-0 items-center justify-center rounded-[999px] border border-[rgba(0,36,174,0.18)] bg-[rgba(0,36,174,0.07)] px-[14.4px] py-[6.4px] backdrop-blur-sm"
      >
        <span className="font-reddit text-[11.2px] font-medium leading-[16.8px] tracking-[0.67px] text-[#0024AE]">
          COMO FUNCIONA
        </span>
      </span>

      <h2
        id="organizer-steps-title"
        data-organizer-steps-title
        className="m-0 w-fit max-w-full font-reddit font-bold text-center text-[#27272A] tracking-[-0.02em] text-[30px] leading-[36px] sm:text-[36px] sm:leading-[42px] lg:text-[42px] lg:leading-[46px] 2xl:text-[48px] 2xl:leading-[48px] 2xl:tracking-[-0.96px]"
      >
        Da planilha ao canal, em 3 passos.
      </h2>
    </div>
  );
}
