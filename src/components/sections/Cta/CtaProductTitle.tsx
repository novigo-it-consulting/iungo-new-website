type CtaProductTitleProps = {
  titleId: string;
  line1: string;
  line2: string;
  dataPrefix: string;
};

export default function CtaProductTitle({
  titleId,
  line1,
  line2,
  dataPrefix,
}: CtaProductTitleProps) {
  return (
    <div
      {...{ [`data-${dataPrefix}-title-frame`]: true }}
      className="flex w-full max-w-[832px] min-h-[120px] flex-col items-center"
    >
      <h2
        id={titleId}
        {...{ [`data-${dataPrefix}-title`]: true }}
        className="m-0 w-full text-center font-reddit text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-white"
      >
        {line1}
        <br />
        {line2}
      </h2>
    </div>
  );
}
