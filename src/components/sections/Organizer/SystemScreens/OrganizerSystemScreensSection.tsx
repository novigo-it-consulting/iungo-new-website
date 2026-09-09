import PlainProductSystemScreensSection from "@/components/sections/shared/SystemScreens/PlainProductSystemScreensSection";

import { ORGANIZER_SYSTEM_SCREENS } from "./organizerSystemScreens.constants";

export default function OrganizerSystemScreensSection() {
  return (
    <PlainProductSystemScreensSection
      productSlug="organizer"
      {...ORGANIZER_SYSTEM_SCREENS}
    />
  );
}
