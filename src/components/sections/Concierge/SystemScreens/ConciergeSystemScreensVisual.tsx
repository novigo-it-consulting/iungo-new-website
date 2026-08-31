import Image from "next/image";

export default function ConciergeSystemScreensVisual() {
  return (
    <div
      data-concierge-system-screens-visual
      className="mt-6 w-full xl:min-h-[408px]"
    >
      <Image
        src="/images/products/concierge/system-screens-canvas.svg"
        alt="Canvas drag-and-drop do Iungo Concierge com régua de recuperação de carrinho"
        width={1216}
        height={408}
        unoptimized
        sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
        className="h-auto w-full"
      />
    </div>
  );
}
