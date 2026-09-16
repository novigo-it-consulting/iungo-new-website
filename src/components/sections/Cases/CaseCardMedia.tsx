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
  accessibleName?: string;
  image?: CaseImage;
};

export default function CaseCardMedia({
  caseId,
  accessibleName,
  image,
}: CaseCardMediaProps) {
  const isPlaceholder = !image;

  return (
    <div
      data-case-media={caseId}
      {...(isPlaceholder && accessibleName
        ? { role: "img" as const, "aria-label": accessibleName }
        : {})}
      className="aspect-video w-full shrink-0 overflow-hidden bg-[#F1F3FA]"
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={caseCardMediaImageWidth}
          height={caseCardMediaImageHeight}
          sizes={caseCardMediaImageSizes}
          className={caseCardMediaImageClassName}
        />
      ) : null}
    </div>
  );
}
