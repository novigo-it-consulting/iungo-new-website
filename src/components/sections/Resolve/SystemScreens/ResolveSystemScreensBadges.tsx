import ResolveSystemScreenBadge from "./ResolveSystemScreenBadge";
import { RESOLVE_SYSTEM_SCREEN_BADGES } from "./resolveSystemScreens.constants";

export default function ResolveSystemScreensBadges() {
  return (
    <div
      data-resolve-system-screens-badges
      className="mx-auto mt-6 w-full max-w-[1216px] pt-6"
    >
      <ul
        aria-label="Telas do sistema Iungo Resolve"
        className="m-0 flex list-none flex-wrap items-center justify-center gap-2 p-0"
      >
        {RESOLVE_SYSTEM_SCREEN_BADGES.map((badge) => (
          <ResolveSystemScreenBadge
            key={badge.id}
            label={badge.label}
            isActive={badge.isActive}
          />
        ))}
      </ul>
    </div>
  );
}
