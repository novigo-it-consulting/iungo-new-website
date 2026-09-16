import ProductSystemScreensImage from "@/components/sections/shared/SystemScreens/ProductSystemScreensImage";
import { productSystemScreensMainSizes } from "@/components/sections/shared/SystemScreens/productSystemScreens.styles";

export default function ConciergeSystemScreensVisual() {
  return (
    <div
      data-concierge-system-screens-visual
      className="mt-6 w-full xl:min-h-[408px]"
    >
      <ProductSystemScreensImage
        image={{
          src: "/images/products/concierge/system-screens-canvas.svg",
          alt: "Canvas drag-and-drop do Iungo Concierge com régua de recuperação de carrinho",
          width: 1216,
          height: 408,
        }}
        sizes={productSystemScreensMainSizes}
      />
    </div>
  );
}
