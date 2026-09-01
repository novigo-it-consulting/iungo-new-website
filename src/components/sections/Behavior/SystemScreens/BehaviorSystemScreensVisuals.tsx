import Image from "next/image";

import {
  BEHAVIOR_SYSTEM_SCREEN_GRID_ITEMS,
  BEHAVIOR_SYSTEM_SCREEN_MAIN,
} from "./behaviorSystemScreens.constants";

export default function BehaviorSystemScreensVisuals() {
  return (
    <div
      data-behavior-system-screens-visuals
      className="mx-auto mt-6 flex w-full max-w-[1216px] flex-col gap-6"
    >
      <Image
        src={BEHAVIOR_SYSTEM_SCREEN_MAIN.src}
        alt={BEHAVIOR_SYSTEM_SCREEN_MAIN.alt}
        width={BEHAVIOR_SYSTEM_SCREEN_MAIN.width}
        height={BEHAVIOR_SYSTEM_SCREEN_MAIN.height}
        unoptimized
        sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
        className="block h-auto w-full"
      />

      <div
        data-behavior-system-screens-grid
        className="grid w-full min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-3"
      >
        {BEHAVIOR_SYSTEM_SCREEN_GRID_ITEMS.map((item) => (
          <Image
            key={item.id}
            data-behavior-system-screens-grid-item={item.id}
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            unoptimized
            sizes="(min-width: 1024px) calc((100vw - 64px - 32px) / 3), calc(100vw - 48px)"
            className="block h-auto min-w-0 w-full"
          />
        ))}
      </div>
    </div>
  );
}
