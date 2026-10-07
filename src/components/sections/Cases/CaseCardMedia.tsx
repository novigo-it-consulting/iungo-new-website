import Image from "next/image";

import type { CaseImage } from "./cases.constants";
import {
  caseCardMediaImageClassName,
  caseCardMediaImageHeight,
  caseCardMediaImageSizes,
  caseCardMediaImageWidth,
} from "./casesSection.styles";

type CaseCardMediaProps = {
  caseId: string;
  image: CaseImage;
};

export default function CaseCardMedia({
  caseId,
  image,
}: Readonly<CaseCardMediaProps>) {
  return (
    <div
      data-case-media={caseId}
      className="aspect-video w-full shrink-0 overflow-hidden bg-[#F1F3FA]"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={caseCardMediaImageWidth}
        height={caseCardMediaImageHeight}
        sizes={caseCardMediaImageSizes}
        className={caseCardMediaImageClassName}
      />
    </div>
  );
}
