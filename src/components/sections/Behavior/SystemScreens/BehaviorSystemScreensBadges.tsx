import BehaviorSystemScreenBadge from "./BehaviorSystemScreenBadge";
import { BEHAVIOR_SYSTEM_SCREEN_BADGES } from "./behaviorSystemScreens.constants";

export default function BehaviorSystemScreensBadges() {
  return (
    <div
      data-behavior-system-screens-badges
      className="mx-auto mt-6 w-full max-w-[1216px] pt-6"
    >
      <ul
        aria-label="Telas do sistema Iungo Behavior"
        className="m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0"
      >
        {BEHAVIOR_SYSTEM_SCREEN_BADGES.map((badge) => (
          <BehaviorSystemScreenBadge
            key={badge.id}
            label={badge.label}
            isActive={badge.isActive}
          />
        ))}
      </ul>
    </div>
  );
}
