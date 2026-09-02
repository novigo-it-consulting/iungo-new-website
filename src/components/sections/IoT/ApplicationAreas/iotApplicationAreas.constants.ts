export const IOT_APPLICATION_AREAS_HEADER = {
  eyebrow: "ÁREAS DE APLICAÇÃO",
  title: "8 áreas. Uma plataforma.",
  description:
    "Do chão de fábrica ao showroom de luxo, do almoxarifado ao centro cirúrgico.",
} as const;

export interface IoTApplicationAreaCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
}

export const IOT_APPLICATION_AREAS_CARDS: readonly IoTApplicationAreaCard[] = [
  {
    id: "asset-monitoring",
    emoji: "📦",
    title: "Monitoramento de ativos",
    description:
      "Notebooks, equipamentos, mobiliário, ferramentas. Localização e status em tempo real.",
  },
  {
    id: "people-monitoring",
    emoji: "👥",
    title: "Monitoramento de pessoas",
    description:
      "Acesso, presença, fluxo. Crachá inteligente e zonas autorizadas.",
  },
  {
    id: "nr-36-security",
    emoji: "🦺",
    title: "NR-36 & segurança",
    description:
      "Conformidade automatizada para frigoríficos e ambientes críticos.",
  },
  {
    id: "cold-chain",
    emoji: "🌡️",
    title: "Cold chain & temperatura",
    description:
      "Câmaras frias, vacinas, medicamentos. Alertas antes do desvio.",
  },
  {
    id: "milk-run",
    emoji: "🚚",
    title: "Milk run & logística",
    description:
      "Roteirização e rastreio entre CDs, lojas, fornecedores.",
  },
  {
    id: "ppe-compliance",
    emoji: "⛑️",
    title: "EPI & uso obrigatório",
    description:
      "Validação automática de uso de capacete, luva, óculos antes de zona crítica.",
  },
  {
    id: "hospitality",
    emoji: "🏨",
    title: "Hotelaria & hospitalidade",
    description:
      "Enxoval, minibar, amenities. Check-in automático e pull operacional.",
  },
  {
    id: "high-value",
    emoji: "💎",
    title: "Alto valor agregado",
    description:
      "Joias, relógios, eletrônicos premium. Anti-furto e prova de autenticidade.",
  },
] as const;
