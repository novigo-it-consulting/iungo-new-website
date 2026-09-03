import PageContainer from "@/components/layout/PageContainer";

import CtaButton from "./CtaButton";
import CtaProductTitle from "./CtaProductTitle";

const defaultContentClassName =
  "flex w-full min-w-0 flex-col items-center";

type ProductPageCtaSectionProps = {
  dataPrefix: string;
  titleId: string;
  line1: string;
  line2: string;
  buttonHref: string;
  buttonLabel: string;
  spacerClassName?: string;
  buttonVariant?: "default" | "convert";
  titleFrameClassName?: string;
  titleToButtonGapClassName?: string;
};

export default function ProductPageCtaSection({
  dataPrefix,
  titleId,
  line1,
  line2,
  buttonHref,
  buttonLabel,
  spacerClassName = "h-8 w-full bg-white",
  buttonVariant = "default",
  titleFrameClassName,
  titleToButtonGapClassName,
}: ProductPageCtaSectionProps) {
  const usesFlexGap = Boolean(titleToButtonGapClassName);

  return (
    <>
      <div
        {...{ [`data-${dataPrefix}-spacer`]: true }}
        aria-hidden="true"
        className={spacerClassName}
      />

      <section
        {...{ [`data-${dataPrefix}-section`]: true }}
        aria-labelledby={titleId}
        className="w-full min-w-0 bg-[#04134F]"
      >
        <PageContainer
          size="cta"
          {...{ [`data-${dataPrefix}-container`]: true }}
          className="flex min-w-0 flex-col items-center pt-[80px] pb-[80px]"
        >
          <div
            {...{ [`data-${dataPrefix}-content`]: true }}
            className={
              titleToButtonGapClassName
                ? `${defaultContentClassName} ${titleToButtonGapClassName}`
                : defaultContentClassName
            }
          >
            <CtaProductTitle
              dataPrefix={dataPrefix}
              titleId={titleId}
              line1={line1}
              line2={line2}
              frameClassName={titleFrameClassName}
            />

            <div
              {...{ [`data-${dataPrefix}-action`]: true }}
              className={usesFlexGap ? undefined : "mt-[25px]"}
            >
              <CtaButton
                href={buttonHref}
                label={buttonLabel}
                variant={buttonVariant}
              />
            </div>
          </div>
        </PageContainer>
      </section>
    </>
  );
}
