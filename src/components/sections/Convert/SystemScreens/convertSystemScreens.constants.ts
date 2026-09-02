export const CONVERT_SYSTEM_SCREEN_MAIN = {
  src: "/images/products/convert/system-screens-main.svg",
  alt: "Pipeline comercial do Iungo Convert com oportunidades detectadas, conversas, handoffs e vendas fechadas.",
  width: 1216,
  height: 352,
} as const;

export const CONVERT_SYSTEM_SCREEN_GRID_ITEMS = [
  {
    id: "conversa-ao-vivo",
    src: "/images/products/convert/system-screens-conversation.svg",
    alt: "Conversa comercial do Iungo Convert com recomendação de produto e fechamento de venda.",
    width: 395,
    height: 325,
  },
  {
    id: "briefing-pro-vendedor",
    src: "/images/products/convert/system-screens-briefing.svg",
    alt: "Briefing para o vendedor com contexto do cliente no Iungo Convert.",
    width: 395,
    height: 326,
  },
  {
    id: "performance-do-time",
    src: "/images/products/convert/system-screens-performance.svg",
    alt: "Performance do time comercial do Iungo Convert com métricas por vendedor.",
    width: 395,
    height: 326,
  },
] as const;

export const CONVERT_SYSTEM_SCREEN_BADGES = [
  {
    id: "pipeline-ia",
    label: "Pipeline · IA",
    isActive: true,
  },
  {
    id: "conversa-em-curso",
    label: "Conversa em curso",
    isActive: false,
  },
  {
    id: "briefing-handoff",
    label: "Briefing de handoff",
    isActive: false,
  },
  {
    id: "performance-vendedor",
    label: "Performance · vendedor",
    isActive: false,
  },
] as const;
