import PlainProductSystemScreensSection from "@/components/sections/shared/SystemScreens/PlainProductSystemScreensSection";

import { BEHAVIOR_SYSTEM_SCREENS } from "./behaviorSystemScreens.constants";

export default function BehaviorSystemScreensSection() {
  return (
    <PlainProductSystemScreensSection
      productSlug="behavior"
      {...BEHAVIOR_SYSTEM_SCREENS}
    />
  );
}
