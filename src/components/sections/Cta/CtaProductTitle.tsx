import {
  homeSectionTitleMobileClassName,
} from "@/components/ui/sectionTitle.styles";

type CtaProductTitleProps = {
  titleId: string;
  line1: string;
  line2: string;
  dataPrefix: string;
  frameClassName?: string;
};

const defaultTitleFrameClassName =
  "flex w-full max-w-[832px] min-h-0 flex-col items-center xl:min-h-[120px]";

export default function CtaProductTitle({
  titleId,
  line1,
  line2,
  dataPrefix,
  frameClassName = defaultTitleFrameClassName,
}: CtaProductTitleProps) {
  return (
    <div
      {...{ [`data-${dataPrefix}-title-frame`]: true }}
      className={frameClassName}
    >
      <h2
        id={titleId}
        {...{ [`data-${dataPrefix}-title`]: true }}
        className={[
          "m-0 w-full text-center font-reddit font-bold tracking-[-0.96px] text-white",
          homeSectionTitleMobileClassName,
          "xl:text-[48px] xl:leading-[60px]",
        ].join(" ")}
      >
        {line1}{" "}
        <br className="max-xl:hidden" />
        {line2}
      </h2>
    </div>
  );
}
