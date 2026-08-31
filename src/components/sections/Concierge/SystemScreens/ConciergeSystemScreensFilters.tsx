import ConciergeSystemScreenBadge from "./ConciergeSystemScreenBadge";
import { CONCIERGE_SYSTEM_SCREEN_BADGES } from "./conciergeSystemScreens.constants";

export default function ConciergeSystemScreensFilters() {
  return (
    <div
      data-concierge-system-screens-filters
      className="mt-6 w-full xl:min-h-[62px]"
    >
      <ul
        data-concierge-system-screens-badges
        aria-label="Recursos do canvas"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {CONCIERGE_SYSTEM_SCREEN_BADGES.map((badge) => (
          <ConciergeSystemScreenBadge
            key={badge.id}
            label={badge.label}
            isActive={badge.isActive}
          />
        ))}
      </ul>
    </div>
  );
}
