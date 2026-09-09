import type { ProductSystemScreensContent } from "@/components/sections/shared/SystemScreens/productSystemScreens.types";

export const BEHAVIOR_SYSTEM_SCREENS = {
  title:
    "Veja o perfil que o site, a loja e o WhatsApp enxergam — em tempo real.",
  description:
    "Perfil 360°, segmentos ativos, eventos em streaming e ativações cross-canal.",
  ariaLabel: "Telas do sistema Iungo Behavior",
  inactiveBorderClassName: "border-[#E4E4E7]",
  headerClassNames: {
    container:
      "mx-auto flex w-full max-w-[723px] flex-col gap-3 text-center",
    title:
      "m-0 font-reddit text-[28px] font-bold leading-[34px] tracking-normal text-[#27272A] md:text-[36px] md:leading-[43px]",
    description:
      "m-0 mx-auto w-full max-w-[579px] font-reddit text-[17px] font-normal leading-[26px] tracking-normal text-[#71717A]",
  },
  badges: [
    { id: "profile-360", label: "Perfil 360°", isActive: true },
    { id: "live-segments", label: "Segmentos ao vivo", isActive: false },
    { id: "stream-events", label: "Eventos · stream", isActive: false },
    { id: "activations", label: "Ativações", isActive: false },
  ],
  main: {
    src: "/images/products/behavior/system-screens/system-screens-main.svg",
    alt: "Tela do Iungo Behavior com o perfil 360° de Juliana L. e o stream de eventos em tempo real.",
    width: 1306,
    height: 430,
  },
  gridItems: [
    {
      id: "segment-builder",
      src: "/images/products/behavior/system-screens/system-screens-segment-builder.svg",
      alt: "Builder de segmento do Iungo Behavior com regras em tempo real, sem SQL.",
      width: 395,
      height: 288,
    },
    {
      id: "unified-identity",
      src: "/images/products/behavior/system-screens/system-screens-identity.svg",
      alt: "Identidade unificada do Iungo Behavior com email, CPF, device e cookie no mesmo perfil.",
      width: 395,
      height: 288,
    },
    {
      id: "activation-destinations",
      src: "/images/products/behavior/system-screens/system-screens-destinations.svg",
      alt: "Destinos de ativação do Iungo Behavior com mais de 40 conectores nativos.",
      width: 395,
      height: 288,
    },
  ],
} as const satisfies ProductSystemScreensContent;
