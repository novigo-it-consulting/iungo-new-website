export const IOT_APPLICATION_AREAS_HEADER = {
  eyebrow: "ÁREAS DE APLICAÇÃO",
  title: "8 áreas. Uma plataforma.",
  description:
    "Do chão de fábrica ao showroom de luxo, do almoxarifado ao centro cirúrgico.",
} as const;

export type IoTApplicationAreaCardRow = "top" | "bottom";

export interface IoTApplicationAreaCard {
  id: string;
  emoji: string;
  title: string;
  description: string;
  row: IoTApplicationAreaCardRow;
}

type ApplicationAreaCardData = readonly [
  id: string,
  emoji: string,
  title: string,
  description: string,
  row: IoTApplicationAreaCardRow,
];

const APPLICATION_AREA_CARD_DATA = [
  [
    "asset-monitoring",
    "📦",
    "Monitoramento de ativos",
    "Notebooks, equipamentos, mobiliário, ferramentas. Localização e status em tempo real.",
    "top",
  ],
  [
    "people-monitoring",
    "👥",
    "Monitoramento de pessoas",
    "Acesso, presença, fluxo. Crachá inteligente e zonas autorizadas.",
    "top",
  ],
  [
    "nr-36-security",
    "🦺",
    "NR-36 & segurança",
    "Conformidade automatizada para frigoríficos e ambientes críticos.",
    "top",
  ],
  [
    "cold-chain",
    "🌡️",
    "Cold chain & temperatura",
    "Câmaras frias, vacinas, medicamentos. Alertas antes do desvio.",
    "top",
  ],
  [
    "milk-run",
    "🚚",
    "Milk run & logística",
    "Roteirização e rastreio entre CDs, lojas, fornecedores.",
    "bottom",
  ],
  [
    "ppe-compliance",
    "⛑️",
    "EPI & uso obrigatório",
    "Validação automática de uso de capacete, luva, óculos antes de zona crítica.",
    "bottom",
  ],
  [
    "hospitality",
    "🏨",
    "Hotelaria & hospitalidade",
    "Enxoval, minibar, amenities. Check-in automático e pull operacional.",
    "bottom",
  ],
  [
    "high-value",
    "💎",
    "Alto valor agregado",
    "Joias, relógios, eletrônicos premium. Anti-furto e prova de autenticidade.",
    "bottom",
  ],
] as const satisfies readonly ApplicationAreaCardData[];

export const IOT_APPLICATION_AREAS_CARDS: readonly IoTApplicationAreaCard[] =
  APPLICATION_AREA_CARD_DATA.map(([id, emoji, title, description, row]) => ({
    id,
    emoji,
    title,
    description,
    row,
  }));
