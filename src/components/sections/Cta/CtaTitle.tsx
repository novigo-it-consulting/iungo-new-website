interface CtaTitleProps {
  titleId: string;
  line1: string;
  line2: string;
}

export default function CtaTitle({ titleId, line1, line2 }: Readonly<CtaTitleProps>) {
  return (
    <div className="flex w-full min-w-0 flex-col items-center">
      <h2
        id={titleId}
        className="m-0 w-full text-center font-reddit text-[36px] font-bold leading-[44px] tracking-[-0.96px] text-white sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[48px]"
      >
        {line1}
        <br />
        {line2}
      </h2>
    </div>
  );
}
