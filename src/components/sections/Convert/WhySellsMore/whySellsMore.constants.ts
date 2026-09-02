export const CONVERT_WHY_SELLS_MORE_HEADER = {
  eyebrow: "POR QUE VENDE MAIS",
  title: "Conhece o catálogo. Conhece o cliente. Conhece o momento.",
  description:
    "Drift, Intercom, Regie.ai funcionam com scripts. O Iungo Convert funciona com dados vivos da sua operação.",
} as const;

export type ConvertWhySellsMoreCardItem = {
  id: string;
  category: string;
  title: string;
  description: string;
};

export const CONVERT_WHY_SELLS_MORE_CARDS: readonly ConvertWhySellsMoreCardItem[] =
  [
    {
      id: "catalogo",
      category: "CATÁLOGO",
      title: "Recomenda com critério técnico",
      description:
        "Conhece compatibilidade, especificações, estoque, preço atual. Sugere produto certo, não o mais caro.",
    },
    {
      id: "perfil",
      category: "PERFIL",
      title: "Adapta tom e oferta",
      description:
        "Se é VIP, oferece pré-venda. Se é price-sensitive, oferece cupom. Se é B2B, oferece condição corporativa.",
    },
    {
      id: "momento",
      category: "MOMENTO",
      title: "Aciona no instante certo",
      description:
        "Triggers do Behavior Engine: 3ª visita à mesma categoria, abandono de carrinho premium, queda de preço de item favoritado.",
    },
  ] as const;
