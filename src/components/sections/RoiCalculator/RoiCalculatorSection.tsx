import RoiCalculatorActions from "./RoiCalculatorActions";
import RoiCalculatorBadge from "./RoiCalculatorBadge";
import RoiCalculatorDescription from "./RoiCalculatorDescription";
import RoiCalculatorTitle from "./RoiCalculatorTitle";

export default function RoiCalculatorSection() {
  return (
    <section
      id="roi-calculator"
      aria-labelledby="roi-title"
      className="relative w-full overflow-hidden bg-[#031358]"
    >
      {/*
        Dois overlays de gradiente radial (Figma: Radial 100% × 2)
        serão adicionados aqui nas próximas etapas.
      */}

      <div
        data-section="roi-container"
        className="relative z-10 mx-auto flex w-full max-w-[1024px] flex-col items-center gap-6 px-5 py-24 text-center sm:px-6 lg:px-8"
      >
        <RoiCalculatorBadge />
        <RoiCalculatorTitle />
        <RoiCalculatorDescription />
        <RoiCalculatorActions />
      </div>
    </section>
  );
}
