import Image from "next/image";

import {
  RESOLVE_SYSTEM_SCREEN_GRID_ITEMS,
  RESOLVE_SYSTEM_SCREEN_MAIN,
} from "./resolveSystemScreens.constants";

export default function ResolveSystemScreensVisuals() {
  return (
    <div
      data-resolve-system-screens-visuals
      className="mx-auto mt-6 flex w-full max-w-[1216px] flex-col gap-6"
    >
      <div
        data-resolve-system-screens-main-frame
        className="overflow-hidden rounded-2xl"
      >
        <Image
          src={RESOLVE_SYSTEM_SCREEN_MAIN.src}
          alt={RESOLVE_SYSTEM_SCREEN_MAIN.alt}
          width={RESOLVE_SYSTEM_SCREEN_MAIN.width}
          height={RESOLVE_SYSTEM_SCREEN_MAIN.height}
          unoptimized
          sizes="(max-width: 1216px) 100vw, 1216px"
          className="block h-auto w-full"
          loading="lazy"
        />
      </div>

      <div
        data-resolve-system-screens-grid
        className="grid w-full min-w-0 grid-cols-1 items-start gap-4 lg:grid-cols-3"
      >
        {RESOLVE_SYSTEM_SCREEN_GRID_ITEMS.map((item) => (
          <div
            key={item.id}
            data-resolve-system-screens-grid-item={item.id}
            className="overflow-hidden rounded-xl"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              unoptimized
              sizes="(min-width: 1024px) calc((100vw - 64px - 32px) / 3), calc(100vw - 48px)"
              className="block h-auto min-w-0 w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
