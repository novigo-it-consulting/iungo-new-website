import type { ProductSystemScreensContent } from "@/components/sections/shared/SystemScreens/productSystemScreens.types";

export const ORGANIZER_SYSTEM_SCREENS = {
  title: "A interface real, todo dia, em produção.",
  description:
    "Ficha de produto, workflow editorial, governança de atributos e publicação multi-canal.",
  ariaLabel: "Telas do sistema Iungo Organizer",
  inactiveBorderClassName: "border-[#1E9F67]/30",
  badges: [
    { id: "product-sheet", label: "Ficha de produto", isActive: true },
    { id: "editorial-workflow", label: "Workflow editorial", isActive: false },
    { id: "attributes-taxonomy", label: "Atributos & taxonomia", isActive: false },
    { id: "channels-publication", label: "Canais & publicação", isActive: false },
  ],
  main: {
    src: "/images/products/organizer/system-screens/system-screens-main.svg",
    alt: "Tela de produto do Iungo Organizer com atributos, completude do cadastro e canais de publicação.",
    width: 1216,
    height: 439,
  },
  gridItems: [
    {
      id: "editorial-workflow",
      src: "/images/products/organizer/system-screens/system-screens-workflow.svg",
      alt: "Workflow editorial com etapas de aprovação e status de publicação.",
      width: 395,
      height: 288,
    },
    {
      id: "attributes-taxonomy",
      src: "/images/products/organizer/system-screens/system-screens-attributes.svg",
      alt: "Atributos e taxonomia do produto organizados por categoria.",
      width: 395,
      height: 289,
    },
    {
      id: "ai-panel",
      src: "/images/products/organizer/system-screens/system-screens-ai-panel.svg",
      alt: "Painel de IA com sugestões de enriquecimento e inconsistências detectadas.",
      width: 395,
      height: 286,
    },
  ],
} as const satisfies ProductSystemScreensContent;
