import CtaSection from "@/components/sections/Cta/CtaSection";
import {
  ORGANIZER_CTA_BUTTON,
  ORGANIZER_CTA_SUBTITLE,
  ORGANIZER_CTA_TITLE,
} from "./Cta/organizerCta.constants";

export default function OrganizerCta() {
  return (
    <CtaSection
      dataSection="organizer"
      titleId="organizer-cta-title"
      titleLine1={ORGANIZER_CTA_TITLE.line1}
      titleLine2={ORGANIZER_CTA_TITLE.line2}
      subtitle={ORGANIZER_CTA_SUBTITLE}
      cta={ORGANIZER_CTA_BUTTON}
    />
  );
}
