import ProductSystemScreensBody from "@/components/sections/shared/SystemScreens/ProductSystemScreensBody";

import {
  ATTENDANT_SYSTEM_SCREEN_BADGES,
  ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS,
  ATTENDANT_SYSTEM_SCREEN_MAIN,
} from "./attendantSystemScreens.constants";

const ATTENDANT_INACTIVE_BADGE_BORDER = "border-[#3B37C0]/[0.35]";

export default function AttendantSystemScreens() {
  return (
    <section aria-labelledby="attendant-system-screens-title">
      <ProductSystemScreensBody
        productSlug="attendant"
        title="A operação que não exige humano para tarefas mecânicas."
        description="Console de transações, conectores, log de auditoria e painel de exceções."
        ariaLabel="Telas do sistema Iungo Attendant"
        badges={ATTENDANT_SYSTEM_SCREEN_BADGES}
        inactiveBorderClassName={ATTENDANT_INACTIVE_BADGE_BORDER}
        main={ATTENDANT_SYSTEM_SCREEN_MAIN}
        gridItems={ATTENDANT_SYSTEM_SCREEN_GRID_ITEMS}
        framed
      />
    </section>
  );
}
