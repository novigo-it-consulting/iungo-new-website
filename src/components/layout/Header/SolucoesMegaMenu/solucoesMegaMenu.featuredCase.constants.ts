export type SolucoesMegaMenuFeaturedCase = {
  readonly id: string;
  /**
   * Destino de “Ler caso completo”.
   * Pendente: não há rota de case individual no projeto (CasesSection na home;
   * `/cases` referenciado no nav ainda sem página).
   */
  readonly readCaseHref: string | null;
};

export const SOLUCOES_MEGA_MENU_FEATURED_CASE: SolucoesMegaMenuFeaturedCase = {
  id: "lider-moda-premium",
  readCaseHref: null,
};
