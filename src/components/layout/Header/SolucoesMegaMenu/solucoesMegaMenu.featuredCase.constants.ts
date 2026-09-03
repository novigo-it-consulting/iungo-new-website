export type SolucoesMegaMenuFeaturedCase = {
  readonly id: string;
  readonly badgeLabel: string;
  readonly title: string;
  readonly subtitle: string;
  readonly readCaseLabel: string;
  /**
   * Destino de “Ler caso completo”.
   * Pendente: não há rota de case individual no projeto (CasesSection na home;
   * `/cases` referenciado no nav ainda sem página).
   */
  readonly readCaseHref: string | null;
};

export const SOLUCOES_MEGA_MENU_FEATURED_CASE: SolucoesMegaMenuFeaturedCase =
  {
    id: "lider-moda-premium",
    badgeLabel: "CASO EM DESTAQUE",
    title: "+R$ 600 mil em 15 dias",
    subtitle:
      "Líder de moda premium ativou 6 marcas simultaneamente com Iungo Concierge.",
    readCaseLabel: "Ler caso completo",
    readCaseHref: null,
  } as const;
