type ConciergeCtaTitleProps = {
  line1: string;
  line2: string;
};

export default function ConciergeCtaTitle({
  line1,
  line2,
}: ConciergeCtaTitleProps) {
  return (
    <div
      data-concierge-cta-title-frame
      className="flex w-full max-w-[832px] min-h-[120px] flex-col items-center"
    >
      <h2
        id="concierge-cta-title"
        data-concierge-cta-title
        className="m-0 w-full text-center font-reddit text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-white"
      >
        {line1}
        <br />
        {line2}
      </h2>
    </div>
  );
}
