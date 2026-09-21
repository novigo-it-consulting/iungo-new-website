import { homeRoiTitleClassName } from "@/components/ui/sectionTitle.styles";

export default function RoiCalculatorTitle() {
  return (
    <h2
      id="roi-title"
      data-roi="title"
      className={homeRoiTitleClassName}
    >
      Vamos calcular o ROI
      <br />
      da sua operação?
    </h2>
  );
}
