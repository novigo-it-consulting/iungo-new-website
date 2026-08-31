interface CtaSubtitleProps {
  text: string;
}

export default function CtaSubtitle({ text }: CtaSubtitleProps) {
  return (
    <div className="flex w-full min-w-0 items-center justify-center">
      <p className="m-0 w-fit max-w-full text-center font-reddit text-[16px] font-normal leading-[24px] tracking-[0px] text-white/70">
        {text}
      </p>
    </div>
  );
}
