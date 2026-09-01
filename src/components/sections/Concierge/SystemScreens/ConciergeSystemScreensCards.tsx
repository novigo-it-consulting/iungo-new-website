import Image from "next/image";

import { CONCIERGE_SYSTEM_SCREEN_CARDS } from "./conciergeSystemScreens.constants";

export default function ConciergeSystemScreensCards() {
  return (
    <div
      data-concierge-system-screens-cards
      className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 xl:min-h-[301px]"
    >
      {CONCIERGE_SYSTEM_SCREEN_CARDS.map((card) => (
        <div
          key={card.id}
          data-concierge-system-screens-card={card.id}
          className="min-w-0"
        >
          <Image
            src={card.src}
            alt={card.alt}
            width={card.width}
            height={card.height}
            unoptimized
            sizes="(min-width: 640px) calc((100vw - 64px - 32px) / 3), calc(100vw - 48px)"
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );
}
