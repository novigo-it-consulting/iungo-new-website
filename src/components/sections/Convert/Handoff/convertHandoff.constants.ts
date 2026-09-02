export type ConvertHandoffCardItem = {
  id: string;
  title: string;
  description: string;
};

export const CONVERT_HANDOFF_CARDS: readonly ConvertHandoffCardItem[] = [
  {
    id: "resumo",
    title: "RESUMO",
    description:
      "Intenção, objeções levantadas, faixa de preço aceita, urgência percebida.",
  },
  {
    id: "produtos",
    title: "PRODUTOS",
    description:
      "Top 3 sugestões já calibradas, com estoque e margem confirmados.",
  },
  {
    id: "perfil",
    title: "PERFIL",
    description:
      "Histórico, LTV, segmento, se é VIP, alergias/preferências de marca.",
  },
  {
    id: "proxima-acao",
    title: "PRÓXIMA AÇÃO",
    description:
      'Recomendação concreta: "ofereça parcelamento sem juros e fechamento por WhatsApp".',
  },
] as const;
